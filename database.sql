-- ━━━━━━ SQL - VERSION 01 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━
-- Table pour stocker les dossiers
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  parent_path TEXT[] NOT NULL,
  is_masked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour stocker les applications dans les dossiers
CREATE TABLE apps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), 
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  folder_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  is_masked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fonction pour mettre à jour le timestamp automatiquement
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour mettre à jour le timestamp
CREATE TRIGGER update_folders_timestamp
BEFORE UPDATE ON folders
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_apps_timestamp
BEFORE UPDATE ON apps
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- ━━━━━━ SQL - VERSION 02 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━
-- Table pour stocker les dossiers de tâches (années, mois, jours)
CREATE TABLE task_folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'year', 'month', 'day'
  parent_id UUID REFERENCES task_folders(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour stocker les tâches
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  day_folder_id UUID REFERENCES task_folders(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fonction pour mettre à jour le timestamp automatiquement
CREATE OR REPLACE FUNCTION update_task_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour mettre à jour le timestamp
CREATE TRIGGER update_task_folders_timestamp
BEFORE UPDATE ON task_folders
FOR EACH ROW
EXECUTE FUNCTION update_task_timestamp();

CREATE TRIGGER update_tasks_timestamp
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_task_timestamp();

-- ━━━━━━ SQL - VERSION 03 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━
-- Activer l'extension pg_cron si ce n'est pas déjà fait
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Fonction pour créer les dossiers et tâches automatiquement (mode test: 5min = 1 jour)
CREATE OR REPLACE FUNCTION create_daily_tasks_test()
RETURNS void AS $$
DECLARE
  v_current_date TEXT;
  v_current_year TEXT;
  v_current_month TEXT;
  v_current_day TEXT;
  year_folder_id UUID;
  month_folder_id UUID;
  day_folder_id UUID;
  year_exists BOOLEAN;
  month_exists BOOLEAN;
  day_exists BOOLEAN;
BEGIN
  -- Formater la date actuelle
  v_current_date := to_char(NOW(), 'YYYY-MM-DD');
  v_current_year := to_char(NOW(), 'YYYY');
  v_current_month := to_char(NOW(), 'MM');
  v_current_day := to_char(NOW(), 'DD');
  
  -- Vérifier si l'année existe déjà
  SELECT EXISTS(SELECT 1 FROM task_folders WHERE name = v_current_year AND type = 'year') INTO year_exists;
  
  -- Créer le dossier année s'il n'existe pas
  IF NOT year_exists THEN
    INSERT INTO task_folders(name, type, parent_id)
    VALUES (v_current_year, 'year', NULL)
    RETURNING id INTO year_folder_id;
  ELSE
    SELECT id FROM task_folders WHERE name = v_current_year AND type = 'year' INTO year_folder_id;
  END IF;
  
  -- Vérifier si le mois existe déjà
  SELECT EXISTS(
    SELECT 1 FROM task_folders 
    WHERE name = v_current_month AND type = 'month' AND parent_id = year_folder_id
  ) INTO month_exists;
  
  -- Créer le dossier mois s'il n'existe pas
  IF NOT month_exists THEN
    INSERT INTO task_folders(name, type, parent_id)
    VALUES (v_current_month, 'month', year_folder_id)
    RETURNING id INTO month_folder_id;
  ELSE
    SELECT id FROM task_folders 
    WHERE name = v_current_month AND type = 'month' AND parent_id = year_folder_id 
    INTO month_folder_id;
  END IF;
  
  -- Vérifier si le jour existe déjà
  SELECT EXISTS(
    SELECT 1 FROM task_folders 
    WHERE name = v_current_day AND type = 'day' AND parent_id = month_folder_id
  ) INTO day_exists;
  
  -- Créer le dossier jour s'il n'existe pas
  IF NOT day_exists THEN
    INSERT INTO task_folders(name, type, parent_id)
    VALUES (v_current_day, 'day', month_folder_id)
    RETURNING id INTO day_folder_id;
    
    -- Créer les 3 tâches standard pour ce jour
    INSERT INTO tasks(name, emoji, day_folder_id)
    VALUES 
      ('Bonjour', '☀️', day_folder_id),
      ('Bon après-midi', '🌤️', day_folder_id),
      ('Bonsoir', '🌙', day_folder_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Planifier l'exécution toutes les 5 minutes
SELECT cron.schedule('*/5 * * * *', 'SELECT create_daily_tasks_test()');
-- ━━━━━━ SQL - VERSION 04 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT jobid FROM cron.job WHERE command LIKE '%create_daily_tasks_test%' LOOP
    PERFORM cron.unschedule(r.jobid);
  END LOOP;
END$$;
-- ━━━━━━ SQL - VERSION 05 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━
-- Fonction pour créer les dossiers et tâches automatiquement (calendrier réel)
CREATE OR REPLACE FUNCTION create_daily_tasks()
RETURNS void AS $$
DECLARE
  v_current_date TEXT;
  v_current_year TEXT;
  v_current_month TEXT;
  v_current_day TEXT;
  year_folder_id UUID;
  month_folder_id UUID;
  day_folder_id UUID;
  year_exists BOOLEAN;
  month_exists BOOLEAN;
  day_exists BOOLEAN;
BEGIN
  -- Formater la date actuelle
  v_current_date := to_char(NOW(), 'YYYY-MM-DD');
  v_current_year := to_char(NOW(), 'YYYY');
  v_current_month := to_char(NOW(), 'MM');
  v_current_day := to_char(NOW(), 'DD');
  
  -- Vérifier si l'année existe déjà
  SELECT EXISTS(SELECT 1 FROM task_folders WHERE name = v_current_year AND type = 'year') INTO year_exists;
  
  -- Créer le dossier année s'il n'existe pas
  IF NOT year_exists THEN
    INSERT INTO task_folders(name, type, parent_id)
    VALUES (v_current_year, 'year', NULL)
    RETURNING id INTO year_folder_id;
  ELSE
    SELECT id FROM task_folders WHERE name = v_current_year AND type = 'year' INTO year_folder_id;
  END IF;
  
  -- Vérifier si le mois existe déjà
  SELECT EXISTS(
    SELECT 1 FROM task_folders 
    WHERE name = v_current_month AND type = 'month' AND parent_id = year_folder_id
  ) INTO month_exists;
  
  -- Créer le dossier mois s'il n'existe pas
  IF NOT month_exists THEN
    INSERT INTO task_folders(name, type, parent_id)
    VALUES (v_current_month, 'month', year_folder_id)
    RETURNING id INTO month_folder_id;
  ELSE
    SELECT id FROM task_folders 
    WHERE name = v_current_month AND type = 'month' AND parent_id = year_folder_id 
    INTO month_folder_id;
  END IF;
  
  -- Vérifier si le jour existe déjà
  SELECT EXISTS(
    SELECT 1 FROM task_folders 
    WHERE name = v_current_day AND type = 'day' AND parent_id = month_folder_id
  ) INTO day_exists;
  
  -- Créer le dossier jour s'il n'existe pas
  IF NOT day_exists THEN
    INSERT INTO task_folders(name, type, parent_id)
    VALUES (v_current_day, 'day', month_folder_id)
    RETURNING id INTO day_folder_id;
    
    -- Créer les 3 tâches standard pour ce jour
    INSERT INTO tasks(name, emoji, day_folder_id)
    VALUES 
      ('Bonjour', '☀️', day_folder_id),
      ('Bon après-midi', '🌤️', day_folder_id),
      ('Bonsoir', '🌙', day_folder_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Planifier l'exécution tous les jours à minuit
SELECT cron.schedule('0 0 * * *', 'SELECT create_daily_tasks()');
-- ━━━━━━ SQL - VERSION 06 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 07 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 08 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 09 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 10 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 11 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 12 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 13 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 14 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 15 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 16 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 17 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 18 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 19 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━

-- ━━━━━━ SQL - VERSION 20 ━━━━━━
-- ░▒▓█
--           🕷️
--     🕸️
-- ━━━━━━━━━━━━━━━
