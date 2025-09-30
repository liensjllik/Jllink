/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 01
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */
        // Configuration de l'ordre de chargement et du passage de login à l'application
(function() {
    let loginInitialized = false;
    let appInitialized = false;
    let authenticationCompleted = false;

    // ====== GESTIONNAIRE DE TRANSITION ======
    const AppTransitionManager = {
        // Méthode pour passer du login à l'application
        switchToApp: function() {
            const loginSection = document.getElementById('login-section');
            const appSection = document.getElementById('app-section');
            
            // Ajouter la classe de transition au login
            loginSection.classList.add('hidden');
            
            // Afficher la section de l'application
            appSection.style.display = 'block';
            
            // Attendre que la transition soit terminée
            setTimeout(() => {
                // Ajouter la visibilité à l'application
                appSection.classList.add('visible');
                
                // Optionnel : supprimer complètement le login du DOM après transition
                setTimeout(() => {
                    // Soit masquer
                    // loginSection.style.display = 'none';
                    
                    // Soit supprimer si vous n'en avez plus besoin
                    // loginSection.remove();
                }, 600);
            }, 50);
        }
    };

    // Point de connexion entre les deux systèmes
    window.handleAuthentication = function() {
        authenticationCompleted = true;
        AppTransitionManager.switchToApp();
    };

    // ====== CODE DU LOGIN ======
    document.addEventListener('DOMContentLoaded', function() {
            // ===========================================
            // DÉFINITION DES CONSTANTES ET VARIABLES PRINCIPALES
            // ===========================================
            
            // Éléments DOM
            const spider = document.getElementById('spider');
            const loginContainer = document.getElementById('loginContainer');
            const loginTitle = document.getElementById('loginTitle');
            const titleSpans = loginTitle.querySelectorAll('span');
            const usernameGroup = document.getElementById('usernameGroup');
            const passwordGroup = document.getElementById('passwordGroup');
            const loginButton = document.getElementById('loginButton');
            const passwordToggle = document.getElementById('passwordToggle');
            const password = document.getElementById('password');
            const username = document.getElementById('username');
            const leftPupil = document.getElementById('leftPupil');
            const rightPupil = document.getElementById('rightPupil');
            const spiderWeb = document.getElementById('spiderWeb');
            const webIcons = document.getElementById('webIcons');
            const cameraWeb = document.getElementById('cameraWeb');
            const loadingScreen = document.getElementById('loadingScreen');
            
            // Canvas pour le fond et les icônes
            const backgroundCanvas = document.getElementById('backgroundCanvas');
            const iconsCanvas = document.getElementById('iconsCanvas');
            const bgCtx = backgroundCanvas.getContext('2d');
            const iconCtx = iconsCanvas.getContext('2d');
            
            // Ajuster la taille des canvas
            function resizeCanvases() {
                backgroundCanvas.width = window.innerWidth;
                backgroundCanvas.height = window.innerHeight;
                iconsCanvas.width = window.innerWidth;
                iconsCanvas.height = window.innerHeight;
            }
            
            resizeCanvases();
            window.addEventListener('resize', resizeCanvases);
            
            // Centres et dimensions
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // ===========================================
            // DÉFINITION DES ICÔNES
            // ===========================================
            
            // Sites web principaux
            const websites = [
                'google.com', 'youtube.com', 'tiktok.com', 'facebook.com', 
                'github.com', 'twitter.com', 'telegram.org', 'poe.com', 
                'reddit.com', 'openai.com', 'instagram.com', 'linkedin.com',
                'dropbox.com', 'netflix.com', 'apple.com', 'microsoft.com',
                'amazon.com', 'spotify.com', 'twitch.tv', 'pinterest.com',
                'discord.com', 'slack.com', 'adobe.com', 'zoom.us'
            ];
            
            // Collection d'icônes définies manuellement
            // Structure : {type, name, color, svgPath}
            
            // Icônes des dossiers
            const folderIcons = [
                { type: 'folder', name: 'Dossier', color: '#FFD54F', 
                  svgPath: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z' },
                { type: 'folder', name: 'Dossier ouvert', color: '#FFD54F', 
                  svgPath: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z' },
                { type: 'folder', name: 'Téléchargements', color: '#4FC3F7', 
                  svgPath: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 12l-6-6h4V8h4v4h4l-6 6z' },
                { type: 'folder', name: 'Images', color: '#FF8A65', 
                  svgPath: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 6l-3 3.72L13 14l-3 4h10V12z' },
                { type: 'folder', name: 'Vidéos', color: '#BA68C8', 
                  svgPath: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 6l-7 4V8l7 4z' },
                { type: 'folder', name: 'Musique', color: '#7986CB', 
                  svgPath: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 10h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z' },
                { type: 'folder', name: 'Documents', color: '#AED581', 
                  svgPath: 'M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z' },
                { type: 'folder', name: 'Sécurité', color: '#FF8A65', 
                  svgPath: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4 10h-2v2h-4v-2H8v-4h2v-2h4v2h2v4z' }
            ];
            
            // Icônes des systèmes d'exploitation
            const osIcons = [
                { type: 'os', name: 'Windows', color: '#0078D6', 
                  svgPath: 'M0,0 L9,0 L9,9 L0,9 L0,0 Z M10,0 L21,0 L21,9 L10,9 L10,0 Z M0,10 L9,10 L9,21 L0,21 L0,10 Z M10,10 L21,10 L21,21 L10,21 L10,10 Z' },
                { type: 'os', name: 'Apple', color: '#999999', 
                  svgPath: 'M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z' },
                { type: 'os', name: 'Linux', color: '#FCC624', 
                  svgPath: 'M12.5,2C10.84,2 9.5,5.34 9.5,7C9.5,7.95 10,8.8 10,8.8C9.93,8.89 9.67,9.08 9.5,9.17C8.24,9.94 6,11.94 6,14.5C6,17.09 7.5,18 9,18.5C10.5,19 12,21 12,21H13C13,21 14.5,19 16,18.5C17.5,18 19,17.09 19,14.5C19,11.94 16.76,9.94 15.5,9.17C15.33,9.08 15.07,8.89 15,8.8C15,8.8 15.5,7.95 15.5,7C15.5,5.34 14.16,2 12.5,2Z' },
                { type: 'os', name: 'Android', color: '#3DDC84', 
                  svgPath: 'M7.2,16.8H8.8V19.2H7.2M16.8,16.8H18.4V19.2H16.8M3.6,7.2H21.6V15.6H3.6M16.8,3.6L18.4,6H16.8V3.6M7.2,3.6V6H5.6L7.2,3.6M7.2,22.8A1.8,1.8 0 0,1 5.4,21V19.2A1.8,1.8 0 0,1 7.2,17.4H8.8V15.6H7.2A3.6,3.6 0 0,0 3.6,19.2V21A3.6,3.6 0 0,0 7.2,24.6H8.8V22.8H7.2M18.4,22.8H16.8V24.6H18.4A3.6,3.6 0 0,0 22,21V19.2A3.6,3.6 0 0,0 18.4,15.6H16.8V17.4H18.4A1.8,1.8 0 0,1 20.2,19.2V21A1.8,1.8 0 0,1 18.4,22.8Z' },
                { type: 'os', name: 'iOS', color: '#007AFF', 
                  svgPath: 'M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5Z' }
            ];
            
            // Icônes des appareils
            const deviceIcons = [
                { type: 'device', name: 'Smartphone', color: '#4285F4', 
                  svgPath: 'M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z' },
                { type: 'device', name: 'Tablette', color: '#EA4335', 
                  svgPath: 'M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z' },
                { type: 'device', name: 'Laptop', color: '#FBBC05', 
                  svgPath: 'M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z' },
                { type: 'device', name: 'Desktop', color: '#34A853', 
                  svgPath: 'M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z' },
                { type: 'device', name: 'TV', color: '#FF6D00', 
                  svgPath: 'M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z' },
                { type: 'device', name: 'Smartwatch', color: '#9C27B0', 
                  svgPath: 'M6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12M8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8A4,4 0 0,0 8,12M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2' }
            ];
            
            // Icônes des solutions de stockage
            const storageIcons = [
                { type: 'storage', name: 'Cloud', color: '#42A5F5', 
                  svgPath: 'M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z' },
                { type: 'storage', name: 'Serveur', color: '#607D8B', 
                  svgPath: 'M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z' },
                { type: 'storage', name: 'Base de données', color: '#1976D2', 
                  svgPath: 'M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z' },
                { type: 'storage', name: 'DNS', color: '#78909C', 
                  svgPath: 'M7,9A2,2 0 0,1 5,7A2,2 0 0,1 7,5A2,2 0 0,1 9,7A2,2 0 0,1 7,9M20,3H4A1,1 0 0,0 3,4V10A1,1 0 0,0 4,11H20A1,1 0 0,0 21,10V4A1,1 0 0,0 20,3M7,19A2,2 0 0,1 5,17A2,2 0 0,1 7,15A2,2 0 0,1 9,17A2,2 0 0,1 7,19M20,13H4A1,1 0 0,0 3,14V20A1,1 0 0,0 4,21H20A1,1 0 0,0 21,20V14A1,1 0 0,0 20,13Z' },
                { type: 'storage', name: 'Disque dur', color: '#5D4037', 
                  svgPath: 'M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,13.31 8.69,16 12.1,16L11.22,13.77C10.95,13.29 11.11,12.68 11.59,12.4L12.45,11.9C12.93,11.63 13.54,11.79 13.82,12.27L15.74,14.69C17.12,13.59 18,11.9 18,10A6,6 0 0,0 12,4M12,9A1,1 0 0,1 13,10A1,1 0 0,1 12,11A1,1 0 0,1 11,10A1,1 0 0,1 12,9M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M12.09,13.27L14.58,19.58L17.17,18.08L12.95,12.77L12.09,13.27Z' }
            ];
            
            // Icônes de recherche, découverte, partage
            const actionIcons = [
                { type: 'action', name: 'Recherche', color: '#42A5F5', 
                  svgPath: 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' },
                { type: 'action', name: 'Exploration', color: '#66BB6A', 
                  svgPath: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,14.09 4.8,16 6.11,17.41L9.88,9.88L17.41,6.11C16,4.8 14.09,4 12,4M12,20A8,8 0 0,0 20,12C20,9.91 19.2,8 17.89,6.59L14.12,14.12L6.59,17.89C8,19.2 9.91,20 12,20M12,12L11.23,11.23L9.7,14.3L12.77,12.77L12,12M12,17.5H13V19H12V17.5M15.88,15.89L16.59,15.18L17.65,16.24L16.94,16.95L15.88,15.89M17.5,12V11H19V12H17.5M12,6.5H11V5H12V6.5M8.12,8.11L7.41,8.82L6.35,7.76L7.06,7.05L8.12,8.11M6.5,12V13H5V12H6.5Z' },
                { type: 'action', name: 'Partage', color: '#FF7043', 
                  svgPath: 'M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z' },
                { type: 'action', name: 'Lien', color: '#5C6BC0', 
                  svgPath: 'M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z' },
                { type: 'action', name: 'Téléchargement', color: '#26A69A', 
                  svgPath: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z' }
            ];
            
            // Fusionner toutes les collections
            const allIcons = [
                ...folderIcons,
                ...osIcons,
                ...deviceIcons,
                ...storageIcons,
                ...actionIcons
            ];
            
            // ===========================================
            // GESTIONNAIRE DE SPRITES D'ICÔNES
            // ===========================================
            
            // Classe pour gérer le préchargement et le rendu optimisé des icônes
            class IconSpriteManager {
                constructor(iconsDefinitions) {
                    this.icons = iconsDefinitions;
                    this.spriteSheet = document.createElement('canvas');
                    this.spriteCtx = this.spriteSheet.getContext('2d');
                    this.iconSize = 24; // Taille standard des icônes
                    this.padding = 1;  // Espacement entre les icônes dans la spritesheet
                    this.spritesPerRow = 10;
                    this.spritePositions = new Map(); // Stocke les positions des icônes dans la spritesheet
                    this.faviconCache = new Map(); // Cache pour les favicons de sites web
                    this.ready = false;
                }
                
                // Initialiser la spritesheet
                async initialize() {
                    const totalIcons = this.icons.length;
                    const rows = Math.ceil(totalIcons / this.spritesPerRow);
                    
                    this.spriteSheet.width = this.spritesPerRow * (this.iconSize + this.padding * 2);
                    this.spriteSheet.height = rows * (this.iconSize + this.padding * 2);
                    
                    // Dessiner les icônes SVG sur la spritesheet
                    for (let i = 0; i < this.icons.length; i++) {
                        const icon = this.icons[i];
                        const row = Math.floor(i / this.spritesPerRow);
                        const col = i % this.spritesPerRow;
                        
                        const x = col * (this.iconSize + this.padding * 2) + this.padding;
                        const y = row * (this.iconSize + this.padding * 2) + this.padding;
                        
                        // Enregistrer la position dans la map
                        this.spritePositions.set(icon, { x, y });
                        
                        // Dessiner l'icône sur la spritesheet
                        this.drawSVGIcon(icon, x, y);
                    }
                    
                    // Précharger les favicons des sites web
                    await this.preloadFavicons(websites);
                    
                    this.ready = true;
                    return this;
                }
                
                // Dessiner une icône SVG sur la spritesheet
                drawSVGIcon(icon, x, y) {
                    // Configurer le contexte pour dessiner l'icône
                    this.spriteCtx.save();
                    this.spriteCtx.fillStyle = icon.color || '#FFFFFF';
                    
                    // Dessiner le cercle de fond
                    this.spriteCtx.beginPath();
                    this.spriteCtx.arc(x + this.iconSize / 2, y + this.iconSize / 2, this.iconSize / 2, 0, Math.PI * 2);
                    this.spriteCtx.fillStyle = 'rgba(42, 42, 58, 0.8)'; // Couleur de fond similaire à var(--card-dark)
                    this.spriteCtx.fill();
                    
                    // Dessiner le path SVG
                    this.spriteCtx.translate(x, y);
                    this.spriteCtx.fillStyle = icon.color || '#FFFFFF';
                    
                    const path = new Path2D(icon.svgPath);
                    // Mettre à l'échelle le SVG pour l'adapter à la taille de l'icône
                    this.spriteCtx.scale(this.iconSize / 24, this.iconSize / 24);
                    this.spriteCtx.fill(path);
                    
                    this.spriteCtx.restore();
                }
                
                // Précharger les favicons
                async preloadFavicons(sites) {
                    const promises = sites.map(site => {
                        return new Promise((resolve) => {
                            const img = new Image();
                            img.crossOrigin = 'Anonymous';
                            img.onload = () => {
                                // Créer un petit canvas pour dessiner le favicon
                                const canvas = document.createElement('canvas');
                                canvas.width = this.iconSize;
                                canvas.height = this.iconSize;
                                const ctx = canvas.getContext('2d');
                                
                                // Dessiner le cercle de fond
                                ctx.beginPath();
                                ctx.arc(this.iconSize / 2, this.iconSize / 2, this.iconSize / 2, 0, Math.PI * 2);
                                ctx.fillStyle = 'rgba(42, 42, 58, 0.8)';
                                ctx.fill();
                                
                                // Dessiner le favicon centré
                                const iconSize = this.iconSize * 0.75;
                                ctx.drawImage(img, 
                                    (this.iconSize - iconSize) / 2, 
                                    (this.iconSize - iconSize) / 2, 
                                    iconSize, iconSize);
                                
                                this.faviconCache.set(site, canvas);
                                resolve();
                            };
                            img.onerror = () => {
                                // En cas d'erreur, utiliser une icône de globe par défaut
                                const defaultIcon = actionIcons.find(icon => icon.name === 'Exploration');
                                const canvas = document.createElement('canvas');
                                canvas.width = this.iconSize;
                                canvas.height = this.iconSize;
                                const ctx = canvas.getContext('2d');
                                
                                // Dessiner le cercle de fond
                                ctx.beginPath();
                                ctx.arc(this.iconSize / 2, this.iconSize / 2, this.iconSize / 2, 0, Math.PI * 2);
                                ctx.fillStyle = 'rgba(42, 42, 58, 0.8)';
                                ctx.fill();
                                
                                // Dessiner une icône générique
                                ctx.fillStyle = '#4285F4';
                                const path = new Path2D(defaultIcon.svgPath);
                                ctx.scale(this.iconSize / 24, this.iconSize / 24);
                                ctx.fill(path);
                                
                                this.faviconCache.set(site, canvas);
                                resolve();
                            };
                            img.src = `https://www.google.com/s2/favicons?domain=${site}&sz=64`;
                        });
                    });
                    
                    await Promise.all(promises);
                }
                
                // Dessiner une icône à partir du sprite
                drawIcon(ctx, iconOrSite, x, y, size = this.iconSize, type = 'svg') {
                    if (!this.ready) return;
                    
                    ctx.save();
                    
                    if (type === 'favicon' && this.faviconCache.has(iconOrSite)) {
                        // Dessiner un favicon depuis le cache
                        const faviconCanvas = this.faviconCache.get(iconOrSite);
                        ctx.drawImage(faviconCanvas, x - size/2, y - size/2, size, size);
                    } else if (type === 'svg' && this.spritePositions.has(iconOrSite)) {
                        // Dessiner une icône SVG depuis la spritesheet
                        const pos = this.spritePositions.get(iconOrSite);
                        ctx.drawImage(
                            this.spriteSheet, 
                            pos.x, pos.y, 
                            this.iconSize, this.iconSize,
                            x - size/2, y - size/2, 
                            size, size
                        );
                    } else {
                        // Fallback: dessiner un cercle coloré
                        ctx.beginPath();
                        ctx.arc(x, y, size/2, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(42, 42, 58, 0.8)';
                        ctx.fill();
                        
                        // Ajouter une lettre ou un symbole
                        ctx.fillStyle = '#FFFFFF';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.font = `${size/2}px sans-serif`;
                        ctx.fillText('?', x, y);
                    }
                    
                    ctx.restore();
                }
            }
            
            // ===========================================
            // GESTIONNAIRE D'ICÔNES ET TOILE D'ARAIGNÉE
            // ===========================================
            
            class SpiderWebManager {
                constructor(iconManager) {
                    this.iconManager = iconManager;
                    this.webLines = [];
                    this.mainIcons = [];
                    this.secondaryIcons = [];
                    this.highlightedLine = null;
                    this.webCircles = [];
                    this.animatedLines = new Set();
                    
                    // Propriétés pour animation fluide
                    this.time = 0;
                    this.targetCameraOpacity = 0;
                    this.currentCameraOpacity = 0;
                    
                    // Configuration
                    this.numMainIcons = websites.length;
                    this.numSecondaryIcons = 5000; // Plusieurs milliers d'icônes
                    this.maxWebLines = 300;
                    this.numWebCircles = 8;
                }
                
                initialize() {
                    // Créer les cercles concentriques
                    this.createWebCircles();
                    
                    // Créer les icônes principales (sites web)
                    this.createMainIcons();
                    
                    // Créer les icônes secondaires
                    this.createSecondaryIcons();
                    
                    // Créer les liens entre certaines icônes
                    this.createWebConnections();
                }
                
                // Créer les cercles concentriques
                createWebCircles() {
                    const maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.8;
                    
                    for (let i = 1; i <= this.numWebCircles; i++) {
                        this.webCircles.push({
                            radius: maxRadius * (i / this.numWebCircles),
                            opacity: 0.05
                        });
                    }
                }
                
                // Créer les icônes principales
                createMainIcons() {
                    const distance = Math.min(window.innerWidth, window.innerHeight) * 0.4;
                    
                    for (let i = 0; i < this.numMainIcons; i++) {
                        const angle = (i / this.numMainIcons) * 2 * Math.PI;
                        const x = Math.cos(angle) * distance + centerX;
                        const y = Math.sin(angle) * distance + centerY;
                        
                        this.mainIcons.push({
                            site: websites[i],
                            x: x,
                            y: y,
                            size: 32,
                            angle: angle,
                            opacity: 0,
                            scale: 0,
                            targetOpacity: 1,
                            targetScale: 1,
                            animationDelay: 500 + i * 50
                        });
                        
                        // Ajouter une ligne de toile pour cette icône
                        this.webLines.push({
                            startX: centerX,
                            startY: centerY,
                            endX: x,
                            endY: y,
                            angle: angle,
                            length: distance,
                            opacity: 0,
                            targetOpacity: 1,
                            width: 1,
                            highlighted: false,
                            animationDelay: 500 + i * 50
                        });
                    }
                }
                
                // Créer les icônes secondaires
                createSecondaryIcons() {
                    // Distribution des icônes par profondeur
                    const depthDistribution = [
                        { depth: 1, percentage: 0.1, sizeFactor: 0.8, radius: 0.8 },
                        { depth: 2, percentage: 0.3, sizeFactor: 0.6, radius: 0.6 },
                        { depth: 3, percentage: 0.6, sizeFactor: 0.4, radius: 0.4 }
                    ];
                    
                    for (let i = 0; i < this.numSecondaryIcons; i++) {
                        // Déterminer la profondeur
                        const randomValue = Math.random();
                        let depth, sizeFactor, radiusFactor;
                        
                        if (randomValue < depthDistribution[0].percentage) {
                            depth = 1;
                            sizeFactor = depthDistribution[0].sizeFactor;
                            radiusFactor = depthDistribution[0].radius;
                        } else if (randomValue < depthDistribution[0].percentage + depthDistribution[1].percentage) {
                            depth = 2;
                            sizeFactor = depthDistribution[1].sizeFactor;
                            radiusFactor = depthDistribution[1].radius;
                        } else {
                            depth = 3;
                            sizeFactor = depthDistribution[2].sizeFactor;
                            radiusFactor = depthDistribution[2].radius;
                        }
                        
                        // Générer position sur un cercle concentrique avec variation
                        const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.6;
                        const radiusVariation = 0.1; // Variation pour ne pas avoir des cercles parfaits
                        const radius = baseRadius * radiusFactor * (1 + (Math.random() * radiusVariation * 2 - radiusVariation));
                        
                        // Angle aléatoire
                        const angle = Math.random() * 2 * Math.PI;
                        
                        // Position
                        const x = Math.cos(angle) * radius + centerX;
                        const y = Math.sin(angle) * radius + centerY;
                        
                        // Taille en fonction de la profondeur
                        const baseSize = 20;
                        const size = baseSize * sizeFactor;
                        
                        // Choisir une icône aléatoire
                        const randomIcon = allIcons[Math.floor(Math.random() * allIcons.length)];
                        
                        this.secondaryIcons.push({
                            icon: randomIcon,
                            x: x,
                            y: y,
                            size: size,
                            depth: depth,
                            angle: angle,
                            radius: radius,
                            opacity: 0,
                            scale: 0,
                            targetOpacity: depth === 3 ? 0.7 : 1,
                            targetScale: 1,
                            animationDelay: 2000 + (i % 100) * 20
                        });
                        
                        // Ajouter occasionnellement des lignes de toile pour les icônes de profondeur 1
                        if (depth === 1 && i % 5 === 0 && this.webLines.length < this.maxWebLines) {
                            const webLine = {
                                startX: centerX,
                                startY: centerY,
                                endX: x,
                                endY: y,
                                angle: angle,
                                length: radius,
                                opacity: 0,
                                targetOpacity: 0.1,
                                width: 1,
                                highlighted: false,
                                pulsate: Math.random() < 0.3,
                                animationDelay: 2500 + (i % 50) * 30
                            };
                            
                            this.webLines.push(webLine);
                        }
                    }
                }
                
                // Créer des connections entre certaines icônes proches
                createWebConnections() {
                    // Utiliser seulement les icônes de profondeur 1 pour les connexions
                    const depth1Icons = this.secondaryIcons.filter(icon => icon.depth === 1);
                    const maxConnections = Math.min(500, depth1Icons.length * 2);
                    
                    for (let i = 0; i < maxConnections; i++) {
                        if (this.webLines.length >= this.maxWebLines) break;
                        
                        const icon1 = depth1Icons[Math.floor(Math.random() * depth1Icons.length)];
                        const icon2 = depth1Icons[Math.floor(Math.random() * depth1Icons.length)];
                        
                        if (icon1 === icon2) continue;
                        
                        // Calculer la distance
                        const dx = icon2.x - icon1.x;
                        const dy = icon2.y - icon1.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        // Ne connecter que les icônes relativement proches
                        if (distance < 200) {
                            const angle = Math.atan2(dy, dx);
                            
                            this.webLines.push({
                                startX: icon1.x,
                                startY: icon1.y,
                                endX: icon2.x,
                                endY: icon2.y,
                                angle: angle,
                                length: distance,
                                opacity: 0,
                                targetOpacity: 0.05,
                                width: 1,
                                highlighted: false,
                                isConnection: true,
                                animationDelay: 4000 + i * 10
                            });
                        }
                    }
                }
                
                // Mettre à jour l'animation
                update(deltaTime) {
                    this.time += deltaTime;
                    
                    // Mettre à jour les opacités et échelles des icônes
                    const now = Date.now();
                    
                    // Mettre à jour les icônes principales
                    this.mainIcons.forEach(icon => {
                        if (now > icon.animationDelay) {
                            icon.opacity += (icon.targetOpacity - icon.opacity) * 0.05;
                            icon.scale += (icon.targetScale - icon.scale) * 0.05;
                        }
                    });
                    
                    // Mettre à jour les icônes secondaires
                    this.secondaryIcons.forEach(icon => {
                        if (now > icon.animationDelay) {
                            icon.opacity += (icon.targetOpacity - icon.opacity) * 0.05;
                            icon.scale += (icon.targetScale - icon.scale) * 0.05;
                        }
                    });
                    
                    // Mettre à jour les lignes
                    this.webLines.forEach(line => {
                        if (now > line.animationDelay) {
                            line.opacity += (line.targetOpacity - line.opacity) * 0.05;
                            
                            // Animation de pulsation pour certaines lignes
                            if (line.pulsate) {
                                const pulseFactor = Math.sin(this.time * 0.001) * 0.1 + 0.9;
                                line.opacity = line.targetOpacity * pulseFactor;
                            }
                        }
                    });
                    
                    // Animer aléatoirement certaines lignes
                    if (Math.random() < 0.01 && this.animatedLines.size < 10) {
                        const eligibleLines = this.webLines.filter(
                            line => !line.highlighted && !this.animatedLines.has(line)
                        );
                        
                        if (eligibleLines.length > 0) {
                            const randomLine = eligibleLines[Math.floor(Math.random() * eligibleLines.length)];
                            randomLine.highlighted = true;
                            randomLine.originalOpacity = randomLine.opacity;
                            randomLine.targetOpacity = 0.3;
                            randomLine.width = 1.5;
                            this.animatedLines.add(randomLine);
                            
                            // Réinitialiser après animation
                            setTimeout(() => {
                                randomLine.highlighted = false;
                                randomLine.targetOpacity = randomLine.originalOpacity || 0.1;
                                randomLine.width = 1;
                                this.animatedLines.delete(randomLine);
                            }, 500 + Math.random() * 1000);
                        }
                    }
                    
                    // Animer l'effet de caméra web
                    this.currentCameraOpacity += (this.targetCameraOpacity - this.currentCameraOpacity) * 0.1;
                }
                
                // Dessiner sur le canvas
                draw() {
                    // Effacer le canvas
                    iconCtx.clearRect(0, 0, iconsCanvas.width, iconsCanvas.height);
                    
                    // Dessiner les cercles concentriques
                    this.webCircles.forEach(circle => {
                        iconCtx.beginPath();
                        iconCtx.arc(centerX, centerY, circle.radius, 0, Math.PI * 2);
                        iconCtx.strokeStyle = `rgba(255, 255, 255, ${circle.opacity})`;
                        iconCtx.lineWidth = 1;
                        iconCtx.stroke();
                    });
                    
                    // Dessiner les lignes de toile
                    this.webLines.forEach(line => {
                        if (line.opacity > 0.01) {
                            iconCtx.beginPath();
                            iconCtx.moveTo(line.startX, line.startY);
                            iconCtx.lineTo(line.endX, line.endY);
                            
                            // Déterminer le style selon que la ligne est mise en évidence ou non
                            if (line.highlighted) {
                                iconCtx.strokeStyle = `rgba(255, 255, 255, ${line.opacity})`;
                                iconCtx.shadowBlur = 5;
                                iconCtx.shadowColor = 'rgba(255, 255, 255, 0.5)';
                            } else {
                                iconCtx.strokeStyle = `rgba(255, 255, 255, ${line.opacity})`;
                                iconCtx.shadowBlur = 0;
                            }
                            
                            iconCtx.lineWidth = line.width || 1;
                            iconCtx.stroke();
                        }
                    });
                    
                    // Dessiner les icônes en ordre inverse de profondeur (arrière-plan d'abord)
                    // Icônes secondaires de profondeur 3
                    this.secondaryIcons
                        .filter(icon => icon.depth === 3 && icon.opacity > 0.01)
                        .forEach(icon => {
                            if (icon.scale > 0.01) {
                                iconCtx.globalAlpha = icon.opacity;
                                this.iconManager.drawIcon(
                                    iconCtx, 
                                    icon.icon, 
                                    icon.x, 
                                    icon.y, 
                                    icon.size * icon.scale
                                );
                            }
                        });
                    
                    // Icônes secondaires de profondeur 2
                    this.secondaryIcons
                        .filter(icon => icon.depth === 2 && icon.opacity > 0.01)
                        .forEach(icon => {
                            if (icon.scale > 0.01) {
                                iconCtx.globalAlpha = icon.opacity;
                                this.iconManager.drawIcon(
                                    iconCtx, 
                                    icon.icon, 
                                    icon.x, 
                                    icon.y, 
                                    icon.size * icon.scale
                                );
                            }
                        });
                    
                    // Icônes secondaires de profondeur 1
                    this.secondaryIcons
                        .filter(icon => icon.depth === 1 && icon.opacity > 0.01)
                        .forEach(icon => {
                            if (icon.scale > 0.01) {
                                iconCtx.globalAlpha = icon.opacity;
                                this.iconManager.drawIcon(
                                    iconCtx, 
                                    icon.icon, 
                                    icon.x, 
                                    icon.y, 
                                    icon.size * icon.scale
                                );
                            }
                        });
                    
                    // Icônes principales (sites web)
                    this.mainIcons.forEach(icon => {
                        if (icon.opacity > 0.01 && icon.scale > 0.01) {
                            iconCtx.globalAlpha = icon.opacity;
                            this.iconManager.drawIcon(
                                iconCtx, 
                                icon.site, 
                                icon.x, 
                                icon.y, 
                                icon.size * icon.scale,
                                'favicon'
                            );
                        }
                    });
                    
                    // Réinitialiser l'opacité globale
                    iconCtx.globalAlpha = 1;
                    
                    // Dessiner l'effet de caméra web si actif
                    if (this.currentCameraOpacity > 0.01) {
                        iconCtx.fillStyle = `rgba(255, 255, 255, ${this.currentCameraOpacity * 0.1})`;
                        
                        // Créer un motif de grille
                        for (let x = 0; x < iconsCanvas.width; x += 30) {
                            for (let y = 0; y < iconsCanvas.height; y += 30) {
                                iconCtx.beginPath();
                                iconCtx.arc(x, y, 1, 0, Math.PI * 2);
                                iconCtx.fill();
                            }
                        }
                    }
                }
                
                // Mettre en évidence une ligne proche d'un angle
                highlightNearestWebLine(shotAngle) {
                    // Normaliser l'angle à [-π, π]
                    while (shotAngle > Math.PI) shotAngle -= 2 * Math.PI;
                    while (shotAngle < -Math.PI) shotAngle += 2 * Math.PI;
                    
                    let closestLine = null;
                    let minAngleDiff = Math.PI;
                    
                    this.webLines.forEach(line => {
                        let lineAngle = line.angle;
                        
                        // Normaliser l'angle de la ligne
                        while (lineAngle > Math.PI) lineAngle -= 2 * Math.PI;
                        while (lineAngle < -Math.PI) lineAngle += 2 * Math.PI;
                        
                        const angleDiff = Math.abs(shotAngle - lineAngle);
                        const normalizedDiff = Math.min(angleDiff, 2 * Math.PI - angleDiff);
                        
                        if (normalizedDiff < minAngleDiff) {
                            minAngleDiff = normalizedDiff;
                            closestLine = line;
                        }
                    });
                    
                    // Réinitialiser les lignes précédemment mises en évidence
                    this.resetWebLineHighlights();
                    
                    if (closestLine && minAngleDiff < Math.PI / 8) {
                        closestLine.highlighted = true;
                        closestLine.originalOpacity = closestLine.opacity;
                        closestLine.targetOpacity = 0.3;
                        closestLine.width = 1.5;
                        this.highlightedLine = closestLine;
                    }
                }
                
                // Réinitialiser la mise en évidence des lignes
                resetWebLineHighlights() {
                    if (this.highlightedLine) {
                        this.highlightedLine.highlighted = false;
                        this.highlightedLine.targetOpacity = this.highlightedLine.originalOpacity || 0.1;
                        this.highlightedLine.width = 1;
                        this.highlightedLine = null;
                    }
                }
                
                // Activer l'effet de caméra web
                activateCameraWeb() {
                    this.targetCameraOpacity = 1;
                    
                    setTimeout(() => {
                        this.targetCameraOpacity = 0;
                    }, 1000);
                }
                
                // Redimensionner en fonction de la taille de la fenêtre
                resize() {
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    
                    // Mettre à jour les cercles concentriques
                    const maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.8;
                    this.webCircles.forEach((circle, index) => {
                        circle.radius = maxRadius * ((index + 1) / this.numWebCircles);
                    });
                    
                    // Mettre à jour les icônes principales
                    const mainDistance = Math.min(window.innerWidth, window.innerHeight) * 0.4;
                    this.mainIcons.forEach((icon, index) => {
                        const angle = (index / this.numMainIcons) * 2 * Math.PI;
                        icon.x = Math.cos(angle) * mainDistance + centerX;
                        icon.y = Math.sin(angle) * mainDistance + centerY;
                        icon.angle = angle;
                    });
                    
                    // Mettre à jour les lignes principales
                    for (let i = 0; i < this.numMainIcons; i++) {
                        const icon = this.mainIcons[i];
                        const line = this.webLines[i];
                        
                        line.startX = centerX;
                        line.startY = centerY;
                        line.endX = icon.x;
                        line.endY = icon.y;
                        line.angle = icon.angle;
                        line.length = mainDistance;
                    }
                    
                    // Mettre à jour les icônes secondaires
                    this.secondaryIcons.forEach(icon => {
                        const radiusFactor = icon.depth === 1 ? 0.8 : (icon.depth === 2 ? 0.6 : 0.4);
                        const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.6;
                        const radius = baseRadius * radiusFactor * (1 + Math.random() * 0.1 - 0.05);
                        
                        icon.x = Math.cos(icon.angle) * radius + centerX;
                        icon.y = Math.sin(icon.angle) * radius + centerY;
                        icon.radius = radius;
                    });
                    
                    // Mettre à jour les lignes secondaires
                    this.webLines.slice(this.numMainIcons).forEach(line => {
                        if (!line.isConnection) {
                            line.startX = centerX;
                            line.startY = centerY;
                            
                            // Trouver l'icône associée à cette ligne
                            const matchingIcon = this.secondaryIcons.find(
                                icon => Math.abs(icon.angle - line.angle) < 0.01 && 
                                       Math.abs(icon.radius - line.length) < 10
                            );
                            
                            if (matchingIcon) {
                                line.endX = matchingIcon.x;
                                line.endY = matchingIcon.y;
                                line.length = matchingIcon.radius;
                            }
                        }
                    });
                }
            }
            
            // ===========================================
            // GESTIONNAIRE D'ANIMATIONS ET DE RENDU
            // ===========================================
            
            class AnimationManager {
                constructor() {
                    this.lastFrameTime = 0;
                    this.frameCount = 0;
                    this.fps = 0;
                    this.fpsUpdateInterval = 500; // ms
                    this.lastFpsUpdate = 0;
                    this.running = false;
                    this.callbacks = {
                        update: [],
                        draw: []
                    };
                }
                
                start() {
                    if (this.running) return;
                    
                    this.running = true;
                    this.lastFrameTime = performance.now();
                    this.lastFpsUpdate = this.lastFrameTime;
                    this.frameCount = 0;
                    
                    this.animationLoop();
                }
                
                stop() {
                    this.running = false;
                }
                
                addUpdateCallback(callback) {
                    this.callbacks.update.push(callback);
                    return this;
                }
                
                addDrawCallback(callback) {
                    this.callbacks.draw.push(callback);
                    return this;
                }
                
                animationLoop(currentTime) {
                    if (!this.running) return;
                    
                    // Calculer le delta time
                    const deltaTime = currentTime - this.lastFrameTime;
                    this.lastFrameTime = currentTime;
                    
                    // Mettre à jour le FPS
                    this.frameCount++;
                    if (currentTime - this.lastFpsUpdate > this.fpsUpdateInterval) {
                        this.fps = 1000 * this.frameCount / (currentTime - this.lastFpsUpdate);
                        this.lastFpsUpdate = currentTime;
                        this.frameCount = 0;
                    }
                    
                    // Exécuter les callbacks d'update
                    for (const callback of this.callbacks.update) {
                        callback(deltaTime / 1000);
                    }
                    
                    // Exécuter les callbacks de dessin
                    for (const callback of this.callbacks.draw) {
                        callback();
                    }
                    
                    // Continuer la boucle
                    requestAnimationFrame(this.animationLoop.bind(this));
                }
            }
            
            // ===========================================
            // GESTIONNAIRE DE FOND ANIMÉ
            // ===========================================
            
            class BackgroundManager {
                constructor() {
                    this.time = 0;
                    this.stars = [];
                    this.numStars = 100;
                    
                    // Générer les étoiles
                    for (let i = 0; i < this.numStars; i++) {
                        this.stars.push({
                            x: Math.random() * backgroundCanvas.width,
                            y: Math.random() * backgroundCanvas.height,
                            size: Math.random() * 2 + 1,
                            blinkSpeed: Math.random() * 5 + 1,
                            blinkOffset: Math.random() * Math.PI * 2
                        });
                    }
                }
                
                update(deltaTime) {
                    this.time += deltaTime;
                }
                
                draw() {
                    // Fond dégradé sombre
                    const gradient = bgCtx.createRadialGradient(
                        centerX, centerY, 0,
                        centerX, centerY, Math.max(centerX, centerY)
                    );
                    gradient.addColorStop(0, '#1e1e2e');
                    gradient.addColorStop(1, '#12121e');
                    
                    bgCtx.fillStyle = gradient;
                    bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
                    
                    // Dessiner les étoiles
                    for (const star of this.stars) {
                        const brightness = (Math.sin(this.time * star.blinkSpeed + star.blinkOffset) + 1) * 0.5;
                        bgCtx.fillStyle = `rgba(255, 255, 255, ${0.3 + brightness * 0.7})`;
                        bgCtx.beginPath();
                        bgCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                        bgCtx.fill();
                    }
                }
                
                resize() {
                    // Repositionner les étoiles
                    for (let i = 0; i < this.numStars; i++) {
                        this.stars[i].x = Math.random() * backgroundCanvas.width;
                        this.stars[i].y = Math.random() * backgroundCanvas.height;
                    }
                }
            }
            
            // ===========================================
            // GESTIONNAIRE D'ARAIGNÉE
            // ===========================================
            
            class SpiderManager {
    constructor(spiderWebManager) {
        this.spiderElement = spider;
        this.leftPupil = leftPupil;
        this.rightPupil = rightPupil;
        this.spiderWebManager = spiderWebManager;
        this.spiderThread = this.spiderElement.querySelector('.spider-thread');
        
        this.lastActivity = Date.now();
        this.idleAnimationTimer = null;
        this.isAttached = false;
        
        this.animations = [
            this.blinkEyes.bind(this),
            this.lookLeft.bind(this),
            this.lookRight.bind(this),
            this.shootWebAtCamera.bind(this)
        ];
        
        // Initialiser la position de l'araignée
        this.spiderElement.style.top = '-120px';
        
        // Initialiser le fil d'araignée
        this.updateThreadPosition();
        
        // Ajouter un écouteur pour le redimensionnement de la fenêtre
        window.addEventListener('resize', this.updateThreadPosition.bind(this));
    }
    
    // Mettre à jour la position du fil
    updateThreadPosition() {
        // Le fil est toujours positionné par rapport à l'araignée
        // mais s'étend jusqu'en haut de l'écran et au-delà
        this.spiderThread.style.height = `calc(100vh + ${this.spiderElement.offsetHeight}px)`;
    }
    
    // Animation d'entrée
    animateEntrance(callback) {
        // Calcul de la position finale de l'araignée
        const loginRect = loginContainer.getBoundingClientRect();
        const targetTop = loginRect.top - this.spiderElement.offsetHeight + 20;
        
        // Descendre l'araignée
        this.spiderElement.style.transition = 'top 2s ease-in-out';
        this.spiderElement.style.top = targetTop + 'px';
        
        // Mettre à jour la position du fil pendant l'animation
        const updateThread = () => {
            this.updateThreadPosition();
            
            if (parseFloat(this.spiderElement.style.top) < targetTop) {
                requestAnimationFrame(updateThread);
            }
        };
        
        requestAnimationFrame(updateThread);
        
        // Appeler le callback après l'animation
        setTimeout(() => {
            // Attacher l'araignée au conteneur de login
            this.attachToLoginContainer();
            if (callback) callback();
        }, 2000);
    }
    
    // Suivre le curseur avec les yeux
    trackEyes(x, y) {
        if (document.activeElement === password && !password.type.includes('text')) {
            // Fermer les yeux quand on tape dans le champ de mot de passe
            this.leftPupil.parentElement.style.height = '1px';
            this.rightPupil.parentElement.style.height = '1px';
            return;
        } else {
            this.leftPupil.parentElement.style.height = '';
            this.rightPupil.parentElement.style.height = '';
        }
        
        const eyeRect = this.leftPupil.parentElement.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        const maxDistance = eyeRect.width / 4;
        const angle = Math.atan2(y - eyeCenterY, x - eyeCenterX);
        const distance = Math.min(maxDistance, Math.sqrt(Math.pow(x - eyeCenterX, 2) + Math.pow(y - eyeCenterY, 2)) / 10);
        
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;
        
        this.leftPupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        this.rightPupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    // Animation de clignotement des yeux
    blinkEyes() {
        this.leftPupil.parentElement.style.height = '1px';
        this.rightPupil.parentElement.style.height = '1px';
        setTimeout(() => {
            if (!(document.activeElement === password && !password.type.includes('text'))) {
                this.leftPupil.parentElement.style.height = '';
                this.rightPupil.parentElement.style.height = '';
            }
        }, 150);
    }
    
    // Regarder à gauche
    lookLeft() {
        this.leftPupil.style.transform = 'translate(-3px, 0)';
        this.rightPupil.style.transform = 'translate(-3px, 0)';
        setTimeout(() => {
            this.leftPupil.style.transform = '';
            this.rightPupil.style.transform = '';
        }, 1500);
    }
    
    // Regarder à droite
    lookRight() {
        this.leftPupil.style.transform = 'translate(3px, 0)';
        this.rightPupil.style.transform = 'translate(3px, 0)';
        setTimeout(() => {
            this.leftPupil.style.transform = '';
            this.rightPupil.style.transform = '';
        }, 1500);
    }
    
    // Tirer une toile vers la caméra
    shootWebAtCamera() {
        cameraWeb.style.opacity = '1';
        this.spiderElement.style.transform = 'translateX(-50%) scale(0.9)';
        setTimeout(() => {
            this.spiderElement.style.transform = 'translateX(-50%) scale(1)';
        }, 200);
        setTimeout(() => {
            cameraWeb.style.opacity = '0';
        }, 1000);
    }
    
    // Démarrer les animations inactives
    startIdleAnimations() {
        // Arrêter le timer précédent s'il existe
        if (this.idleAnimationTimer) {
            clearTimeout(this.idleAnimationTimer);
        }
        
        // Fonction pour démarrer une animation aléatoire
        const startRandomAnimation = () => {
            if (Date.now() - this.lastActivity > 5000) {
                const randomAnimation = this.animations[Math.floor(Math.random() * this.animations.length)];
                randomAnimation();
            }
            
            this.idleAnimationTimer = setTimeout(() => {
                startRandomAnimation();
            }, 5000 + Math.random() * 5000);
        };
        
        // Démarrer la première animation
        startRandomAnimation();
        
        // Réinitialiser le timer d'activité sur les interactions utilisateur
        document.addEventListener('mousemove', () => {
            this.lastActivity = Date.now();
        });
        
        document.addEventListener('keydown', () => {
            this.lastActivity = Date.now();
        });
        
        document.addEventListener('click', () => {
            this.lastActivity = Date.now();
        });
    }
    
    // Attacher l'araignée au conteneur de login
    attachToLoginContainer() {
        // Marquer l'araignée comme attachée
        this.isAttached = true;
        
        // Retirer la transition pour permettre des mises à jour instantanées
        this.spiderElement.style.transition = 'none';
        
        // Fonction pour mettre à jour la position
        const updatePosition = () => {
            const loginRect = loginContainer.getBoundingClientRect();
            const targetTop = loginRect.top - this.spiderElement.offsetHeight + 20; // 20px de chevauchement
            this.spiderElement.style.top = targetTop + 'px';
            
            // Mettre à jour la position du fil
            this.updateThreadPosition();
        };
        
        // Mettre à jour la position initiale
        updatePosition();
        
        // Ajouter un écouteur pour le redimensionnement de la fenêtre
        window.addEventListener('resize', updatePosition);
        
        // Créer un MutationObserver pour détecter les changements de position du conteneur
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' || 
                    mutation.attributeName === 'style' || 
                    mutation.attributeName === 'class') {
                    updatePosition();
                }
            });
        });
        
        observer.observe(loginContainer, { 
            attributes: true, 
            attributeFilter: ['style', 'class'],
            subtree: true,
            childList: true
        });
    }
}


            
            // ===========================================
            // GESTIONNAIRE DU FORMULAIRE DE CONNEXION
            // ===========================================
            
            class LoginFormManager {
    constructor(spiderManager) {
        this.loginContainer = loginContainer;
        this.titleSpans = titleSpans;
        this.usernameGroup = usernameGroup;
        this.passwordGroup = passwordGroup;
        this.loginButton = loginButton;
        this.passwordToggle = passwordToggle;
        this.password = password;
        this.username = username;
        this.spiderManager = spiderManager;
        
        // État du formulaire
        this.loginContainer.style.opacity = '0';
        this.activeInput = null;
        this.singleInputMode = false;
        this.originalContainerHeight = null;
        
        // Configurer les gestionnaires d'événements
        this.setupEventHandlers();
    }
    
    // Configurer les gestionnaires d'événements
    setupEventHandlers() {
    // Suivi de la saisie dans le champ nom d'utilisateur
    this.username.addEventListener('input', () => {
        const rect = this.username.getBoundingClientRect();
        const x = rect.left + this.username.value.length * 8;
        const y = rect.top + rect.height / 2;
        
        this.spiderManager.trackEyes(x, y);
    });
    
    // Basculement de visibilité du mot de passe
    this.passwordToggle.addEventListener('click', () => {
        if (this.password.type === 'password') {
            this.password.type = 'text';
            this.spiderManager.leftPupil.parentElement.style.height = '6px';
            this.spiderManager.rightPupil.parentElement.style.height = '6px';
        } else {
            this.password.type = 'password';
            if (document.activeElement === this.password) {
                this.spiderManager.leftPupil.parentElement.style.height = '1px';
                this.spiderManager.rightPupil.parentElement.style.height = '1px';
            }
        }
    });
    
    // Focus et blur pour le champ mot de passe
    this.password.addEventListener('focus', () => {
        if (!this.singleInputMode) {
            this.activateSingleInputMode(this.passwordGroup);
        }
        
        if (this.password.type === 'password') {
            this.spiderManager.leftPupil.parentElement.style.height = '1px';
            this.spiderManager.rightPupil.parentElement.style.height = '1px';
        } else {
            this.spiderManager.leftPupil.parentElement.style.height = '6px';
            this.spiderManager.rightPupil.parentElement.style.height = '6px';
        }
    });
    
    this.password.addEventListener('blur', () => {
        this.spiderManager.leftPupil.parentElement.style.height = '';
        this.spiderManager.rightPupil.parentElement.style.height = '';
    });
    
    // Focus pour le champ nom d'utilisateur
    this.username.addEventListener('focus', () => {
        if (!this.singleInputMode) {
            this.activateSingleInputMode(this.usernameGroup);
        }
    });
    
    // Gestion du bouton de connexion en mode input unique
    this.loginButton.addEventListener('click', () => {
        if (this.singleInputMode) {
            // Si nous sommes en mode d'entrée unique et sur le dernier champ (mot de passe)
            if (this.activeInput === this.passwordGroup) {
                this.authenticate();
            } else {
                this.switchInputField();
            }
        } else {
            // Vérifier si les champs sont vides avant d'authentifier
            const usernameValue = this.username.value.trim();
            const passwordValue = this.password.value.trim();
            
            if (!usernameValue && !passwordValue) {
                // Si les deux champs sont vides, activer le mode d'entrée unique
                this.activateSingleInputMode(this.usernameGroup);
            } else {
                // Sinon tenter l'authentification
                this.authenticate();
            }
        }
    });
    
    // Gestion de la touche Entrée
    this.username.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.singleInputMode) {
                this.switchInputField();
            } else {
                const usernameValue = this.username.value.trim();
                if (usernameValue) {
                    this.authenticate();
                } else {
                    this.activateSingleInputMode(this.usernameGroup);
                }
            }
        }
    });
    
    this.password.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.authenticate();
        }
    });
}

    
                // NOUVELLE MÉTHODE: Authentification
            authenticate() {
    // Validation des entrées
    const usernameValue = this.username.value.trim();
    const passwordValue = this.password.value.trim();
    
    // Fonction pour vérifier si une chaîne est une URL valide
    const isValidUrl = (string) => {
        try {
            // On utilise l'objet URL pour la validation
            const url = new URL(string);
            // Vérifier que le protocole est http ou https
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (e) {
            return false;
        }
    };
    
    // Vérifier les conditions d'authentification
    let isAuthenticated = false;
    
    // Cas 1: Deux champs avec des URLs valides
    if (usernameValue && passwordValue && isValidUrl(usernameValue) && isValidUrl(passwordValue)) {
        isAuthenticated = true;
    }
    // Cas 2: Un champ avec URL valide et l'autre vide
    else if ((usernameValue && !passwordValue && isValidUrl(usernameValue)) || 
             (!usernameValue && passwordValue && isValidUrl(passwordValue))) {
        isAuthenticated = true;
    }
    
    // Si authentification échouée, afficher un message d'erreur subtil
    if (!isAuthenticated) {
        this.loginButton.classList.add('error');
        this.loginButton.innerHTML = 'Accès refusé';
        
        setTimeout(() => {
            this.loginButton.classList.remove('error');
            this.loginButton.innerHTML = 'Se connecter';
            this.loginButton.disabled = false;
        }, 2000);
        
        return;
    }
    
    // Animation de connexion en cours
    this.loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
    this.loginButton.disabled = true;
    
    // Simuler un délai d'authentification (pour l'effet visuel)
    setTimeout(() => {
        // Appeler la fonction de transition
        window.handleAuthentication();
    }, 1000);
}

    
    // Activer le mode input unique
    activateSingleInputMode(activeGroup) {
                if (!this.originalContainerHeight) {
                    // Sauvegarder la hauteur originale du conteneur
                    this.originalContainerHeight = this.loginContainer.offsetHeight;
                }
                
                this.singleInputMode = true;
                this.activeInput = activeGroup;
                
                const inactiveGroup = activeGroup === this.usernameGroup ? 
                    this.passwordGroup : this.usernameGroup;
                
                // Mettre à jour le texte du bouton
                this.loginButton.textContent = 'Continuer';
                
                // Marquer comme active/inactive pour le CSS
                activeGroup.classList.add('active-input');
                
                // Animer la sortie de l'input inactif
                inactiveGroup.classList.add('exiting');
                
                setTimeout(() => {
                    // Supprimer l'élément inactif du DOM
                    inactiveGroup.style.display = 'none';
                    inactiveGroup.classList.remove('exiting');
                    
                    // Ajuster la hauteur du conteneur
                    this.adjustContainerSize();
                }, 400); // Durée de l'animation
            }
    
    // Passer à l'autre champ d'input
    switchInputField() {
                const currentInput = this.activeInput;
                const nextInput = currentInput === this.usernameGroup ? 
                    this.passwordGroup : this.usernameGroup;
                
                // Marquer l'input actuel pour l'animation de sortie
                currentInput.classList.add('exiting');
                
                setTimeout(() => {
                    // Cacher l'input actuel
                    currentInput.style.display = 'none';
                    currentInput.classList.remove('active-input', 'exiting');
                    
                    // Préparer le nouvel input
                    nextInput.style.display = '';
                    nextInput.classList.add('entering', 'active-input');
                    
                    // Mettre à jour l'input actif
                    this.activeInput = nextInput;
                    
                    // Si on passe au champ de mot de passe, c'est la dernière étape
                    if (nextInput === this.passwordGroup) {
                        this.loginButton.textContent = 'Se connecter';
                    } else {
                        this.loginButton.textContent = 'Continuer';
                    }
                    
                    // Ajuster la taille du conteneur
                    this.adjustContainerSize();
                    
                    // Focus automatique sur le nouveau champ
                    if (nextInput === this.usernameGroup) {
                        this.username.focus();
                    } else {
                        this.password.focus();
                    }
                    
                    // Retirer la classe d'animation après qu'elle soit terminée
                    setTimeout(() => {
                        nextInput.classList.remove('entering');
                    }, 400);
                }, 400); // Durée de l'animation
            }
    
    // Ajuster la taille du conteneur de login
    adjustContainerSize() {
        // Ajouter la classe pour l'animation
        this.loginContainer.classList.add('single-input');
        
        // Forcer un reflow pour calculer la nouvelle hauteur
        requestAnimationFrame(() => {
            const newHeight = this.loginTitle.offsetHeight + 
                this.activeInput.offsetHeight + 
                this.loginButton.offsetHeight + 
                60; // Padding approximatif
            
            this.loginContainer.style.height = `${newHeight}px`;
        });
    }
    
    // Animer l'apparition du formulaire
    animateForm() {
        // Tirer sur le conteneur de connexion
        this.createWebShot(this.loginContainer, () => {
            this.loginContainer.style.transition = 'opacity 1s ease-in-out';
            this.loginContainer.style.opacity = '1';
            
            // Animer les lettres du titre
            setTimeout(() => {
                this.titleSpans.forEach((span, index) => {
                    setTimeout(() => {
                        this.createWebShot(span, () => {
                            span.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        });
                    }, index * 300);
                });
                
                // Animer le champ nom d'utilisateur
                setTimeout(() => {
                    this.createWebShot(this.usernameGroup, () => {
                        this.usernameGroup.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                        this.usernameGroup.style.opacity = '1';
                        this.usernameGroup.style.transform = 'translateY(0)';
                        
                        // Animer le champ mot de passe
                        setTimeout(() => {
                            this.createWebShot(this.passwordGroup, () => {
                                this.passwordGroup.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                                this.passwordGroup.style.opacity = '1';
                                this.passwordGroup.style.transform = 'translateY(0)';
                                
                                // Animer le bouton de connexion
                                setTimeout(() => {
                                    this.createWebShot(this.loginButton, () => {
                                        this.loginButton.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                                        this.loginButton.style.opacity = '1';
                                        this.loginButton.style.transform = 'translateY(0)';
                                        
                                        // Animer le bouton de visibilité du mot de passe
                                        setTimeout(() => {
                                            this.createWebShot(this.passwordToggle, () => {
                                                this.passwordToggle.style.transition = 'opacity 0.5s ease-in-out';
                                                this.passwordToggle.style.opacity = '1';
                                                
                                                // Configuration terminée, démarrer les animations inactives
                                                this.spiderManager.startIdleAnimations();
                                            });
                                        }, 800);
                                    });
                                }, 800);
                            });
                        }, 800);
                    });
                }, this.titleSpans.length * 300 + 500);
            }, 1000);
        });
    }
    
    // Fonction pour créer l'animation de tir de toile
    createWebShot(target, callback) {
        const source = this.spiderManager.spiderElement;
        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        
        const startX = sourceRect.left + sourceRect.width / 2;
        const startY = sourceRect.top + sourceRect.height / 2;
        const endX = targetRect.left + targetRect.width / 2;
        const endY = targetRect.top + targetRect.height / 2;
        
        const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX);
        
        const webShot = document.createElement('div');
        webShot.className = 'web-shot';
        webShot.style.left = `${startX}px`;
        webShot.style.top = `${startY}px`;
        webShot.style.width = '0';
        webShot.style.height = '2px';
        webShot.style.transform = `rotate(${angle}rad)`;
        document.body.appendChild(webShot);
        
        // Animer le tir de toile
        setTimeout(() => {
            webShot.style.transition = 'width 0.3s ease-out, opacity 0.3s ease-out';
            webShot.style.width = `${distance}px`;
            webShot.style.opacity = '1';
            
            // Retirer avec la cible
            setTimeout(() => {
                webShot.style.transition = 'width 0.3s ease-in';
                webShot.style.width = '0';
                
                if (callback) {
                    callback();
                }
                
                // Supprimer l'élément de toile
                setTimeout(() => {
                    webShot.remove();
                }, 300);
            }, 300);
        }, 10);
    }
}


            
            // ===========================================
            // INITIALISATION ET DÉMARRAGE
            // ===========================================
            
            // Initialiser le gestionnaire d'icônes
            async function initializeApplication() {
    try {
        // Créer et initialiser le gestionnaire de sprites d'icônes
        const iconManager = new IconSpriteManager(allIcons);
        await iconManager.initialize();
        
        // Créer le gestionnaire de toile d'araignée
        const spiderWebManager = new SpiderWebManager(iconManager);
        spiderWebManager.initialize();
        
        // Créer le gestionnaire d'araignée
        const spiderManager = new SpiderManager(spiderWebManager);
        
        // Créer le gestionnaire de formulaire
        const loginFormManager = new LoginFormManager(spiderManager);
        
        // Créer le gestionnaire de fond
        const backgroundManager = new BackgroundManager();
        
        // Créer le gestionnaire d'animation
        const animationManager = new AnimationManager();
        
        // Ajouter les callbacks d'update
        animationManager
            .addUpdateCallback(deltaTime => spiderWebManager.update(deltaTime))
            .addUpdateCallback(deltaTime => backgroundManager.update(deltaTime))
            .addDrawCallback(() => backgroundManager.draw())
            .addDrawCallback(() => spiderWebManager.draw());
        
        // Démarrer le gestionnaire d'animation
        animationManager.start();
        
// Configurer le gestionnaire de redimensionnement
window.addEventListener('resize', () => {
    resizeCanvases();
    spiderWebManager.resize();
    backgroundManager.resize();
    
    // Recalculer la position de l'araignée si elle est déjà attachée
    if (spiderManager.isAttached) {
        const loginRect = loginContainer.getBoundingClientRect();
        const targetTop = loginRect.top - spider.offsetHeight + 20;
        spider.style.top = targetTop + 'px';
        spiderManager.updateThreadPosition(); // Ajoutez cette ligne
    }
});


        
        // Configurer le suivi du curseur
        document.addEventListener('mousemove', e => {
            spiderManager.trackEyes(e.clientX, e.clientY);
        });
        
        // Configurer le clic sur l'araignée
        spider.addEventListener('click', () => {
            spider.style.transform = 'translateX(-50%) scale(0.9)';
            setTimeout(() => {
                spider.style.transform = 'translateX(-50%) scale(1)';
            }, 200);
            
            // Shoot web at camera
            cameraWeb.style.opacity = '1';
            setTimeout(() => {
                cameraWeb.style.opacity = '0';
            }, 1000);
        });
        
        // Masquer l'écran de chargement
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
        
        // Démarrer la séquence d'animation
        setTimeout(() => {
            spiderManager.animateEntrance(() => {
                loginFormManager.animateForm();
            });
        }, 1000);
        
    } catch (error) {
        console.error('Erreur lors de l\'initialisation :', error);
        alert('Une erreur s\'est produite lors du chargement. Veuillez rafraîchir la page.');
    }
}

            
            // Démarrer l'application
            initializeApplication();
            
        });

    // ====== CODE DE L'APPLICATION PRINCIPALE ======
    document.addEventListener('DOMContentLoaded', function() {
    // Data model
const appData = {
    items: [],
    selectedItems: [],
    currentPath: ['Home'],
    clipboardItems: [],
    clipboardOperation: null, // 'copy' or 'move'
    currentView: 'home',
    isSelectionMode: false
};

// Initialisation de Supabase
const SUPABASE_URL = 'https://xkknjyexynzukytfnlaj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhra25qeWV4eW56dWt5dGZubGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1OTI2MzksImV4cCI6MjA3MzE2ODYzOX0.wqp1W5TGJnbl_bhOwISs1s3Hy6bjFPUQhYX64vz3I9o';
let supabase = null;

// Fonction pour initialiser Supabase
function initSupabase() {
    try {
        if (window.supabase) {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('Supabase initialisé avec succès');
            return true;
        } else {
            console.error('La bibliothèque Supabase n\'est pas disponible');
            return false;
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de Supabase:', error);
        return false;
    }
}

// Vérifier si supabase est disponible
const supabaseAvailable = initSupabase();

    
// Structure des dossiers
const fileSystem = {
    Home: {
        type: 'home',
        items: {
            Storage: {
                type: 'folder',
                items: {
                    Desktop: {
                        type: 'folder',
                        items: {
                            GitHub: { type: 'app', url: 'https://github.com' },
                            YouTube: { type: 'app', url: 'https://youtube.com' },
                            Twitter: { type: 'app', url: 'https://twitter.com' }
                        }
                    },
                    Work: {
                        type: 'folder',
                        items: {
                            Slack: { type: 'app', url: 'https://slack.com' },
                            Notion: { type: 'app', url: 'https://notion.so' },
                            Gmail: { type: 'app', url: 'https://gmail.com' }
                        }
                    },
                    Entertainment: {
                        type: 'folder',
                        items: {
                            Netflix: { type: 'app', url: 'https://netflix.com' },
                            Spotify: { type: 'app', url: 'https://spotify.com' },
                            Twitch: { type: 'app', url: 'https://twitch.tv' }
                        }
                    },
                    Movies: {
                        type: 'folder',
                        items: {}
                    },
                    Music: {
                        type: 'folder',
                        items: {}
                    }
                }
            }
        }
    }
};

// Ajouter au système de fichiers existant
fileSystem.Home.items['Jean-Louis Likula'] = {
    type: 'custom',
    description: 'Profil d\'utilisateur avec surveillance des appareils',
    items: {} // Nous gérons le contenu dynamiquement dans loadJeanLouisContent()
};

// Ajouter le TasksStorage au système de fichiers
fileSystem.Home.items['TasksStorage'] = {
    type: 'folder',
    items: {
        '2025': {
            type: 'folder',
            items: {
                '09': {
                    type: 'folder',
                    items: {
                        '27': {
                            type: 'folder',
                            items: {
                                'Bonjour': { type: 'task', emoji: '☀️' },
                                'Bon après-midi': { type: 'task', emoji: '🌤️' },
                                'Bonsoir': { type: 'task', emoji: '🌙' }
                            }
                        },
                        '28': {
                            type: 'folder',
                            items: {
                                'Bonjour': { type: 'task', emoji: '☀️' },
                                'Bon après-midi': { type: 'task', emoji: '🌤️' },
                                'Bonsoir': { type: 'task', emoji: '🌙' }
                            }
                        },
                        '29': {
                            type: 'folder',
                            items: {
                                'Bonjour': { type: 'task', emoji: '☀️' },
                                'Bon après-midi': { type: 'task', emoji: '🌤️' },
                                'Bonsoir': { type: 'task', emoji: '🌙' }
                            }
                        },
                        '30': {
                            type: 'folder',
                            items: {
                                'Bonjour': { type: 'task', emoji: '☀️' },
                                'Bon après-midi': { type: 'task', emoji: '🌤️' },
                                'Bonsoir': { type: 'task', emoji: '🌙' }
                            }
                        }
                    }
                },
                '10': {
                    type: 'folder',
                    items: {
                        '01': {
                            type: 'folder',
                            items: {
                                'Bonjour': { type: 'task', emoji: '☀️' },
                                'Bon après-midi': { type: 'task', emoji: '🌤️' },
                                'Bonsoir': { type: 'task', emoji: '🌙' }
                            }
                        }
                    }
                }
            }
        },
        '2024': {
            type: 'folder',
            items: {
                '12': {
                    type: 'folder',
                    items: {
                        '31': {
                            type: 'folder',
                            items: {
                                'Bonjour': { type: 'task', emoji: '☀️' },
                                'Bon après-midi': { type: 'task', emoji: '🌤️' },
                                'Bonsoir': { type: 'task', emoji: '🌙' }
                            }
                        }
                    }
                }
            }
        }
    }
};

    
    // DOM Elements
    const mobileNavItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
    const mobileContentSections = document.querySelectorAll('.mobile-content');
    const overflowMenuBtn = document.querySelector('.overflow-menu-btn');
    const overflowDropdown = document.querySelector('.overflow-dropdown');
    const contextMenu = document.getElementById('context-menu');
    const selectionToolbar = document.querySelector('.selection-toolbar');
    const selectionCount = document.querySelector('.selection-count');
    
    // Modals
    const createModal = document.getElementById('create-modal');
    const renameModal = document.getElementById('rename-modal');
    const addLinkModal = document.getElementById('add-link-modal');
    const infoModal = document.getElementById('info-modal');
    const deleteConfirmModal = document.getElementById('delete-confirm-modal');
    
    // Mobile action buttons
    const mobileSelectBtn = document.getElementById('mobile-select-btn');
    const mobileCopyBtn = document.getElementById('mobile-copy-btn');
    const mobileMoveBtn = document.getElementById('mobile-move-btn');
    const mobileDeleteBtn = document.getElementById('mobile-delete-btn');
    const mobileInfoBtn = document.getElementById('mobile-info-btn');
    const mobileRenameBtn = document.getElementById('mobile-rename-btn');
    
    // Desktop action buttons
    const desktopCreateBtn = document.getElementById('desktop-create-btn');
    const desktopSelectBtn = document.getElementById('desktop-select-btn');
    const desktopCopyBtn = document.getElementById('desktop-copy-btn');
    const desktopMoveBtn = document.getElementById('desktop-move-btn');
    const desktopPasteBtn = document.getElementById('desktop-paste-btn');
    const desktopDeleteBtn = document.getElementById('desktop-delete-btn');
    const desktopRenameBtn = document.getElementById('desktop-rename-btn');
    const desktopInfoBtn = document.getElementById('desktop-info-btn');
    const desktopExportBtn = document.getElementById('desktop-export-btn');
    
    // Selection tools
    const mobileSelectAll = document.getElementById('mobile-select-all');
    const mobileSelectionCopy = document.getElementById('mobile-selection-copy');
    const mobileSelectionMove = document.getElementById('mobile-selection-move');
    const mobileSelectionDelete = document.getElementById('mobile-selection-delete');
    const mobileSelectionCancel = document.getElementById('mobile-selection-cancel');
    
    // Helper functions
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            
            // Focus the first input if exists
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        } else {
            console.warn(`Modal with ID ${modalId} not found`);
        }
    }
    
    function hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }
    
    function showToast(message, type = 'info') {
        // Créer un conteneur de toast s'il n'existe pas
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.position = 'fixed';
            container.style.bottom = '20px';
            container.style.right = '20px';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.backgroundColor = 'var(--card-dark)';
        toast.style.color = 'var(--text-light)';
        toast.style.padding = '12px 16px';
        toast.style.borderRadius = 'var(--border-radius)';
        toast.style.marginTop = '10px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.minWidth = '250px';
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.3s ease';
        
        let icon = 'info-circle';
        let iconColor = '#7289da';
        
        if (type === 'success') {
            icon = 'check-circle';
            iconColor = '#43b581';
        } else if (type === 'error') {
            icon = 'exclamation-circle';
            iconColor = '#f04747';
        }
        
        toast.innerHTML = `
            <div style="color: ${iconColor}; margin-right: 12px; font-size: 1.2rem;">
                <i class="fas fa-${icon}"></i>
            </div>
            <div>${message}</div>
        `;
        
        container.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Hide and remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    function toggleSelectionMode(enable) {
        appData.isSelectionMode = enable;
        
        const body = document.body;
        if (enable) {
            body.classList.add('selection-mode');
            if (selectionToolbar) {
                selectionToolbar.classList.add('visible');
            }
        } else {
            body.classList.remove('selection-mode');
            if (selectionToolbar) {
                selectionToolbar.classList.remove('visible');
            }
            appData.selectedItems = [];
            updateSelectionCount();
            
            // Uncheck all checkboxes
            document.querySelectorAll('.selection-checkbox').forEach(checkbox => {
                checkbox.classList.remove('selected');
            });
        }
    }
    
    function updateSelectionCount() {
        if (selectionCount) {
            const count = appData.selectedItems.length;
            selectionCount.textContent = `${count} item${count !== 1 ? 's' : ''} selected`;
        }
    }
    
// Mettre à jour les chemins de navigation
function updatePaths() {
    // Récupérer le chemin actuel
    const currentPath = appData.currentPath;
    
    // Mettre à jour le chemin mobile
    const mobilePath = document.querySelector('.mobile-path');
    if (mobilePath) {
        mobilePath.innerHTML = '';
        
        // Ajouter l'icône home
        const homeIcon = document.createElement('i');
        homeIcon.className = 'fas fa-home';
        homeIcon.addEventListener('click', () => navigateTo(['Home']));
        mobilePath.appendChild(homeIcon);
        
        // Ajouter les éléments du chemin (sauf Home qui est représenté par l'icône)
        currentPath.slice(1).forEach((folder, index) => {
            // Ajouter un séparateur avant chaque élément
            const separator = document.createElement('span');
            separator.className = 'separator';
            separator.textContent = '/';
            mobilePath.appendChild(separator);
            
            const pathItem = document.createElement('span');
            pathItem.className = 'path-item';
            pathItem.textContent = folder;
            pathItem.addEventListener('click', () => {
                navigateTo(currentPath.slice(0, index + 2)); // +2 pour compenser le slice(1) et l'indexation 0
            });
            mobilePath.appendChild(pathItem);
        });
    }
    
    // Mettre à jour le chemin desktop
    const desktopPath = document.querySelector('.nav-breadcrumb');
    if (desktopPath) {
        desktopPath.innerHTML = '';
        
        // Ajouter l'icône home
        const desktopHomeIcon = document.createElement('i');
        desktopHomeIcon.className = 'fas fa-home';
        desktopHomeIcon.addEventListener('click', () => navigateTo(['Home']));
        desktopPath.appendChild(desktopHomeIcon);
        
        // Ajouter les éléments du chemin (sauf Home qui est représenté par l'icône)
        currentPath.slice(1).forEach((folder, index) => {
            // Ajouter un séparateur avant chaque élément
            const separator = document.createElement('span');
            separator.className = 'separator';
            separator.textContent = '/';
            desktopPath.appendChild(separator);
            
            const pathItem = document.createElement('span');
            pathItem.className = 'path-item';
            pathItem.textContent = folder;
            pathItem.addEventListener('click', () => {
                navigateTo(currentPath.slice(0, index + 2)); // +2 pour compenser le slice(1) et l'indexation 0
            });
            desktopPath.appendChild(pathItem);
        });
    }
}

    
// Naviguer vers un dossier - version modifiée complète
async function navigateTo(path) {
    try {
        appData.currentPath = path;
        updatePaths();
        
        // Vérifier si le chemin existe
        let current = fileSystem;
        let valid = true;
        
        for (const folder of path) {
            if (current[folder]) {
                current = current[folder];
            } else if (current.items && current.items[folder]) {
                current = current.items[folder];
            } else {
                valid = false;
                break;
            }
        }
        
        // Si le chemin n'est pas valide, essayer de récupérer le dossier depuis Supabase
        if (!valid && supabaseAvailable && path.length > 1) {
            console.log('Chemin non valide, tentative de récupération depuis Supabase:', path);
            
            // Essayer de trouver le dossier par son ID s'il est dans notre cache local
            const lastSegment = path[path.length - 1];
            const parentPath = path.slice(0, -1);
            
            // Rechercher le dossier dans Supabase
            const { data: folderData, error } = await supabase
                .from('folders')
                .select('id, name, parent_path')
                .eq('name', lastSegment)
                .eq('parent_path', JSON.stringify(parentPath))
                .single();
                
            if (!error && folderData) {
                console.log('Dossier trouvé dans Supabase:', folderData);
                // Rafraîchir l'arborescence pour s'assurer qu'elle est à jour
                await refreshFolderTree();
                valid = true;
            } else {
                console.error('Dossier non trouvé dans Supabase:', error);
            }
        }
        
        // Si le chemin n'est toujours pas valide, revenir à Home
        if (!valid) {
            console.warn('Chemin non valide, retour à Home:', path);
            appData.currentPath = ['Home'];
            updatePaths();
        }
        
        // Ajouter ou supprimer la classe storage-view selon le chemin
        const mobileView = document.querySelector('.mobile-view');
        if (path.length > 1 && (path.includes('Storage') || path.includes('TasksStorage'))) {
            mobileView.classList.add('storage-view');
        } else {
            mobileView.classList.remove('storage-view');
        }
        
        // Activer l'onglet Home dans le header
        const headerNavItems = document.querySelectorAll('.header-nav-item');
        headerNavItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('data-content') === 'home') {
                navItem.classList.add('active');
            }
        });
        
        // Afficher le contenu Home
        const mobileContentSections = document.querySelectorAll('.mobile-content');
        mobileContentSections.forEach(section => {
            section.style.display = 'none';
        });
        
        const homeContent = document.getElementById('mobile-home-content');
        if (homeContent) {
            homeContent.style.display = 'block';
            appData.currentView = 'home';
        }
        
        updateContent();
    } catch (error) {
        console.error('Erreur lors de la navigation:', error);
        // En cas d'erreur, revenir à Home
        appData.currentPath = ['Home'];
        updatePaths();
        updateContent();
    }
}



    
    // Récupérer le dossier actuel
    function getCurrentFolder() {
        let current = fileSystem;
        for (const folder of appData.currentPath) {
            current = current[folder] ? current[folder] : current.items[folder];
        }
        return current;
    }
    
// Mettre à jour le contenu en fonction du dossier actuel
function updateContent() {
    const currentFolder = getCurrentFolder();
    
    // Mettre à jour le contenu mobile
    const mobileContent = document.getElementById('mobile-home-content');
    if (mobileContent) {
        mobileContent.innerHTML = '';
        
        // Si nous sommes à la page d'accueil (Home)
        if (appData.currentPath.length === 1 && appData.currentPath[0] === 'Home') {
            // Ajouter la section Storage comme accès au cloud storage
            const storageSection = document.createElement('div');
            storageSection.className = 'storage-section';
            storageSection.innerHTML = `
                <div class="storage-icon">
                    <i class="fas fa-server"></i>
                </div>
                <div class="storage-info">
                    <div class="storage-title">Cloud Storage</div>
                    <div class="storage-detail">
                        <span id="mobile-total-apps">24 apps</span> • 
                        <span id="mobile-top-folders">5 folders</span> • 
                        <span id="mobile-total-folders">8 folders</span>
                    </div>
                </div>
                <i class="fas fa-chevron-right"></i>
            `;
            storageSection.addEventListener('click', () => {
                navigateTo(['Home', 'Storage']);
            });
            mobileContent.appendChild(storageSection);
            
            // Ajouter la section TasksStorage comme deuxième storage
            const tasksStorageSection = document.createElement('div');
            tasksStorageSection.className = 'storage-section';
            tasksStorageSection.innerHTML = `
                <div class="storage-icon">
                    <i class="fas fa-tasks"></i>
                </div>
                <div class="storage-info">
                    <div class="storage-title">Tasks Storage</div>
                    <div class="storage-detail">
                        <span id="mobile-total-tasks">15 tâches</span> • 
                        <span id="mobile-years">2 années</span> • 
                        <span id="mobile-days">6 jours</span>
                    </div>
                </div>
                <i class="fas fa-chevron-right"></i>
            `;
            tasksStorageSection.addEventListener('click', () => {
                navigateTo(['Home', 'TasksStorage']);
            });
            mobileContent.appendChild(tasksStorageSection);
            
            // Ajouter la section d'accès rapide
            const quickAccessTitle = document.createElement('div');
            quickAccessTitle.className = 'section-title';
            quickAccessTitle.innerHTML = `
                <i class="fas fa-bolt"></i>
                Accès rapide
            `;
            mobileContent.appendChild(quickAccessTitle);
            
            // Créer le conteneur de la grille pour les dossiers rapides
            const foldersGridContainer = document.createElement('div');
            foldersGridContainer.className = 'grid-container';
            
            // Ajouter les dossiers importants
            const quickFolders = ['Desktop', 'Work', 'Entertainment'];
            
            quickFolders.forEach(folderName => {
                const storageFolder = fileSystem.Home.items.Storage.items[folderName];
                if (storageFolder) {
                    const folderItem = createQuickFolderItem(folderName, storageFolder);
                    foldersGridContainer.appendChild(folderItem);
                }
            });
            
            mobileContent.appendChild(foldersGridContainer);
            
            // Section des éléments récemment ajoutés
            const recentTitle = document.createElement('div');
            recentTitle.className = 'section-title';
            recentTitle.innerHTML = `
                <i class="fas fa-clock-rotate-left"></i>
                Recently Added
            `;
            mobileContent.appendChild(recentTitle);
            
            // Créer le conteneur de la grille pour les applications récentes
            const recentAppsGrid = document.createElement('div');
            recentAppsGrid.className = 'grid-container';
            
            // Ajouter quelques applications récentes
            const recentApps = [
                { name: 'GitHub', url: 'https://github.com', folder: 'Desktop' },
                { name: 'YouTube', url: 'https://youtube.com', folder: 'Desktop' },
                { name: 'Twitter', url: 'https://twitter.com', folder: 'Desktop' },
                { name: 'Netflix', url: 'https://netflix.com', folder: 'Entertainment' }
            ];
            
            recentApps.forEach(app => {
                const appItem = createHomeAppItem(app.name, app.url, app.folder);
                recentAppsGrid.appendChild(appItem);
            });
            
            mobileContent.appendChild(recentAppsGrid);
            
            // Section des dossiers récemment modifiés
            const recentFoldersTitle = document.createElement('div');
            recentFoldersTitle.className = 'section-title';
            recentFoldersTitle.innerHTML = `
                <i class="fas fa-folder-open"></i>
                Recently Modified Folders
            `;
            mobileContent.appendChild(recentFoldersTitle);
            
            // Créer le conteneur de la grille pour les dossiers récents
            const recentFoldersGrid = document.createElement('div');
            recentFoldersGrid.className = 'grid-container';
            
            // Ajouter quelques dossiers récents
            const recentFolders = ['Work', 'Entertainment'];
            
            recentFolders.forEach(folderName => {
                const storageFolder = fileSystem.Home.items.Storage.items[folderName];
                if (storageFolder) {
                    const folderItem = createQuickFolderItem(folderName, storageFolder);
                    recentFoldersGrid.appendChild(folderItem);
                }
            });
            
            mobileContent.appendChild(recentFoldersGrid);
        }
        // Si nous sommes dans un dossier normal
        else {
            // Ajouter le titre de la section
            const sectionTitle = document.createElement('div');
            sectionTitle.className = 'section-title';
            sectionTitle.innerHTML = `
                <i class="fas fa-folder"></i>
                ${appData.currentPath[appData.currentPath.length - 1]}
            `;
            mobileContent.appendChild(sectionTitle);
            
            // Créer le conteneur de la grille
            const gridContainer = document.createElement('div');
            gridContainer.className = 'grid-container';
            
            // Vérifier si le dossier a des éléments
            const items = currentFolder.items || {};
            const itemKeys = Object.keys(items);
            
            if (itemKeys.length === 0) {
                // Afficher un message si le dossier est vide
                const emptyFolder = document.createElement('div');
                emptyFolder.className = 'empty-folder';
                emptyFolder.innerHTML = `
                    <i class="fas fa-folder-open" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 10px;"></i>
                    <p style="color: var(--text-dim);">Aucun élément dans ce dossier</p>
                `;
                gridContainer.appendChild(emptyFolder);
            } else {
                // Afficher les dossiers d'abord
                itemKeys.forEach(itemName => {
                    const item = items[itemName];
                    
                    if (item.type === 'folder') {
                        const folderItem = createFolderItem(itemName);
                        gridContainer.appendChild(folderItem);
                    }
                });
                
                // Ensuite afficher les applications ou tâches
                itemKeys.forEach(itemName => {
                    const item = items[itemName];
                    
                    if (item.type === 'app') {
                        const appItem = createAppItem(itemName, item.url);
                        gridContainer.appendChild(appItem);
                    } else if (item.type === 'task') {
                        const taskItem = createTaskItem(itemName, item.emoji);
                        gridContainer.appendChild(taskItem);
                    }
                });
            }
            
            mobileContent.appendChild(gridContainer);
        }
    }
    
    // Mettre à jour le contenu desktop
    const desktopContent = document.querySelector('.desktop-content');
    if (desktopContent) {
        desktopContent.innerHTML = '';
        
        // Si nous sommes à la page d'accueil (Home)
        if (appData.currentPath.length === 1 && appData.currentPath[0] === 'Home') {
            // Créer la mise en page pour l'écran d'accueil du bureau
            const desktopHomeLayout = document.createElement('div');
            desktopHomeLayout.className = 'desktop-home-layout';
            
            // Section d'accès rapide
            const quickAccessSection = document.createElement('div');
            quickAccessSection.className = 'desktop-section';
            
            const quickAccessTitle = document.createElement('h2');
            quickAccessTitle.className = 'desktop-section-title';
            quickAccessTitle.innerHTML = `<i class="fas fa-bolt"></i> Accès rapide`;
            quickAccessSection.appendChild(quickAccessTitle);
            
            const quickAccessGrid = document.createElement('div');
            quickAccessGrid.className = 'grid-container desktop-grid';
            
            // Ajouter les dossiers importants
            const quickFolders = ['Desktop', 'Work', 'Entertainment'];
            
            quickFolders.forEach(folderName => {
                const storageFolder = fileSystem.Home.items.Storage.items[folderName];
                if (storageFolder) {
                    const folderItem = createQuickFolderItem(folderName, storageFolder);
                    quickAccessGrid.appendChild(folderItem);
                }
            });
            
            quickAccessSection.appendChild(quickAccessGrid);
            desktopHomeLayout.appendChild(quickAccessSection);
            
            // Section des éléments récemment ajoutés
            const recentSection = document.createElement('div');
            recentSection.className = 'desktop-section';
            
            const recentTitle = document.createElement('h2');
            recentTitle.className = 'desktop-section-title';
            recentTitle.innerHTML = `<i class="fas fa-clock-rotate-left"></i> Recently Added`;
            recentSection.appendChild(recentTitle);
            
            const recentGrid = document.createElement('div');
            recentGrid.className = 'grid-container desktop-grid';
            
            // Ajouter quelques applications récentes
            const recentApps = [
                { name: 'GitHub', url: 'https://github.com', folder: 'Desktop' },
                { name: 'YouTube', url: 'https://youtube.com', folder: 'Desktop' },
                { name: 'Twitter', url: 'https://twitter.com', folder: 'Desktop' },
                { name: 'Netflix', url: 'https://netflix.com', folder: 'Entertainment' },
                { name: 'Spotify', url: 'https://spotify.com', folder: 'Entertainment' },
                { name: 'Gmail', url: 'https://gmail.com', folder: 'Work' }
            ];
            
            recentApps.forEach(app => {
                const appItem = createHomeAppItem(app.name, app.url, app.folder);
                recentGrid.appendChild(appItem);
            });
            
            recentSection.appendChild(recentGrid);
            desktopHomeLayout.appendChild(recentSection);
            
            // Section des dossiers récemment modifiés
            const recentFoldersSection = document.createElement('div');
            recentFoldersSection.className = 'desktop-section';
            
            const recentFoldersTitle = document.createElement('h2');
            recentFoldersTitle.className = 'desktop-section-title';
            recentFoldersTitle.innerHTML = `<i class="fas fa-folder-open"></i> Recently Modified Folders`;
            recentFoldersSection.appendChild(recentFoldersTitle);
            
            const recentFoldersGrid = document.createElement('div');
            recentFoldersGrid.className = 'grid-container desktop-grid';
            
            // Ajouter quelques dossiers récents
            const recentFolders = ['Work', 'Entertainment'];
            
            recentFolders.forEach(folderName => {
                const storageFolder = fileSystem.Home.items.Storage.items[folderName];
                if (storageFolder) {
                    const folderItem = createQuickFolderItem(folderName, storageFolder);
                    recentFoldersGrid.appendChild(folderItem);
                }
            });
            
            recentFoldersSection.appendChild(recentFoldersGrid);
            desktopHomeLayout.appendChild(recentFoldersSection);
            
            desktopContent.appendChild(desktopHomeLayout);
            
            // Mettre à jour le compteur d'éléments dans la barre de statut
            const statusBar = document.querySelector('.status-bar');
            if (statusBar) {
                statusBar.innerHTML = `<span>Home</span>`;
            }
        } 
        // Si nous sommes dans un dossier normal
        else {
            // Créer le conteneur de la grille desktop
            const desktopGridContainer = document.createElement('div');
            desktopGridContainer.className = 'grid-container desktop-grid';
            
            // Vérifier si le dossier a des éléments
            const items = currentFolder.items || {};
            const itemKeys = Object.keys(items);
            
            if (itemKeys.length === 0) {
                // Afficher un message si le dossier est vide
                const emptyFolder = document.createElement('div');
                emptyFolder.className = 'empty-folder';
                emptyFolder.innerHTML = `
                    <i class="fas fa-folder-open" style="font-size: 5rem; color: var(--text-dim); margin-bottom: 20px;"></i>
                    <p style="color: var(--text-dim); font-size: 1.2rem;">Ce dossier est vide</p>
                `;
                desktopGridContainer.appendChild(emptyFolder);
            } else {
                // Afficher les dossiers d'abord
                itemKeys.forEach(itemName => {
                    const item = items[itemName];
                    
                    if (item.type === 'folder') {
                        const folderItem = createFolderItem(itemName);
                        desktopGridContainer.appendChild(folderItem);
                    }
                });
                
                // Ensuite afficher les applications ou tâches
                itemKeys.forEach(itemName => {
                    const item = items[itemName];
                    
                    if (item.type === 'app') {
                        const appItem = createAppItem(itemName, item.url);
                        desktopGridContainer.appendChild(appItem);
                    } else if (item.type === 'task') {
                        const taskItem = createTaskItem(itemName, item.emoji);
                        desktopGridContainer.appendChild(taskItem);
                    }
                });
            }
            
            desktopContent.appendChild(desktopGridContainer);
            
            // Mettre à jour le compteur d'éléments dans la barre de statut
            const statusBar = document.querySelector('.status-bar');
            if (statusBar) {
                statusBar.innerHTML = `<span>${itemKeys.length} items</span>`;
            }
        }
    }
    
    // NOUVELLE PARTIE: Mise à jour dynamique du sidebar
    updateSidebar();

    refreshDataFromSupabase();
}


// Mettre à jour dynamiquement le sidebar
function updateSidebar() {
    // 1. Mettre à jour la partie Home du sidebar
    const sidebarHome = document.querySelector('.sidebar');
    if (sidebarHome) {
        // Recréer les sections principales du sidebar
        sidebarHome.innerHTML = '';
        
        // Création de la section Home
        const homeSection = document.createElement('div');
        homeSection.className = 'sidebar-section';
        
        // Titre Home
        const homeTitle = document.createElement('div');
        homeTitle.className = 'sidebar-title';
        homeTitle.innerHTML = '<i class="fas fa-home"></i> Home';
        homeTitle.addEventListener('click', () => {
            navigateTo(['Home']);
        });
        homeSection.appendChild(homeTitle);
        
        // Items du Home
        const storageItem = document.createElement('div');
        storageItem.className = 'sidebar-item';
        if (appData.currentPath.length > 1 && appData.currentPath[1] === 'Storage') {
            storageItem.classList.add('active');
        }
        storageItem.innerHTML = '<i class="fas fa-server"></i><span>Storage</span>';
        storageItem.addEventListener('click', () => {
            navigateTo(['Home', 'Storage']);
        });
        homeSection.appendChild(storageItem);
        
        // Ajouter l'élément TasksStorage
        const tasksStorageItem = document.createElement('div');
        tasksStorageItem.className = 'sidebar-item';
        if (appData.currentPath.length > 1 && appData.currentPath[1] === 'TasksStorage') {
            tasksStorageItem.classList.add('active');
        }
        tasksStorageItem.innerHTML = '<i class="fas fa-tasks"></i><span>Tasks Storage</span>';
        tasksStorageItem.addEventListener('click', () => {
            navigateTo(['Home', 'TasksStorage']);
        });
        homeSection.appendChild(tasksStorageItem);
        
        const recentItem = document.createElement('div');
        recentItem.className = 'sidebar-item';
        recentItem.innerHTML = '<i class="fas fa-clock-rotate-left"></i><span>Recent</span>';
        recentItem.addEventListener('click', () => {
            showToast('Recent view not implemented', 'info');
        });
        homeSection.appendChild(recentItem);
        
        const favoritesItem = document.createElement('div');
        favoritesItem.className = 'sidebar-item';
        favoritesItem.innerHTML = '<i class="far fa-star"></i><span>Favorites</span>';
        favoritesItem.addEventListener('click', () => {
            showToast('Favorites view not implemented', 'info');
        });
        homeSection.appendChild(favoritesItem);
        
        // Sous-section avec accès rapide
        const sidebarSubsection = document.createElement('div');
        sidebarSubsection.className = 'sidebar-subsection';
        
        // Accès rapide
        const quickAccessTitle = document.createElement('div');
        quickAccessTitle.className = 'sidebar-subtitle';
        quickAccessTitle.innerHTML = '<i class="fas fa-folder"></i> Accès rapide';
        sidebarSubsection.appendChild(quickAccessTitle);
        
        // Dossiers d'accès rapide
        const quickFoldersContainer = document.createElement('div');
        quickFoldersContainer.className = 'sidebar-quick-folders';
        
        // Créer les dossiers d'accès rapide
        const quickFolders = ['Desktop', 'Work', 'Entertainment'];
        quickFolders.forEach(folderName => {
            const storageFolder = fileSystem.Home.items.Storage.items[folderName];
            if (storageFolder) {
                const folderPreview = createSidebarFolderItem(folderName, storageFolder);
                quickFoldersContainer.appendChild(folderPreview);
            }
        });
        
        sidebarSubsection.appendChild(quickFoldersContainer);
        
        // Recently Added section
        const recentlyAddedTitle = document.createElement('div');
        recentlyAddedTitle.className = 'sidebar-subtitle';
        recentlyAddedTitle.innerHTML = '<i class="fas fa-clock-rotate-left"></i> Recently Added';
        sidebarSubsection.appendChild(recentlyAddedTitle);
        
        // Apps récentes
        const quickAppsContainer = document.createElement('div');
        quickAppsContainer.className = 'sidebar-quick-apps';
        
        // Créer les apps récentes
        const recentApps = [
            { name: 'GitHub', url: 'https://github.com' },
            { name: 'YouTube', url: 'https://youtube.com' },
            { name: 'Twitter', url: 'https://twitter.com' },
            { name: 'Netflix', url: 'https://netflix.com' }
        ];
        
        recentApps.forEach(app => {
            const appItem = createSidebarAppItem(app.name, app.url);
            quickAppsContainer.appendChild(appItem);
        });
        
        sidebarSubsection.appendChild(quickAppsContainer);
        
        // Recently Modified Folders section
        const recentlyModifiedTitle = document.createElement('div');
        recentlyModifiedTitle.className = 'sidebar-subtitle';
        recentlyModifiedTitle.innerHTML = '<i class="fas fa-folder-open"></i> Recently Modified Folders';
        sidebarSubsection.appendChild(recentlyModifiedTitle);
        
        // Dossiers récemment modifiés
        const recentFoldersContainer = document.createElement('div');
        recentFoldersContainer.className = 'sidebar-quick-folders';
        
        // Créer les dossiers récemment modifiés
        const recentFolders = ['Work', 'Entertainment'];
        
        recentFolders.forEach(folderName => {
            const storageFolder = fileSystem.Home.items.Storage.items[folderName];
            if (storageFolder) {
                const folderPreview = createSidebarFolderItem(folderName, storageFolder);
                recentFoldersContainer.appendChild(folderPreview);
            }
        });
        
        sidebarSubsection.appendChild(recentFoldersContainer);
        
        // Ajouter la sous-section à la section Home
        homeSection.appendChild(sidebarSubsection);
        
        // Ajouter la section Home au sidebar
        sidebarHome.appendChild(homeSection);
        
        // 2. Créer la section Folders
        const foldersSection = document.createElement('div');
        foldersSection.className = 'sidebar-section';
        
        const foldersTitle = document.createElement('div');
        foldersTitle.className = 'sidebar-title';
        foldersTitle.innerHTML = '<i class="fas fa-folder"></i> Folders';
        foldersSection.appendChild(foldersTitle);
        
        // This PC item
        const thisPcItem = document.createElement('div');
        thisPcItem.className = 'sidebar-item';
        thisPcItem.innerHTML = `
            <div class="modern-pc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.89543 4 2 4.89543 2 6V15C2 16.1046 2.89543 17 4 17H20C21.1046 17 22 16.1046 22 15V6C22 4.89543 21.1046 4 20 4Z" fill="url(#pc-gradient-1)"/>
                    <path d="M8 20H16M12 17V20" stroke="#5865f2" stroke-width="2" stroke-linecap="round"/>
                    <rect x="4" y="6" width="16" height="9" rx="1" fill="url(#pc-gradient-2)"/>
                    <defs>
                        <linearGradient id="pc-gradient-1" x1="2" y1="4" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#5865f2"/>
                            <stop offset="1" stop-color="#7289da"/>
                        </linearGradient>
                        <linearGradient id="pc-gradient-2" x1="4" y1="6" x2="20" y2="15" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#1e1e2e"/>
                            <stop offset="1" stop-color="#2a2a3a"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <span>This PC</span>
        `;
        thisPcItem.addEventListener('click', () => {
            showToast('This PC view not implemented', 'info');
        });
        foldersSection.appendChild(thisPcItem);
        
        // Folder tree
        const folderTree = document.createElement('div');
        folderTree.className = 'folder-tree';
        
        // Work folder
        const workItem = document.createElement('div');
        workItem.className = 'tree-item';
        workItem.innerHTML = `
            <div class="tree-toggle">
                <i class="fas fa-chevron-right"></i>
            </div>
            <i class="fas fa-folder"></i>
            <span>Work</span>
        `;
        workItem.addEventListener('click', (e) => {
            if (!e.target.closest('.tree-toggle')) {
                navigateTo(['Home', 'Storage', 'Work']);
            }
        });
        
        // Ajouter l'événement de clic au toggle du dossier Work
        const workToggle = workItem.querySelector('.tree-toggle');
        if (workToggle) {
            workToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = workToggle.querySelector('i');
                if (icon.classList.contains('fa-chevron-down')) {
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
                    // Hide children
                    const nextSibling = workItem.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                        nextSibling.style.display = 'none';
                    }
                } else {
                    icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
                    // Show children
                    const nextSibling = workItem.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                        nextSibling.style.display = 'block';
                    }
                }
            });
        }
        
        folderTree.appendChild(workItem);
        
        // Storage folder
        const storageTreeItem = document.createElement('div');
        storageTreeItem.className = 'tree-item';
        storageTreeItem.innerHTML = `
            <div class="tree-toggle">
                <i class="fas fa-chevron-down"></i>
            </div>
            <i class="fas fa-folder-open"></i>
            <span>Storage</span>
        `;
        storageTreeItem.addEventListener('click', (e) => {
            if (!e.target.closest('.tree-toggle')) {
                navigateTo(['Home', 'Storage']);
            }
        });
        
        // Ajouter l'événement de clic au toggle du dossier Storage
        const storageToggle = storageTreeItem.querySelector('.tree-toggle');
        if (storageToggle) {
            storageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = storageToggle.querySelector('i');
                if (icon.classList.contains('fa-chevron-down')) {
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
                    // Hide children
                    const nextSibling = storageTreeItem.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                        nextSibling.style.display = 'none';
                    }
                } else {
                    icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
                    // Show children
                    const nextSibling = storageTreeItem.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                        nextSibling.style.display = 'block';
                    }
                }
            });
        }
        
        folderTree.appendChild(storageTreeItem);
        
        // Storage subfolders
        const storageSubfolders = document.createElement('div');
        storageSubfolders.className = 'folder-tree';
        storageSubfolders.style.marginLeft = '15px';
        
        // Récupérer tous les dossiers dans Storage
        const storageItems = fileSystem.Home.items.Storage.items;
        Object.keys(storageItems).forEach(itemName => {
            const item = storageItems[itemName];
            if (item.type === 'folder') {
                const subfolderItem = document.createElement('div');
                subfolderItem.className = 'tree-item';
                
                // Vérifier si ce dossier a des sous-dossiers
                const hasSubfolders = Object.values(item.items).some(subItem => subItem.type === 'folder');
                
                // Créer une preview des apps pour ce dossier
                const previewIcons = getPreviewIcons(item.items);
                
                subfolderItem.innerHTML = `
                    <div class="tree-toggle" ${!hasSubfolders ? 'style="visibility: hidden;"' : ''}>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    <div class="sidebar-folder-icon">
                        <i class="fas fa-folder"></i>
                        <div class="folder-mini-preview">
                            ${previewIcons}
                        </div>
                    </div>
                    <div class="sidebar-folder-name">${itemName}</div>
                `;
                
                subfolderItem.addEventListener('click', (e) => {
                    if (!e.target.closest('.tree-toggle')) {
                        navigateTo(['Home', 'Storage', itemName]);
                    }
                });
                
                // Ajouter l'événement de clic au toggle du sous-dossier
                const subfoldToggle = subfolderItem.querySelector('.tree-toggle');
                if (subfoldToggle && hasSubfolders) {
                    subfoldToggle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const icon = subfoldToggle.querySelector('i');
                        if (icon.classList.contains('fa-chevron-down')) {
                            icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
                            // Hide children
                            const nextSibling = subfolderItem.nextElementSibling;
                            if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                                nextSibling.style.display = 'none';
                            }
                        } else {
                            icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
                            // Show children
                            const nextSibling = subfolderItem.nextElementSibling;
                            if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                                nextSibling.style.display = 'block';
                            } else {
                                // Créer un conteneur pour les sous-dossiers s'il n'existe pas encore
                                const subSubfolders = document.createElement('div');
                                subSubfolders.className = 'folder-tree';
                                subSubfolders.style.marginLeft = '15px';
                                
                                // Ajouter les sous-dossiers
                                Object.keys(item.items).forEach(subItemName => {
                                    const subItem = item.items[subItemName];
                                    if (subItem.type === 'folder') {
                                        const subSubfolderItem = document.createElement('div');
                                        subSubfolderItem.className = 'tree-item';
                                        subSubfolderItem.innerHTML = `
                                            <div class="tree-toggle" style="visibility: hidden;">
                                                <i class="fas fa-chevron-right"></i>
                                            </div>
                                            <i class="fas fa-folder"></i>
                                            <span>${subItemName}</span>
                                        `;
                                        subSubfolderItem.addEventListener('click', () => {
                                            navigateTo(['Home', 'Storage', itemName, subItemName]);
                                        });
                                        subSubfolders.appendChild(subSubfolderItem);
                                    }
                                });
                                
                                // Insérer après le sous-dossier actuel
                                subfolderItem.parentNode.insertBefore(subSubfolders, subfolderItem.nextSibling);
                            }
                        }
                    });
                }
                
                storageSubfolders.appendChild(subfolderItem);
            }
        });
        
        folderTree.appendChild(storageSubfolders);
        
        // Ajouter l'élément TasksStorage au folder tree
        const tasksStorageTreeItem = document.createElement('div');
        tasksStorageTreeItem.className = 'tree-item';
        tasksStorageTreeItem.innerHTML = `
            <div class="tree-toggle">
                <i class="fas fa-chevron-right"></i>
            </div>
            <i class="fas fa-tasks"></i>
            <span>Tasks Storage</span>
        `;
        tasksStorageTreeItem.addEventListener('click', (e) => {
            if (!e.target.closest('.tree-toggle')) {
                navigateTo(['Home', 'TasksStorage']);
            }
        });
        
        // Ajouter l'événement de clic au toggle du dossier TasksStorage
        const tasksStorageToggle = tasksStorageTreeItem.querySelector('.tree-toggle');
        if (tasksStorageToggle) {
            tasksStorageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = tasksStorageToggle.querySelector('i');
                if (icon.classList.contains('fa-chevron-down')) {
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
                    // Hide children
                    const nextSibling = tasksStorageTreeItem.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                        nextSibling.style.display = 'none';
                    }
                } else {
                    icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
                    // Show children
                    const nextSibling = tasksStorageTreeItem.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                        nextSibling.style.display = 'block';
                    } else {
                        // Créer un conteneur pour les années
                        const yearsFolder = document.createElement('div');
                        yearsFolder.className = 'folder-tree';
                        yearsFolder.style.marginLeft = '15px';
                        
                        // Ajouter les dossiers d'années
                        const tasksStorageItems = fileSystem.Home.items.TasksStorage.items;
                        Object.keys(tasksStorageItems).forEach(yearName => {
                            const yearItem = document.createElement('div');
                            yearItem.className = 'tree-item';
                            yearItem.innerHTML = `
                                <div class="tree-toggle">
                                    <i class="fas fa-chevron-right"></i>
                                </div>
                                <i class="fas fa-calendar-year"></i>
                                <span>${yearName}</span>
                            `;
                            yearItem.addEventListener('click', (e) => {
                                if (!e.target.closest('.tree-toggle')) {
                                    navigateTo(['Home', 'TasksStorage', yearName]);
                                }
                            });
                            
                            // Ajouter l'événement de clic au toggle de l'année
                            const yearToggle = yearItem.querySelector('.tree-toggle');
                            if (yearToggle) {
                                yearToggle.addEventListener('click', (e) => {
                                    e.stopPropagation();
                                    const yearIcon = yearToggle.querySelector('i');
                                    if (yearIcon.classList.contains('fa-chevron-down')) {
                                        yearIcon.classList.replace('fa-chevron-down', 'fa-chevron-right');
                                        // Hide children
                                        const nextSibling = yearItem.nextElementSibling;
                                        if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                                            nextSibling.style.display = 'none';
                                        }
                                    } else {
                                        yearIcon.classList.replace('fa-chevron-right', 'fa-chevron-down');
                                        // Show children - mais ne pas les créer ici pour éviter la complexité
                                        showToast(`Cliquez sur ${yearName} pour voir ses mois`, 'info');
                                    }
                                });
                            }
                            
                            yearsFolder.appendChild(yearItem);
                        });
                        
                        // Insérer après le TasksStorage
                        tasksStorageTreeItem.parentNode.insertBefore(yearsFolder, tasksStorageTreeItem.nextSibling);
                    }
                }
            });
        }
        
        folderTree.appendChild(tasksStorageTreeItem);
        foldersSection.appendChild(folderTree);
        
        // Ajouter la section Folders au sidebar
        sidebarHome.appendChild(foldersSection);
        
        // 3. Ajouter la section Jean-Louis Likula
        const jeanLouisSection = document.createElement('div');
        jeanLouisSection.className = 'user-section spider-theme';
        jeanLouisSection.id = 'jean-louis-likula-section';
        jeanLouisSection.innerHTML = `
            <div class="user-avatar spider-avatar">JL</div>
            <div class="user-info">
                <div class="user-name">Jean-Louis Likula</div>
                <div class="user-status"><span class="spider-web-icon">🕸️</span> Spider Fan</div>
            </div>
            <i class="fas fa-spider"></i>
        `;
        jeanLouisSection.addEventListener('click', () => {
            loadJeanLouisContent();
        });
        sidebarHome.appendChild(jeanLouisSection);
    }
}


// Charger le contenu de Jean-Louis Likula
function loadJeanLouisContent() {
    // Mettre à jour le chemin pour Jean-Louis
    appData.currentPath = ['Home', 'Jean-Louis Likula'];
    updatePaths();
    
    // Créer le contenu pour Jean-Louis
    const desktopContent = document.querySelector('.desktop-content');
    if (desktopContent) {
        desktopContent.innerHTML = '';
        
        // Créer le conteneur principal
        const jlContainer = document.createElement('div');
        jlContainer.className = 'jean-louis-content';
        
        // Section des appareils
        const devicesHeader = document.createElement('div');
        devicesHeader.className = 'section-header';
        devicesHeader.innerHTML = `
            <i class="fas fa-shield-alt section-icon" style="color: #4cd137;"></i>
            <div class="section-title">Surveillance des Appareils</div>
        `;
        jlContainer.appendChild(devicesHeader);
        
        // Premier appareil
        const device1 = document.createElement('div');
        device1.className = 'device-card';
        device1.innerHTML = `
            <div class="device-header">
                <div class="device-icon-container">
                    <i class="fas fa-desktop device-icon" style="color: #42a5f5;"></i>
                    <div class="device-info">
                        <div class="device-name">HP Spectre x360</div>
                        <div class="device-type">Appareil principal</div>
                    </div>
                </div>
                <div class="device-status status-active">
                    Actif
                </div>
            </div>
            
            <div class="device-detail">
                <i class="fab fa-windows detail-icon" style="color: #42a5f5;"></i>
                <div class="detail-name">Windows 11 Pro</div>
                <div class="detail-value">v21H2</div>
            </div>
            
            <div class="device-detail">
                <i class="fab fa-chrome detail-icon" style="color: #f39c12;"></i>
                <div class="detail-name">Chrome</div>
                <div class="detail-value">v109.0.5414.120</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-map-marker-alt detail-icon" style="color: #e74c3c;"></i>
                <div class="detail-name">Paris, France</div>
                <div class="detail-value">48.8566° N, 2.3522° E</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-network-wired detail-icon" style="color: #3498db;"></i>
                <div class="detail-name">192.168.1.105</div>
                <div class="detail-value">IPv4</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-shield-alt detail-icon" style="color: #4cd137;"></i>
                <div class="detail-name">Sans VPN</div>
                <div class="detail-value">Réseau local</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-clock detail-icon" style="color: #9b59b6;"></i>
                <div class="detail-name">Dernière connexion</div>
                <div class="detail-value">À l'instant</div>
            </div>
        `;
        jlContainer.appendChild(device1);
        
        // Deuxième appareil
        const device2 = document.createElement('div');
        device2.className = 'device-card';
        device2.innerHTML = `
            <div class="device-header">
                <div class="device-icon-container">
                    <i class="fas fa-mobile-alt device-icon" style="color: #ff6b81;"></i>
                    <div class="device-info">
                        <div class="device-name">Itel S23</div>
                        <div class="device-type">Smartphone</div>
                    </div>
                </div>
                <div class="device-status status-inactive">
                    <i class="fas fa-circle" style="font-size: 0.6rem; margin-right: 5px;"></i> Inactif
                </div>
            </div>
            
            <div class="device-detail">
                <i class="fab fa-android detail-icon" style="color: #a4c639;"></i>
                <div class="detail-name">Android 12</div>
                <div class="detail-value">API 31</div>
            </div>
            
            <div class="device-detail">
                <i class="fab fa-firefox detail-icon" style="color: #ff9500;"></i>
                <div class="detail-name">Firefox</div>
                <div class="detail-value">v103.0.5</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-map-marker-alt detail-icon" style="color: #e74c3c;"></i>
                <div class="detail-name">Lyon, France</div>
                <div class="detail-value">45.7640° N, 4.8357° E</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-wifi detail-icon" style="color: #3498db;"></i>
                <div class="detail-name">78.45.123.45</div>
                <div class="detail-value">WiFi</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-user-secret detail-icon" style="color: #f1c40f;"></i>
                <div class="detail-name">VPN Actif</div>
                <div class="detail-value">NordVPN</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-clock detail-icon" style="color: #9b59b6;"></i>
                <div class="detail-name">Dernière connexion</div>
                <div class="detail-value">Hier, 21:45</div>
            </div>
        `;
        jlContainer.appendChild(device2);
        
        // Troisième appareil
        const device3 = document.createElement('div');
        device3.className = 'device-card';
        device3.innerHTML = `
            <div class="device-header">
                <div class="device-icon-container">
                    <i class="fas fa-tablet-alt device-icon" style="color: #5352ed;"></i>
                    <div class="device-info">
                        <div class="device-name">iPad Pro 12.9"</div>
                        <div class="device-type">Tablette</div>
                    </div>
                </div>
                <div class="device-status status-inactive">
                    <i class="fas fa-circle" style="font-size: 0.6rem; margin-right: 5px;"></i> Inactif
                </div>
            </div>
            
            <div class="device-detail">
                <i class="fab fa-apple detail-icon" style="color: #a4a4a4;"></i>
                <div class="detail-name">iPadOS 16.2</div>
                <div class="detail-value">16C67</div>
            </div>
            
            <div class="device-detail">
                <i class="fab fa-safari detail-icon" style="color: #2980b9;"></i>
                <div class="detail-name">Safari</div>
                <div class="detail-value">v16.2</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-map-marker-alt detail-icon" style="color: #e74c3c;"></i>
                <div class="detail-name">Bordeaux, France</div>
                <div class="detail-value">44.8378° N, 0.5792° W</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-wifi detail-icon" style="color: #3498db;"></i>
                <div class="detail-name">89.154.67.89</div>
                <div class="detail-value">WiFi</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-shield-alt detail-icon" style="color: #4cd137;"></i>
                <div class="detail-name">Sans VPN</div>
                <div class="detail-value">Réseau public</div>
            </div>
            
            <div class="device-detail">
                <i class="fas fa-clock detail-icon" style="color: #9b59b6;"></i>
                <div class="detail-name">Dernière connexion</div>
                <div class="detail-value">07/09/2025, 14:22</div>
            </div>
        `;
        jlContainer.appendChild(device3);
        
        // Section d'activité récente
        const activityHeader = document.createElement('div');
        activityHeader.className = 'section-header';
        activityHeader.innerHTML = `
            <i class="fas fa-chart-line section-icon" style="color: #5352ed;"></i>
            <div class="section-title">Activité Récente</div>
        `;
        jlContainer.appendChild(activityHeader);
        
        // Carte d'activité
        const activityCard = document.createElement('div');
        activityCard.className = 'device-card';
        activityCard.innerHTML = `
            <div class="activity-item">
                <div class="activity-icon" style="background-color: rgba(76, 209, 55, 0.1);">
                    <i class="fas fa-sign-in-alt" style="color: #4cd137;"></i>
                </div>
                <div class="activity-info">
                    <div class="activity-title">Connexion réussie</div>
                    <div class="activity-details">
                        <span>HP Spectre x360 · Paris, France</span>
                        <span>Il y a 2 minutes</span>
                    </div>
                </div>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon" style="background-color: rgba(241, 196, 15, 0.1);">
                    <i class="fas fa-user-secret" style="color: #f1c40f;"></i>
                </div>
                <div class="activity-info">
                    <div class="activity-title">VPN activé</div>
                    <div class="activity-details">
                        <span>Itel S23 · Lyon, France</span>
                        <span>Hier, 21:42</span>
                    </div>
                </div>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon" style="background-color: rgba(231, 76, 60, 0.1);">
                    <i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i>
                </div>
                <div class="activity-info">
                    <div class="activity-title">Tentative de connexion échouée</div>
                    <div class="activity-details">
                        <span>Adresse IP inconnue · Londres, UK</span>
                        <span>07/09/2025, 08:14</span>
                    </div>
                </div>
            </div>
        `;
        jlContainer.appendChild(activityCard);
        
        // Section sécurité
        const securityHeader = document.createElement('div');
        securityHeader.className = 'section-header';
        securityHeader.innerHTML = `
            <i class="fas fa-fingerprint section-icon" style="color: #ff6b81;"></i>
            <div class="section-title">Sécurité</div>
        `;
        jlContainer.appendChild(securityHeader);
        
        // Carte de sécurité
        const securityCard = document.createElement('div');
        securityCard.className = 'device-card';
        securityCard.innerHTML = `
            <div class="security-item security-border-success">
                <i class="fas fa-check-circle security-icon" style="color: #4cd137;"></i>
                <div class="security-info" style="flex: 1;">
                    <div>Authentification à 2 facteurs</div>
                    <div style="font-size: 0.8rem; color: var(--text-dim);">Activée via Google Authenticator</div>
                </div>
                <i class="fas fa-chevron-right" style="color: var(--text-dim);"></i>
            </div>
            
            <div class="security-item security-border-warning">
                <i class="fas fa-exclamation-circle security-icon" style="color: #f1c40f;"></i>
                <div class="security-info" style="flex: 1;">
                    <div>Notifications de connexion</div>
                    <div style="font-size: 0.8rem; color: var(--text-dim);">Actives uniquement pour les nouveaux appareils</div>
                </div>
                <i class="fas fa-chevron-right" style="color: var(--text-dim);"></i>
            </div>
            
            <div class="security-item security-border-danger">
                <i class="fas fa-times-circle security-icon" style="color: #e74c3c;"></i>
                <div class="security-info" style="flex: 1;">
                    <div>Vérification des appareils</div>
                    <div style="font-size: 0.8rem; color: var(--text-dim);">Non configurée</div>
                </div>
                <i class="fas fa-chevron-right" style="color: var(--text-dim);"></i>
            </div>
        `;
        jlContainer.appendChild(securityCard);
        
        // Bouton de déconnexion
        const disconnectButton = document.createElement('button');
        disconnectButton.className = 'disconnect-button';
        disconnectButton.innerHTML = `
            <i class="fas fa-power-off disconnect-icon"></i>
            Déconnecter tous les appareils
        `;
        disconnectButton.addEventListener('click', () => {
            showToast('Déconnexion de tous les appareils...', 'info');
        });
        jlContainer.appendChild(disconnectButton);
        
        // Ajouter le conteneur au contenu desktop
        desktopContent.appendChild(jlContainer);
        
        // Mettre à jour la barre de statut
        const statusBar = document.querySelector('.status-bar');
        if (statusBar) {
            statusBar.innerHTML = `<span>Jean-Louis Likula</span>`;
        }
    }
}



// Créer un élément dossier pour le sidebar
function createSidebarFolderItem(name, folder) {
    const folderItem = document.createElement('div');
    folderItem.className = 'sidebar-folder-item';
    folderItem.setAttribute('data-name', name);
    
    // Récupérer les aperçus des applications dans le dossier
    const previewIcons = getPreviewIcons(folder.items);
    
    folderItem.innerHTML = `
        <div class="sidebar-folder-icon">
            <i class="fas fa-folder"></i>
            <div class="folder-mini-preview">
                ${previewIcons}
            </div>
        </div>
        <div class="sidebar-folder-name">${name}</div>
    `;
    
    // Ajouter l'événement de clic
    folderItem.addEventListener('click', function() {
        navigateTo(['Home', 'Storage', name]);
    });
    
    return folderItem;
}

// Créer un élément application pour le sidebar
function createSidebarAppItem(name, url) {
    const appItem = document.createElement('div');
    appItem.className = 'sidebar-app-item';
    appItem.setAttribute('data-name', name);
    
    const domain = url.replace('https://', '').split('/')[0];
    
    appItem.innerHTML = `
        <img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" class="sidebar-app-icon">
        <div class="sidebar-app-name">${name}</div>
    `;
    
    // Ajouter l'événement de clic
    appItem.addEventListener('click', function() {
        showToast(`Opening ${name}`, 'info');
    });
    
    return appItem;
}

// Obtenir les icônes de preview pour un dossier
function getPreviewIcons(items) {
    let previewIcons = '';
    const appKeys = Object.keys(items).filter(key => items[key].type === 'app').slice(0, 3);
    
    if (appKeys.length === 0) {
        return '';
    }
    
    appKeys.forEach(appName => {
        const domain = items[appName].url.replace('https://', '').split('/')[0];
        previewIcons += `<img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" class="mini-icon">`;
    });
    
    return previewIcons;
}

// Obtenir les icônes de preview pour un dossier de tâches
function getTaskPreviewIcons(items) {
    let previewIcons = '';
    const taskKeys = Object.keys(items).filter(key => items[key].type === 'task').slice(0, 3);
    
    if (taskKeys.length === 0) {
        return '';
    }
    
    taskKeys.forEach(taskName => {
        previewIcons += `<div class="mini-emoji">${items[taskName].emoji}</div>`;
    });
    
    return previewIcons;
}

    
// Créer un élément dossier
function createFolderItem(name) {
    const folderItem = document.createElement('div');
    folderItem.className = 'folder-item';
    if (name.startsWith('#') || (getCurrentFolder().items[name] && getCurrentFolder().items[name].masked)) {
        folderItem.classList.add('masked-item');
    }
    folderItem.setAttribute('data-name', name);
    
    // Récupérer les aperçus des éléments dans le dossier
    let previewIcons = '';
    const folderItems = getCurrentFolder().items[name].items;
    
    // Vérifier si nous sommes dans le TasksStorage
    const isTasksFolder = appData.currentPath.includes('TasksStorage');
    
    if (isTasksFolder) {
        // Afficher des aperçus d'emojis pour les tâches
        const taskKeys = Object.keys(folderItems).filter(key => folderItems[key].type === 'task').slice(0, 3);
        
        taskKeys.forEach(taskName => {
            previewIcons += `<div class="preview-emoji">${folderItems[taskName].emoji}</div>`;
        });
    } else {
        // Afficher des aperçus d'applications normales
        const appKeys = Object.keys(folderItems).filter(key => folderItems[key].type === 'app').slice(0, 3);
        
        appKeys.forEach(appName => {
            const domain = folderItems[appName].url.replace('https://', '').split('/')[0];
            previewIcons += `<img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" class="preview-icon">`;
        });
    }
    
    folderItem.innerHTML = `
        <div class="folder-icon">
            <i class="fas fa-folder"></i>
            <div class="folder-app-preview">
                ${previewIcons || '<i class="fas fa-folder-open" style="font-size: 14px; color: #a0a0a0;"></i>'}
            </div>
        </div>
        <div class="item-name">${name.startsWith('#') ? name.substring(1) : name}</div>
        <div class="selection-checkbox"></div>
    `;
    
    // Ajouter l'événement de clic
    folderItem.addEventListener('click', function(e) {
        if (appData.isSelectionMode) {
            const checkbox = this.querySelector('.selection-checkbox');
            checkbox.classList.toggle('selected');
            
            const itemName = this.getAttribute('data-name');
            const index = appData.selectedItems.indexOf(itemName);
            
            if (index === -1) {
                appData.selectedItems.push(itemName);
            } else {
                appData.selectedItems.splice(index, 1);
            }
            
            updateSelectionCount();
        } else {
            // Si le clic est sur le nom du dossier, passer en mode édition
            if (e.target.classList.contains('item-name')) {
                makeItemNameEditable(e.target, this);
                return;
            }
            // Sinon, naviguer vers le dossier
            const newPath = [...appData.currentPath, name];
            navigateTo(newPath);
        }
    });
    
    // Ajouter l'événement de clic droit
    folderItem.addEventListener('contextmenu', e => {
        if (contextMenu) {
            showContextMenu(e, folderItem);
            // Mettre à jour l'état du toggle de masquage
            const maskToggle = document.getElementById('context-mask-toggle');
            if (maskToggle) {
                const isMasked = name.startsWith('#') || (getCurrentFolder().items[name] && getCurrentFolder().items[name].masked);
                maskToggle.classList.toggle('active', isMasked);
            }
        }
    });
    
    return folderItem;
}



// Nouvelle fonction pour rendre un nom d'élément éditable
function makeItemNameEditable(nameElement, parentItem) {
    // Si un autre élément est déjà en cours d'édition, annuler cette édition
    const currentlyEditing = document.querySelector('.item-name-editing');
    if (currentlyEditing && currentlyEditing !== nameElement) {
        finishEditing(currentlyEditing);
    }
    
    const originalName = nameElement.textContent;
    const itemType = parentItem.classList.contains('folder-item') ? 'folder' : 'app';
    
    // Éviter de relancer l'édition si elle est déjà en cours
    if (nameElement.classList.contains('item-name-editing')) {
        return;
    }
    
    // Transformer l'élément en champ éditable
    nameElement.contentEditable = true;
    nameElement.classList.add('item-name-editing');
    nameElement.focus();
    
    // Sélectionner tout le texte
    const range = document.createRange();
    range.selectNodeContents(nameElement);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    // Stocker le nom d'origine dans un attribut de données
    nameElement.setAttribute('data-original-name', originalName);
    
    // Stocker une référence au gestionnaire d'événements pour pouvoir le supprimer
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishEditing(nameElement);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            nameElement.textContent = originalName;
            nameElement.contentEditable = false;
            nameElement.classList.remove('item-name-editing');
            nameElement.removeEventListener('keydown', handleEnterKey);
            nameElement.removeEventListener('blur', onBlur);
        }
    }
    
    function onBlur() {
        finishEditing(nameElement);
        nameElement.removeEventListener('keydown', handleEnterKey);
        nameElement.removeEventListener('blur', onBlur);
    }
    
    nameElement.addEventListener('keydown', handleEnterKey);
    nameElement.addEventListener('blur', onBlur);
    
    // Fonction pour terminer l'édition
    function finishEditing(element) {
        if (!element.isContentEditable) return; // Éviter le double traitement
        
        const newName = element.textContent.trim();
        const currentName = parentItem.getAttribute('data-name');
        
        element.contentEditable = false;
        element.classList.remove('item-name-editing');
        
        // Si le nom a changé et n'est pas vide
        if (newName && newName !== currentName) {
            console.log(`Renommage: ${currentName} -> ${newName}`);
            
            // Pour les dossiers, on doit mettre à jour le système de fichiers
            if (itemType === 'folder') {
                renameFolder(currentName, newName);
            } else if (itemType === 'app') {
                renameApp(currentName, newName);
            }
        } else if (!newName) {
            // Si le nom est vide, revenir au nom original
            element.textContent = currentName;
        }
    }
}



// Fonction pour renommer un dossier avec mise à jour dans Supabase
async function renameFolder(oldName, newName) {
    const currentFolder = getCurrentFolder();
    
    // Vérifier si le nouveau nom existe déjà (mais ignorer si c'est le même dossier avec un identifiant temporaire)
    if (currentFolder.items[newName] && 
        (!currentFolder.items[oldName]._tempId || 
         currentFolder.items[oldName]._tempId !== currentFolder.items[newName]._tempId)) {
        showToast(`Un dossier nommé "${newName}" existe déjà`, 'error');
        // Rétablir l'ancien nom dans l'interface
        const folderItem = document.querySelector(`.folder-item[data-name="${oldName}"]`);
        if (folderItem) {
            folderItem.querySelector('.item-name').textContent = oldName;
        }
        return;
    }
    
    // Si le dossier était temporaire, simplement le renommer sans chercher à trouver un duplicat
    const isNewFolder = currentFolder.items[oldName] && currentFolder.items[oldName]._tempId;
    
    // Copier l'objet avec le nouveau nom
    currentFolder.items[newName] = {...currentFolder.items[oldName]};
    // Supprimer l'ancien
    delete currentFolder.items[oldName];
    
    // Mettre à jour l'attribut data-name de l'élément
    const folderItem = document.querySelector(`.folder-item[data-name="${oldName}"]`);
    if (folderItem) {
        folderItem.setAttribute('data-name', newName);
        folderItem.querySelector('.item-name').textContent = newName;
    }
    
    // Construire le chemin complet actuel
    const currentPath = [...appData.currentPath];
    let folderId = null;
    let originalParentPath = null;
    
    // Mettre à jour dans Supabase
    if (supabaseAvailable) {
        try {
            // Essayer d'abord de récupérer l'ID stocké directement dans l'objet local
            if (currentFolder.items[newName]._id) {
                folderId = currentFolder.items[newName]._id;
                console.log('ID du dossier trouvé dans l\'objet local:', folderId);
            } else {
                // Rechercher dans Supabase en utilisant le nom et le chemin parent
                console.log('Recherche du dossier dans Supabase:', oldName, JSON.stringify(appData.currentPath));
                const { data: folderData, error: fetchError } = await supabase
                    .from('folders')
                    .select('id, parent_path')
                    .eq('name', oldName)
                    .eq('parent_path', JSON.stringify(appData.currentPath))
                    .single();
                    
                if (fetchError) {
                    console.error('Erreur lors de la recherche du dossier à renommer:', fetchError);
                } else if (folderData) {
                    folderId = folderData.id;
                    originalParentPath = folderData.parent_path;
                    // Stocker l'ID pour future référence
                    currentFolder.items[newName]._id = folderId;
                    console.log('ID du dossier trouvé dans Supabase:', folderId);
                }
            }
            
            if (folderId) {
                // Mettre à jour le dossier
                console.log('Mise à jour du dossier avec ID:', folderId, 'nouveau nom:', newName);
                const { data: updateData, error: updateError } = await supabase
                    .from('folders')
                    .update({ name: newName })
                    .eq('id', folderId)
                    .select();
                    
                if (updateError) {
                    console.error('Erreur lors de la mise à jour du nom du dossier:', updateError);
                    showToast('Erreur lors du renommage dans la base de données', 'error');
                } else {
                    console.log('Dossier renommé avec succès dans la base de données:', updateData);
                    
                    // Construire l'ancien et le nouveau chemin complet pour la mise à jour des sous-éléments
                    const oldPathComplete = [...currentPath, oldName];
                    const newPathComplete = [...currentPath, newName];
                    
                    // NOUVELLE PARTIE : Mettre à jour les chemins des sous-dossiers
                    await updateSubfoldersPath(oldPathComplete, newPathComplete);
                    
                    showToast(`Dossier renommé en "${newName}"`, 'success');
                }
            } else {
                console.error('Impossible de trouver l\'ID du dossier à renommer');
                showToast('Erreur: ID du dossier non trouvé', 'error');
            }
        } catch (error) {
            console.error('Exception lors du renommage du dossier dans la base de données:', error);
            showToast('Exception lors du renommage du dossier', 'error');
        }
    } else {
        showToast(`Dossier renommé en "${newName}"`, 'success');
    }
    
    // Mettre à jour l'interface
    updateContent();
}

// Fonction pour mettre à jour les chemins des sous-dossiers et leurs contenus
async function updateSubfoldersPath(oldPath, newPath) {
    if (!supabaseAvailable) return;
    
    try {
        console.log('Mise à jour des chemins des sous-dossiers:', 
                    JSON.stringify(oldPath), '->', JSON.stringify(newPath));
        
        // 1. Récupérer tous les dossiers dont le parent_path commence par l'ancien chemin
        const { data: subfolders, error: fetchError } = await supabase
            .from('folders')
            .select('id, name, parent_path');
        
        if (fetchError) {
            console.error('Erreur lors de la récupération des sous-dossiers:', fetchError);
            return;
        }
        
        // Filtrer les sous-dossiers qui sont concernés par le changement
        const affectedFolders = subfolders.filter(folder => {
            // Convertir parent_path en tableau s'il est stocké comme JSON
            const parentPath = Array.isArray(folder.parent_path) ? 
                folder.parent_path : JSON.parse(folder.parent_path);
            
            // Vérifier si ce dossier est un sous-dossier du dossier renommé
            // ou si son chemin parent contient le dossier renommé
            return isSubPath(oldPath, parentPath);
        });
        
        console.log(`${affectedFolders.length} sous-dossiers affectés par le renommage.`);
        
        // 2. Mettre à jour les chemins des sous-dossiers affectés
        for (const folder of affectedFolders) {
            // Convertir parent_path en tableau s'il est stocké comme JSON
            const oldParentPath = Array.isArray(folder.parent_path) ? 
                folder.parent_path : JSON.parse(folder.parent_path);
            
            // Créer le nouveau chemin parent en remplaçant l'ancien segment par le nouveau
            const newParentPath = updatePath(oldParentPath, oldPath, newPath);
            
            console.log(`Mise à jour du chemin: ${JSON.stringify(oldParentPath)} -> ${JSON.stringify(newParentPath)}`);
            
            // Mettre à jour le chemin dans la base de données
            const { error: updateError } = await supabase
                .from('folders')
                .update({ parent_path: newParentPath })
                .eq('id', folder.id);
            
            if (updateError) {
                console.error(`Erreur lors de la mise à jour du chemin du sous-dossier ${folder.name}:`, updateError);
            }
        }
    } catch (error) {
        console.error('Exception lors de la mise à jour des chemins des sous-dossiers:', error);
    }
}

// Fonction pour vérifier si un chemin est un sous-chemin d'un autre
function isSubPath(parentPath, testPath) {
    // Si le chemin à tester est plus court, il ne peut pas être un sous-chemin
    if (testPath.length < parentPath.length) return false;
    
    // Vérifier si le début du chemin à tester correspond au chemin parent
    for (let i = 0; i < parentPath.length; i++) {
        if (parentPath[i] !== testPath[i]) return false;
    }
    
    return true;
}

// Fonction pour mettre à jour un chemin en remplaçant un segment
function updatePath(originalPath, oldSegment, newSegment) {
    // Créer une copie du chemin original
    const updatedPath = [...originalPath];
    
    // Trouver où le segment à remplacer commence
    let startIndex = -1;
    for (let i = 0; i <= originalPath.length - oldSegment.length; i++) {
        let matches = true;
        for (let j = 0; j < oldSegment.length; j++) {
            if (originalPath[i + j] !== oldSegment[j]) {
                matches = false;
                break;
            }
        }
        if (matches) {
            startIndex = i;
            break;
        }
    }
    
    // Si le segment a été trouvé, le remplacer
    if (startIndex !== -1) {
        // Supprimer la partie à remplacer
        updatedPath.splice(startIndex, oldSegment.length);
        // Insérer le nouveau segment
        for (let i = newSegment.length - 1; i >= 0; i--) {
            updatedPath.splice(startIndex, 0, newSegment[i]);
        }
    }
    
    return updatedPath;
}

// Fonction pour rafraîchir l'arborescence complète des dossiers
async function refreshFolderTree() {
    if (!supabaseAvailable) return;
    
    try {
        console.log('Rafraîchissement de l\'arborescence des dossiers...');
        
        // Sauvegarder le chemin actuel
        const currentPath = [...appData.currentPath];
        
        // Recharger tous les dossiers et applications
        await loadFoldersFromSupabase();
        
        // Restaurer le chemin de navigation
        navigateTo(currentPath);
        
        console.log('Arborescence des dossiers rafraîchie avec succès.');
    } catch (error) {
        console.error('Erreur lors du rafraîchissement de l\'arborescence des dossiers:', error);
    }
}


// Vérifier si un nom d'élément existe déjà dans le dossier courant
function itemNameExists(name, excludeItem = null) {
    const currentFolder = getCurrentFolder();
    if (!currentFolder || !currentFolder.items) return false;
    
    // Si le nom n'existe pas du tout, retourner false
    if (!currentFolder.items[name]) return false;
    
    // Si on a fourni un élément à exclure et que c'est le même (par ID temporaire)
    if (excludeItem && 
        currentFolder.items[excludeItem] && 
        currentFolder.items[excludeItem]._tempId && 
        currentFolder.items[name]._tempId === currentFolder.items[excludeItem]._tempId) {
        return false;
    }
    
    return true;
}


// Fonction pour renommer une application avec mise à jour dans Supabase
async function renameApp(oldName, newName) {
    const currentFolder = getCurrentFolder();
    
    // Vérifier si le nouveau nom existe déjà
    if (currentFolder.items[newName]) {
        showToast(`Une application nommée "${newName}" existe déjà`, 'error');
        // Rétablir l'ancien nom dans l'interface
        const appItem = document.querySelector(`.app-item[data-name="${oldName}"]`);
        if (appItem) {
            appItem.querySelector('.item-name').textContent = oldName;
        }
        return;
    }
    
    // Copier l'objet avec le nouveau nom
    currentFolder.items[newName] = currentFolder.items[oldName];
    // Supprimer l'ancien
    delete currentFolder.items[oldName];
    
    // Mettre à jour l'attribut data-name de l'élément
    const appItem = document.querySelector(`.app-item[data-name="${oldName}"]`);
    if (appItem) {
        appItem.setAttribute('data-name', newName);
    }
    
    // Mettre à jour dans Supabase
    if (supabaseAvailable) {
        try {
            // Obtenir l'ID du dossier parent
            const folderId = await getFolderIdFromPath(appData.currentPath);
            
            if (folderId) {
                // Rechercher l'application dans Supabase
                const { data: appData, error: fetchError } = await supabase
                    .from('apps')
                    .select('id')
                    .eq('name', oldName)
                    .eq('folder_id', folderId)
                    .single();
                    
                if (!fetchError && appData) {
                    // Mettre à jour le nom de l'application
                    const { error: updateError } = await supabase
                        .from('apps')
                        .update({ name: newName })
                        .eq('id', appData.id);
                        
                    if (updateError) {
                        console.error('Erreur lors de la mise à jour du nom de l\'application:', updateError);
                    }
                }
            }
        } catch (error) {
            console.error('Exception lors du renommage de l\'application dans la base de données:', error);
        }
    }
    
    showToast(`Application renommée en "${newName}"`, 'success');
    
    // Mettre à jour l'interface
    updateContent();
}


// Nouvelle fonction pour créer un dossier directement dans la vue desktop et le sauvegarder dans Supabase
async function createNewFolderInDesktop() {
    // Vérifier si on est dans la vue desktop
    const desktopGrid = document.querySelector('.desktop-grid');
    if (!desktopGrid) return;
    
    // Si on est dans Home, naviguer vers Storage d'abord
    if (appData.currentPath.length === 1 && appData.currentPath[0] === 'Home') {
        navigateTo(['Home', 'Storage']);
        // Attendre que la navigation soit terminée avant de créer le dossier
        setTimeout(() => createNewFolderInDesktop(), 100);
        return;
    }
    
    // Générer un nom de dossier temporaire unique
    let tempName = "New Folder";
    let counter = 1;
    const currentFolder = getCurrentFolder();
    
    while (currentFolder.items[tempName]) {
        tempName = `New Folder (${counter})`;
        counter++;
    }
    
    // Créer le dossier dans le système de fichiers local
    currentFolder.items[tempName] = {
        type: 'folder',
        items: {},
        _tempId: Date.now() // Ajouter un identifiant temporaire unique
    };
    
    // Créer l'élément visuel du dossier
    const newFolderItem = createFolderItem(tempName);
    desktopGrid.appendChild(newFolderItem);
    
    let folderId = null;
    
    // Sauvegarder le dossier dans Supabase
    if (supabaseAvailable) {
        try {
            const { data, error } = await supabase
                .from('folders')
                .insert({
                    name: tempName,
                    parent_path: appData.currentPath,
                    is_masked: false
                })
                .select(); // Récupérer les données insérées pour obtenir l'ID
                
            if (error) {
                console.error('Erreur lors de la sauvegarde du dossier:', error);
                showToast('Erreur lors de la sauvegarde du dossier', 'error');
            } else if (data && data.length > 0) {
                folderId = data[0].id;
                // Stocker l'ID du dossier dans l'objet local pour référence future
                currentFolder.items[tempName]._id = folderId;
                console.log('Dossier sauvegardé avec succès, ID:', folderId);
            }
        } catch (error) {
            console.error('Exception lors de la sauvegarde du dossier:', error);
            showToast('Exception lors de la sauvegarde du dossier', 'error');
        }
    }
    
    // Mettre le nom en mode édition immédiatement
    const nameElement = newFolderItem.querySelector('.item-name');
    
    // Petit délai pour s'assurer que l'élément est bien rendu
    setTimeout(() => {
        makeItemNameEditable(nameElement, newFolderItem);
    }, 50);
}



    
// Créer un élément application
function createAppItem(name, url) {
    const appItem = document.createElement('div');
    appItem.className = 'app-item';
    if (name.startsWith('#') || (getCurrentFolder().items[name] && getCurrentFolder().items[name].masked)) {
        appItem.classList.add('masked-item');
    }
    appItem.setAttribute('data-name', name);
    
    const domain = url.replace('https://', '').split('/')[0];
    
    appItem.innerHTML = `
        <img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" class="app-icon">
        <div class="item-name">${name.startsWith('#') ? name.substring(1) : name}</div>
        <div class="selection-checkbox"></div>
    `;
    
    // Ajouter l'événement de clic
    appItem.addEventListener('click', function(e) {
        if (appData.isSelectionMode) {
            const checkbox = this.querySelector('.selection-checkbox');
            checkbox.classList.toggle('selected');
            
            const itemName = this.getAttribute('data-name');
            const index = appData.selectedItems.indexOf(itemName);
            
            if (index === -1) {
                appData.selectedItems.push(itemName);
            } else {
                appData.selectedItems.splice(index, 1);
            }
            
            updateSelectionCount();
        } else {
            // Si le clic est sur le nom de l'app, passer en mode édition
            if (e.target.classList.contains('item-name')) {
                makeItemNameEditable(e.target, this);
                return;
            }
            // Sinon, ouvrir l'application
            showToast(`Opening ${name.startsWith('#') ? name.substring(1) : name}`, 'info');
        }
    });
    
    // Ajouter l'événement de clic droit
    appItem.addEventListener('contextmenu', e => {
        if (contextMenu) {
            showContextMenu(e, appItem);
            // Mettre à jour l'état du toggle de masquage
            const maskToggle = document.getElementById('context-mask-toggle');
            if (maskToggle) {
                const isMasked = name.startsWith('#') || (getCurrentFolder().items[name] && getCurrentFolder().items[name].masked);
                maskToggle.classList.toggle('active', isMasked);
            }
        }
    });
    
    return appItem;
}

// Créer un élément tâche
function createTaskItem(name, emoji) {
    const taskItem = document.createElement('div');
    taskItem.className = 'app-item task-item';
    taskItem.setAttribute('data-name', name);
    
    taskItem.innerHTML = `
        <div class="task-icon">${emoji}</div>
        <div class="item-name">${name}</div>
        <div class="selection-checkbox"></div>
    `;
    
    // Ajouter l'événement de clic
    taskItem.addEventListener('click', function(e) {
        if (appData.isSelectionMode) {
            const checkbox = this.querySelector('.selection-checkbox');
            checkbox.classList.toggle('selected');
            
            const itemName = this.getAttribute('data-name');
            const index = appData.selectedItems.indexOf(itemName);
            
            if (index === -1) {
                appData.selectedItems.push(itemName);
            } else {
                appData.selectedItems.splice(index, 1);
            }
            
            updateSelectionCount();
        } else {
            // Si le clic est sur le nom de la tâche, passer en mode édition
            if (e.target.classList.contains('item-name')) {
                makeItemNameEditable(e.target, this);
                return;
            }
            // Rien ne se passe pour l'instant quand on clique sur une tâche
            showToast(`Tâche: ${name}`, 'info');
        }
    });
    
    // Ajouter l'événement de clic droit
    taskItem.addEventListener('contextmenu', e => {
        if (contextMenu) showContextMenu(e, taskItem);
    });
    
    return taskItem;
}

    
    // Créer un élément dossier pour l'écran d'accueil
function createQuickFolderItem(name, folder) {
    const folderItem = document.createElement('div');
    folderItem.className = 'folder-item';
    folderItem.setAttribute('data-name', name);
    
    // Récupérer les aperçus des applications dans le dossier
    let previewIcons = '';
    const folderItems = folder.items;
    const appKeys = Object.keys(folderItems).filter(key => folderItems[key].type === 'app').slice(0, 3);
    
    appKeys.forEach(appName => {
        const domain = folderItems[appName].url.replace('https://', '').split('/')[0];
        previewIcons += `<img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" class="preview-icon">`;
    });
    
    folderItem.innerHTML = `
        <div class="folder-icon">
            <i class="fas fa-folder"></i>
            <div class="folder-app-preview">
                ${previewIcons || '<i class="fas fa-folder-open" style="font-size: 14px; color: #a0a0a0;"></i>'}
            </div>
        </div>
        <div class="item-name">${name}</div>
        <div class="selection-checkbox"></div>
    `;
    
    // Ajouter l'événement de clic
    folderItem.addEventListener('click', function(e) {
        if (appData.isSelectionMode) {
            const checkbox = this.querySelector('.selection-checkbox');
            checkbox.classList.toggle('selected');
            
            const itemName = this.getAttribute('data-name');
            const index = appData.selectedItems.indexOf(itemName);
            
            if (index === -1) {
                appData.selectedItems.push(itemName);
            } else {
                appData.selectedItems.splice(index, 1);
            }
            
            updateSelectionCount();
        } else {
            // Si le clic est sur le nom du dossier, passer en mode édition
            if (e.target.classList.contains('item-name')) {
                makeQuickFolderNameEditable(e.target, this);
                return;
            }
            // Naviguer vers le dossier dans Storage
            const newPath = ['Home', 'Storage', name];
            navigateTo(newPath);
        }
    });
    
    // Ajouter l'événement de clic droit
    folderItem.addEventListener('contextmenu', e => {
        if (contextMenu) showContextMenu(e, folderItem);
    });
    
    return folderItem;
}

// Fonction spécifique pour l'édition des dossiers rapides
function makeQuickFolderNameEditable(nameElement, parentItem) {
    // Si un autre élément est déjà en cours d'édition, annuler cette édition
    const currentlyEditing = document.querySelector('.item-name-editing');
    if (currentlyEditing) {
        finishQuickFolderEditing(currentlyEditing);
    }
    
    const originalName = nameElement.textContent;
    
    // Transformer l'élément en champ éditable
    nameElement.contentEditable = true;
    nameElement.classList.add('item-name-editing');
    nameElement.focus();
    
    // Sélectionner tout le texte
    const range = document.createRange();
    range.selectNodeContents(nameElement);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    // Gérer la touche Entrée et la perte de focus
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishQuickFolderEditing(nameElement);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            nameElement.textContent = originalName;
            nameElement.contentEditable = false;
            nameElement.classList.remove('item-name-editing');
            nameElement.removeEventListener('keydown', handleEnterKey);
        }
    }
    
    nameElement.addEventListener('keydown', handleEnterKey);
    
    nameElement.addEventListener('blur', function onBlur() {
        finishQuickFolderEditing(nameElement);
        nameElement.removeEventListener('blur', onBlur);
    });
    
    // Fonction pour terminer l'édition d'un dossier rapide
    function finishQuickFolderEditing(element) {
        const newName = element.textContent.trim();
        const currentName = parentItem.getAttribute('data-name');
        
        element.contentEditable = false;
        element.classList.remove('item-name-editing');
        
        // Si le nom a changé et n'est pas vide
        if (newName && newName !== currentName) {
            // Renommer le dossier dans Storage
            if (fileSystem.Home.items.Storage && fileSystem.Home.items.Storage.items[currentName]) {
                // Vérifier si le nouveau nom existe déjà
                if (fileSystem.Home.items.Storage.items[newName]) {
                    showToast(`A folder named "${newName}" already exists in Storage`, 'error');
                    element.textContent = currentName;
                    return;
                }
                
                // Copier l'objet avec le nouveau nom
                fileSystem.Home.items.Storage.items[newName] = fileSystem.Home.items.Storage.items[currentName];
                // Supprimer l'ancien
                delete fileSystem.Home.items.Storage.items[currentName];
                
                // Mettre à jour l'attribut data-name de l'élément
                parentItem.setAttribute('data-name', newName);
                
                showToast(`Folder renamed to "${newName}"`, 'success');
                
                // Mettre à jour l'interface
                updateContent();
            }
        } else if (!newName) {
            // Si le nom est vide, revenir au nom original
            element.textContent = currentName;
        }
    }
}


// Fonction spécifique pour l'édition des apps rapides
function makeHomeAppNameEditable(nameElement, parentItem) {
    // Si un autre élément est déjà en cours d'édition, annuler cette édition
    const currentlyEditing = document.querySelector('.item-name-editing');
    if (currentlyEditing) {
        finishHomeAppEditing(currentlyEditing);
    }
    
    const originalName = nameElement.textContent;
    const folderName = parentItem.getAttribute('data-folder');
    
    // Transformer l'élément en champ éditable
    nameElement.contentEditable = true;
    nameElement.classList.add('item-name-editing');
    nameElement.focus();
    
    // Sélectionner tout le texte
    const range = document.createRange();
    range.selectNodeContents(nameElement);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    // Gérer la touche Entrée et la perte de focus
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            finishHomeAppEditing(nameElement);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            nameElement.textContent = originalName;
            nameElement.contentEditable = false;
            nameElement.classList.remove('item-name-editing');
            nameElement.removeEventListener('keydown', handleEnterKey);
        }
    }
    
    nameElement.addEventListener('keydown', handleEnterKey);
    
    nameElement.addEventListener('blur', function onBlur() {
        finishHomeAppEditing(nameElement);
        nameElement.removeEventListener('blur', onBlur);
    });
    
    // Fonction pour terminer l'édition d'une app rapide
    function finishHomeAppEditing(element) {
        const newName = element.textContent.trim();
        const currentName = parentItem.getAttribute('data-name');
        
        element.contentEditable = false;
        element.classList.remove('item-name-editing');
        
        // Si le nom a changé et n'est pas vide
        if (newName && newName !== currentName) {
            // Renommer l'app dans le dossier parent
            if (fileSystem.Home.items.Storage && 
                fileSystem.Home.items.Storage.items[folderName] &&
                fileSystem.Home.items.Storage.items[folderName].items[currentName]) {
                
                // Vérifier si le nouveau nom existe déjà
                if (fileSystem.Home.items.Storage.items[folderName].items[newName]) {
                    showToast(`An app named "${newName}" already exists in ${folderName}`, 'error');
                    element.textContent = currentName;
                    return;
                }
                
                // Copier l'objet avec le nouveau nom
                fileSystem.Home.items.Storage.items[folderName].items[newName] = 
                    fileSystem.Home.items.Storage.items[folderName].items[currentName];
                
                // Supprimer l'ancien
                delete fileSystem.Home.items.Storage.items[folderName].items[currentName];
                
                // Mettre à jour l'attribut data-name de l'élément
                parentItem.setAttribute('data-name', newName);
                
                showToast(`App renamed to "${newName}"`, 'success');
                
                // Mettre à jour l'interface
                updateContent();
            }
        } else if (!newName) {
            // Si le nom est vide, revenir au nom original
            element.textContent = currentName;
        }
    }
}


// Créer un élément application pour l'écran d'accueil
function createHomeAppItem(name, url, folderName) {
    const appItem = document.createElement('div');
    appItem.className = 'app-item';
    appItem.setAttribute('data-name', name);
    appItem.setAttribute('data-folder', folderName);
    
    const domain = url.replace('https://', '').split('/')[0];
    
    appItem.innerHTML = `
        <img src="https://www.google.com/s2/favicons?domain=${domain}&sz=64" class="app-icon">
        <div class="item-name">${name}</div>
        <div class="selection-checkbox"></div>
    `;
    
    // Ajouter l'événement de clic
    appItem.addEventListener('click', function(e) {
        if (appData.isSelectionMode) {
            const checkbox = this.querySelector('.selection-checkbox');
            checkbox.classList.toggle('selected');
            
            const itemName = this.getAttribute('data-name');
            const index = appData.selectedItems.indexOf(itemName);
            
            if (index === -1) {
                appData.selectedItems.push(itemName);
            } else {
                appData.selectedItems.splice(index, 1);
            }
            
            updateSelectionCount();
        } else {
            // Si le clic est sur le nom de l'app, passer en mode édition
            if (e.target.classList.contains('item-name')) {
                makeHomeAppNameEditable(e.target, this);
                return;
            }
            // Ouvrir l'application
            showToast(`Opening ${name}`, 'info');
        }
    });
    
    // Ajouter l'événement de clic droit
    appItem.addEventListener('contextmenu', e => {
        if (contextMenu) showContextMenu(e, appItem);
    });
    
    return appItem;
}

// Nouvelle fonction pour créer un dossier directement dans la vue mobile et le sauvegarder dans Supabase
async function createNewFolderInMobile() {
    // Si nous sommes sur la page d'accueil, naviguer vers Storage d'abord
    if (appData.currentPath.length === 1 && appData.currentPath[0] === 'Home') {
        navigateTo(['Home', 'Storage']);
        // Attendre que la navigation soit terminée avant de créer le dossier
        setTimeout(() => createNewFolderInMobile(), 100);
        return;
    }
    
    // Générer un nom de dossier temporaire unique
    let tempName = "New Folder";
    let counter = 1;
    const currentFolder = getCurrentFolder();
    
    while (currentFolder.items[tempName]) {
        tempName = `New Folder (${counter})`;
        counter++;
    }
    
    // Créer le dossier dans le système de fichiers local
    currentFolder.items[tempName] = {
        type: 'folder',
        items: {},
        _tempId: Date.now() // Ajouter un identifiant temporaire unique
    };
    
    let folderId = null;
    
    // Sauvegarder le dossier dans Supabase
    if (supabaseAvailable) {
        try {
            const { data, error } = await supabase
                .from('folders')
                .insert({
                    name: tempName,
                    parent_path: appData.currentPath,
                    is_masked: false
                })
                .select(); // Récupérer les données insérées
                
            if (error) {
                console.error('Erreur lors de la sauvegarde du dossier:', error);
                showToast('Erreur lors de la sauvegarde du dossier', 'error');
            } else if (data && data.length > 0) {
                folderId = data[0].id;
                // Stocker l'ID du dossier dans l'objet local
                currentFolder.items[tempName]._id = folderId;
                console.log('Dossier sauvegardé avec succès, ID:', folderId);
            }
        } catch (error) {
            console.error('Exception lors de la sauvegarde du dossier:', error);
            showToast('Exception lors de la sauvegarde du dossier', 'error');
        }
    }
    
    // Mettre à jour le contenu
    updateContent();
    
    // Trouver le nouvel élément créé
    setTimeout(() => {
        const newFolderItem = document.querySelector(`.folder-item[data-name="${tempName}"]`);
        if (newFolderItem) {
            const nameElement = newFolderItem.querySelector('.item-name');
            makeItemNameEditable(nameElement, newFolderItem);
        }
    }, 100);
    
    // Réinitialiser la navigation active si nécessaire
    const homeNavItem = document.querySelector('.mobile-bottom-nav .nav-item[data-content="home"]');
    if (homeNavItem) {
        document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        homeNavItem.classList.add('active');
    }
}


// Fonction pour créer une application et la sauvegarder dans Supabase
async function createNewApp(name, url, folderPath = null) {
    if (!folderPath) {
        folderPath = appData.currentPath;
    }
    
    // Obtenir le dossier courant
    let currentFolder = getCurrentFolder();
    
    // Vérifier si le nom existe déjà
    if (currentFolder.items[name]) {
        let counter = 1;
        let newName = `${name} (${counter})`;
        while (currentFolder.items[newName]) {
            counter++;
            newName = `${name} (${counter})`;
        }
        name = newName;
    }
    
    // Créer l'application dans le système de fichiers local
    currentFolder.items[name] = {
        type: 'app',
        url: url
    };
    
    // Sauvegarder dans Supabase
    if (supabaseAvailable) {
        try {
            // Obtenir d'abord l'ID du dossier parent
            const folderId = await getFolderIdFromPath(folderPath);
            
            if (folderId) {
                const { data, error } = await supabase
                    .from('apps')
                    .insert({
                        name: name,
                        url: url,
                        folder_id: folderId,
                        is_masked: false
                    });
                    
                if (error) {
                    console.error('Erreur lors de la sauvegarde de l\'application:', error);
                    showToast('Erreur lors de la sauvegarde de l\'application', 'error');
                } else {
                    console.log('Application sauvegardée avec succès:', data);
                }
            } else {
                console.error('Impossible de trouver l\'ID du dossier parent');
                showToast('Erreur: Impossible de trouver le dossier parent', 'error');
            }
        } catch (error) {
            console.error('Exception lors de la sauvegarde de l\'application:', error);
            showToast('Exception lors de la sauvegarde de l\'application', 'error');
        }
    }
    
    // Mettre à jour l'interface
    updateContent();
    
    return name;
}

    
// Mobile navigation
mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
        const contentId = this.getAttribute('data-content');
        
        // Update navigation active state
        mobileNavItems.forEach(navItem => navItem.classList.remove('active'));
        this.classList.add('active');
        
        // Update content visibility
        if (contentId === 'create') {
            // Créer un dossier directement dans l'interface
            createNewFolderInMobile();
            return;
        }
        
        mobileContentSections.forEach(section => {
            section.style.display = 'none';
        });
        
        if (contentId === 'home') {
            const homeContent = document.getElementById('mobile-home-content');
            if (homeContent) {
                homeContent.style.display = 'block';
                appData.currentView = 'home';
                updateContent();
            }
        } else if (contentId === 'explore') {
            const exploreContent = document.getElementById('mobile-explore-content');
            if (exploreContent) {
                exploreContent.style.display = 'block';
                appData.currentView = 'explore';
            }
        } else if (contentId === 'me') {
            const meContent = document.getElementById('mobile-me-content');
            if (meContent) {
                meContent.style.display = 'block';
                appData.currentView = 'me';
            }
        }
    });
});

function initializeHeaderNavigation() {
    // Bouton de création dans le header
    const headerCreateBtn = document.querySelector('.header-create-btn');
    if (headerCreateBtn) {
        headerCreateBtn.addEventListener('click', function() {
            createNewFolderInMobile();
        });
    }
    
    // Navigation items dans le header
    const headerNavItems = document.querySelectorAll('.header-nav-item');
    headerNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const contentId = this.getAttribute('data-content');
            
            // Update navigation active state
            headerNavItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Update content visibility
            const mobileContentSections = document.querySelectorAll('.mobile-content');
            mobileContentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Gérer l'affichage du chemin
            const mobileView = document.querySelector('.mobile-view');
            mobileView.classList.remove('storage-view');
            
            if (contentId === 'home') {
                const homeContent = document.getElementById('mobile-home-content');
                if (homeContent) {
                    homeContent.style.display = 'block';
                    appData.currentView = 'home';
                    updateContent();
                    
                    // Vérifier si nous sommes dans Storage
                    if (appData.currentPath.length > 1 && appData.currentPath.includes('Storage')) {
                        mobileView.classList.add('storage-view');
                    }
                }
            } else if (contentId === 'explore') {
                const exploreContent = document.getElementById('mobile-explore-content');
                if (exploreContent) {
                    exploreContent.style.display = 'block';
                    appData.currentView = 'explore';
                }
            } else if (contentId === 'export') {
                // Logique pour l'export
                showToast('Export functionality coming soon', 'info');
            } else if (contentId === 'me') {
                const meContent = document.getElementById('mobile-me-content');
                if (meContent) {
                    meContent.style.display = 'block';
                    appData.currentView = 'me';
                }
            }
        });
    });
}

// Ajoutez cette variable d'état global
appData.showMaskedItems = true; // Par défaut, afficher les éléments masqués

// Fonction pour basculer l'état de masquage d'un élément et mettre à jour Supabase
async function toggleItemMask(itemName) {
    const currentFolder = getCurrentFolder();
    if (currentFolder && currentFolder.items && currentFolder.items[itemName]) {
        const item = currentFolder.items[itemName];
        const itemType = item.type; // 'folder' ou 'app'
        let newName = itemName;
        
        // Basculer l'état masqué
        if (item.masked) {
            delete item.masked;
            // Enlever le préfixe # du nom si présent
            if (itemName.startsWith('#')) {
                newName = itemName.substring(1);
                currentFolder.items[newName] = item;
                delete currentFolder.items[itemName];
            }
        } else {
            item.masked = true;
            // Ajouter le préfixe # au nom s'il n'est pas présent
            if (!itemName.startsWith('#')) {
                newName = `#${itemName}`;
                currentFolder.items[newName] = item;
                delete currentFolder.items[itemName];
            }
        }
        
        // Mettre à jour dans Supabase
        if (supabaseAvailable) {
            try {
                if (itemType === 'folder') {
                    // Rechercher le dossier dans Supabase
                    const { data: folderData, error: fetchError } = await supabase
                        .from('folders')
                        .select('id')
                        .eq('name', itemName.startsWith('#') ? itemName.substring(1) : itemName)
                        .eq('parent_path', JSON.stringify(appData.currentPath))
                        .single();
                        
                    if (!fetchError && folderData) {
                        // Mettre à jour le masquage et le nom si nécessaire
                        const { error: updateError } = await supabase
                            .from('folders')
                            .update({ 
                                is_masked: item.masked,
                                name: newName 
                            })
                            .eq('id', folderData.id);
                            
                        if (updateError) {
                            console.error('Erreur lors de la mise à jour du masquage du dossier:', updateError);
                        }
                    }
                } else if (itemType === 'app') {
                    // Rechercher l'application dans Supabase
                    const { data: appData, error: fetchError } = await supabase
                        .from('apps')
                        .select('id')
                        .eq('name', itemName.startsWith('#') ? itemName.substring(1) : itemName)
                        .eq('folder_id', getFolderIdFromPath(appData.currentPath))
                        .single();
                        
                    if (!fetchError && appData) {
                        // Mettre à jour le masquage et le nom si nécessaire
                        const { error: updateError } = await supabase
                            .from('apps')
                            .update({ 
                                is_masked: item.masked,
                                name: newName 
                            })
                            .eq('id', appData.id);
                            
                        if (updateError) {
                            console.error('Erreur lors de la mise à jour du masquage de l\'application:', updateError);
                        }
                    }
                }
            } catch (error) {
                console.error('Exception lors de la mise à jour du masquage:', error);
            }
        }
        
        return newName; // Retourner le nouveau nom
    }
    return itemName; // Retourner le nom d'origine si rien n'a changé
}

// Fonction utilitaire pour obtenir l'ID du dossier parent
async function getFolderIdFromPath(path) {
    if (!supabaseAvailable) return null;
    
    try {
        const { data, error } = await supabase
            .from('folders')
            .select('id')
            .eq('parent_path', JSON.stringify(path.slice(0, -1)))
            .eq('name', path[path.length - 1])
            .single();
            
        if (error) {
            console.error('Erreur lors de la récupération de l\'ID du dossier:', error);
            return null;
        }
        
        return data?.id || null;
    } catch (error) {
        console.error('Exception lors de la récupération de l\'ID du dossier:', error);
        return null;
    }
}


// Fonction pour basculer l'affichage des éléments masqués
function toggleShowMaskedItems() {
    appData.showMaskedItems = !appData.showMaskedItems;
    
    // Ajouter ou supprimer la classe CSS du corps du document
    if (!appData.showMaskedItems) {
        document.body.classList.add('hide-masked-items');
    } else {
        document.body.classList.remove('hide-masked-items');
    }
    
    updateContent();
    return appData.showMaskedItems;
}

    
    // Overflow menu
    if (overflowMenuBtn) {
        overflowMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (overflowDropdown) overflowDropdown.classList.toggle('visible');
        });
    }
    
    // Hide overflow menu when clicking elsewhere
    document.addEventListener('click', function() {
        if (overflowDropdown) overflowDropdown.classList.remove('visible');
    });
    
    // Prevent event propagation when clicking inside dropdown
    if (overflowDropdown) {
        overflowDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Context menu
    function showContextMenu(e, item) {
    e.preventDefault();
    
    if (contextMenu) {
        // Position the context menu
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.style.display = 'block';
        
        // Store reference to the target item
        const itemName = item.getAttribute('data-name');
        contextMenu.setAttribute('data-target-item', itemName);
        
        // Mettre à jour l'état du toggle de masquage
        const maskToggle = document.getElementById('context-mask-toggle');
        if (maskToggle) {
            const currentFolder = getCurrentFolder();
            const isMasked = itemName.startsWith('#') || (currentFolder.items[itemName] && currentFolder.items[itemName].masked);
            maskToggle.classList.toggle('active', isMasked);
        }
        
        // Mettre à jour l'état du toggle d'affichage des éléments masqués
        const showMaskedToggle = document.getElementById('context-show-masked-toggle');
        if (showMaskedToggle) {
            showMaskedToggle.classList.toggle('active', appData.showMaskedItems);
        }
        
        // Hide menu when clicking elsewhere
        function hideMenu() {
            contextMenu.style.display = 'none';
            document.removeEventListener('click', hideMenu);
        }
        
        setTimeout(() => {
            document.addEventListener('click', hideMenu);
        }, 0);
    }
}


    
// Handle context menu actions
if (contextMenu) {
    contextMenu.addEventListener('click', function(e) {
        const menuItem = e.target.closest('.context-menu-item');
        if (!menuItem) return;
        
        const action = menuItem.getAttribute('data-action');
        const targetItemName = contextMenu.getAttribute('data-target-item');
        const targetItem = document.querySelector(`.folder-item[data-name="${targetItemName}"], .app-item[data-name="${targetItemName}"]`);
        
        if (action === 'open') {
            showToast('Opening link...', 'info');
        } else if (action === 'select') {
            toggleSelectionMode(true);
        } else if (action === 'copy') {
            showToast('Item copied', 'success');
        } else if (action === 'move') {
            showToast('Ready to move item', 'info');
        } else if (action === 'mask') {
            if (targetItem) {
                const maskToggle = document.getElementById('context-mask-toggle');
                if (maskToggle) {
                    maskToggle.classList.toggle('active');
                    const newName = toggleItemMask(targetItemName);
                    showToast(`Élément ${maskToggle.classList.contains('active') ? 'masqué' : 'visible'}`, 'success');
                    updateContent();
                }
            }
        } else if (action === 'rename') {
            if (targetItem) {
                const nameElement = targetItem.querySelector('.item-name');
                makeItemNameEditable(nameElement, targetItem);
            }
        } else if (action === 'info') {
            if (infoModal) showModal('info-modal');
        } else if (action === 'show-masked-items') {
            const showMaskedToggle = document.getElementById('context-show-masked-toggle');
            if (showMaskedToggle) {
                const isShowing = toggleShowMaskedItems();
                showMaskedToggle.classList.toggle('active', isShowing);
                showToast(`Éléments masqués ${isShowing ? 'affichés' : 'cachés'}`, 'info');
            }
        }
    });
}


    
    // Selection toolbar actions
    if (mobileSelectAll) {
        mobileSelectAll.addEventListener('click', function() {
            const allItems = document.querySelectorAll('.folder-item, .app-item');
            const allSelected = appData.selectedItems.length === allItems.length;
            
            if (allSelected) {
                // Deselect all
                appData.selectedItems = [];
                document.querySelectorAll('.selection-checkbox').forEach(checkbox => {
                    checkbox.classList.remove('selected');
                });
            } else {
                // Select all
                appData.selectedItems = [];
                allItems.forEach(item => {
                    const itemName = item.getAttribute('data-name');
                    appData.selectedItems.push(itemName);
                    item.querySelector('.selection-checkbox').classList.add('selected');
                });
            }
            
            updateSelectionCount();
        });
    }
    
    if (mobileSelectionCopy) {
        mobileSelectionCopy.addEventListener('click', function() {
            if (appData.selectedItems.length > 0) {
                appData.clipboardItems = [...appData.selectedItems];
                appData.clipboardOperation = 'copy';
                showToast(`${appData.selectedItems.length} items copied`, 'success');
                toggleSelectionMode(false);
            }
        });
    }
    
    if (mobileSelectionMove) {
        mobileSelectionMove.addEventListener('click', function() {
            if (appData.selectedItems.length > 0) {
                appData.clipboardItems = [...appData.selectedItems];
                appData.clipboardOperation = 'move';
                showToast(`${appData.selectedItems.length} items ready to move`, 'info');
                toggleSelectionMode(false);
            }
        });
    }
    
    if (mobileSelectionDelete) {
        mobileSelectionDelete.addEventListener('click', function() {
            if (appData.selectedItems.length > 0 && deleteConfirmModal) {
                showModal('delete-confirm-modal');
            }
        });
    }
    
    if (mobileSelectionCancel) {
        mobileSelectionCancel.addEventListener('click', function() {
            toggleSelectionMode(false);
        });
    }
    
    // Mobile action buttons
    if (mobileSelectBtn) {
        mobileSelectBtn.addEventListener('click', function() {
            toggleSelectionMode(true);
            if (overflowDropdown) overflowDropdown.classList.remove('visible');
        });
    }
    
    // Desktop action buttons
    if (desktopSelectBtn) {
        desktopSelectBtn.addEventListener('click', function() {
            toggleSelectionMode(true);
        });
    }
    
    if (desktopCreateBtn) {
    desktopCreateBtn.addEventListener('click', function() {
        // Créer un dossier directement dans la vue desktop
        createNewFolderInDesktop();
    });
}
    if (desktopRenameBtn) {
    desktopRenameBtn.addEventListener('click', function() {
        // Vérifier s'il y a des éléments sélectionnés
        if (appData.selectedItems.length === 1) {
            const itemName = appData.selectedItems[0];
            const itemElement = document.querySelector(`.folder-item[data-name="${itemName}"], .app-item[data-name="${itemName}"]`);
            
            if (itemElement) {
                const nameElement = itemElement.querySelector('.item-name');
                makeItemNameEditable(nameElement, itemElement);
            }
        } else if (appData.selectedItems.length === 0) {
            showToast('Please select an item to rename', 'info');
        } else {
            showToast('Please select only one item to rename', 'info');
        }
    });
}
    if (mobileRenameBtn) {
    mobileRenameBtn.addEventListener('click', function() {
        if (overflowDropdown) overflowDropdown.classList.remove('visible');
        
        // Si nous avons un élément sélectionné
        if (appData.selectedItems.length === 1) {
            const itemName = appData.selectedItems[0];
            const itemElement = document.querySelector(`.folder-item[data-name="${itemName}"], .app-item[data-name="${itemName}"]`);
            
            if (itemElement) {
                const nameElement = itemElement.querySelector('.item-name');
                makeItemNameEditable(nameElement, itemElement);
            }
        } else {
            showToast('Please select an item to rename', 'info');
        }
    });
}


    
    // Close modals
    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if (modal) modal.classList.remove('active');
        });
    });
    
 
    
    // Add link
    const addLinkBtn = document.getElementById('add-link-btn');
    if (addLinkBtn) {
        addLinkBtn.addEventListener('click', function() {
            const nameInput = document.getElementById('link-name-input');
            const urlInput = document.getElementById('link-url-input');
            const folderSelect = document.getElementById('link-folder-select');
            
            if (!nameInput || !urlInput || !folderSelect) return;
            
            const name = nameInput.value.trim();
            const url = urlInput.value.trim();
            const folder = folderSelect.value;
            
            if (name && url) {
                // Ajouter le lien à la structure de données
                const currentFolder = getCurrentFolder();
                if (currentFolder.items) {
                    currentFolder.items[name] = {
                        type: 'app',
                        url: url.startsWith('http') ? url : `https://${url}`
                    };
                    
                    showToast(`Link "${name}" added`, 'success');
                    hideModal('add-link-modal');
                    nameInput.value = '';
                    urlInput.value = '';
                    folderSelect.selectedIndex = 0;
                    updateContent();
                }
            } else {
                showToast('Please enter both name and URL', 'error');
            }
        });
    }
    
    // Confirm delete
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const count = appData.selectedItems.length || 1;
            
            // Supprimer les éléments sélectionnés
            const currentFolder = getCurrentFolder();
            if (currentFolder.items) {
                appData.selectedItems.forEach(itemName => {
                    delete currentFolder.items[itemName];
                });
                
                showToast(`${count} item${count !== 1 ? 's' : ''} deleted`, 'success');
                hideModal('delete-confirm-modal');
                toggleSelectionMode(false);
                updateContent();
            }
        });
    }
    
    // Alphabet filter
    document.querySelectorAll('.letter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.letter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const letter = this.textContent;
            showToast(`Filtering by "${letter}"`, 'info');
        });
    });
    
// Tree toggling 
document.addEventListener('DOMContentLoaded', function() {
    // Cette fonction sera remplacée par une initialisation dynamique
    function setupTreeToggles() {
        document.querySelectorAll('.tree-toggle').forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const treeItem = this.closest('.tree-item');
                const icon = this.querySelector('i');
                const isExpanded = icon.classList.contains('fa-chevron-down');
                
                if (isExpanded) {
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
                    // Hide children
                    const nextSibling = treeItem.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                        nextSibling.style.display = 'none';
                    }
                } else {
                    icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
                    // Show children
                    const nextSibling = treeItem.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains('folder-tree')) {
                        nextSibling.style.display = 'block';
                    }
                }
            });
        });
    }
    
    // Appeler cette fonction au chargement initial
    setupTreeToggles();
});

    
// Gérer les clics sur les éléments de la barre latérale
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
        const span = this.querySelector('span');
        if (!span) return;
        
        const text = span.textContent;
        
        if (text === 'Storage') {
            navigateTo(['Home', 'Storage']);
        } else if (text === 'Recent') {
            showToast('Recent view not implemented', 'info');
        } else if (text === 'Favorites') {
            showToast('Favorites view not implemented', 'info');
        } else if (text === 'This PC') {
            showToast('This PC view not implemented', 'info');
        }
        
        // Mettre à jour l'état actif
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

    
    // Gérer les clics sur les dossiers rapides de la barre latérale
    document.querySelectorAll('.sidebar-folder-item, .sidebar-app-item').forEach(item => {
        item.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            
            if (this.classList.contains('sidebar-folder-item')) {
                // Trouver le chemin du dossier
                const newPath = ['Storage', name];
                navigateTo(newPath);
            } else {
                // Ouvrir l'application
                showToast(`Opening ${name}`, 'info');
            }
        });
    });
    
    // Gérer les clics sur les éléments de l'arborescence
    document.querySelectorAll('.tree-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // Ne pas exécuter si le clic était sur le toggle
            if (e.target.closest('.tree-toggle')) return;
            
            const span = this.querySelector('span');
            if (!span) return;
            
            const folderName = span.textContent;
            
            if (folderName === 'Storage') {
                navigateTo(['Storage']);
            } else if (folderName === 'Work') {
                navigateTo(['Storage', 'Work']);
            } else if (folderName === 'Movies') {
                navigateTo(['Storage', 'Movies']);
            } else if (folderName === 'Music') {
                navigateTo(['Storage', 'Music']);
            }
        });
    });
    
    // Ajouter des fonctionnalités aux boutons de navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const icon = btn.querySelector('i');
        if (!icon) return;
        
        if (icon.classList.contains('fa-arrow-left')) {
            btn.addEventListener('click', () => {
                // Revenir en arrière si possible
                if (appData.currentPath.length > 1) {
                    navigateTo(appData.currentPath.slice(0, -1));
                }
            });
        } else if (icon.classList.contains('fa-arrow-right')) {
            // Avancer dans l'historique (pas implémenté)
            btn.addEventListener('click', () => {
                showToast('Navigation forward not implemented', 'info');
            });
        } else if (icon.classList.contains('fa-arrow-up')) {
            btn.addEventListener('click', () => {
                // Monter d'un niveau si possible
                if (appData.currentPath.length > 1) {
                    navigateTo(appData.currentPath.slice(0, -1));
                }
            });
        } else if (icon.classList.contains('fa-sync-alt')) {
            btn.addEventListener('click', () => {
                // Rafraîchir le contenu
                updateContent();
                showToast('Content refreshed', 'success');
            });
        }
    });
    
// Init
// Initialisation des toggle switches
function initializeToggleSwitches() {
    // Toggle pour afficher/masquer les éléments masqués
    const showMaskedToggles = document.querySelectorAll('#desktop-show-masked-toggle, #mobile-show-masked-toggle, #context-show-masked-toggle');
    showMaskedToggles.forEach(toggle => {
        // Initialiser l'état du toggle
        toggle.classList.toggle('active', appData.showMaskedItems);
        
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isShowing = toggleShowMaskedItems();
            showMaskedToggles.forEach(t => t.classList.toggle('active', isShowing));
            showToast(`Éléments masqués ${isShowing ? 'affichés' : 'cachés'}`, 'info');
        });
    });
    
    // Toggle pour masquer/démasquer les éléments sélectionnés
    document.getElementById('mobile-mask-toggle')?.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        const isMasking = this.classList.contains('active');
        
        if (appData.selectedItems.length > 0) {
            appData.selectedItems.forEach(itemName => {
                toggleItemMask(itemName);
            });
            showToast(`${appData.selectedItems.length} éléments ${isMasking ? 'masqués' : 'démasqués'}`, 'success');
            updateContent();
        } else {
            showToast('Veuillez sélectionner des éléments à masquer', 'info');
        }
    });
    
    document.getElementById('desktop-mask-toggle')?.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        const isMasking = this.classList.contains('active');
        
        if (appData.selectedItems.length > 0) {
            appData.selectedItems.forEach(itemName => {
                toggleItemMask(itemName);
            });
            showToast(`${appData.selectedItems.length} éléments ${isMasking ? 'masqués' : 'démasqués'}`, 'success');
            updateContent();
        } else {
            showToast('Veuillez sélectionner des éléments à masquer', 'info');
        }
    });
    
    document.getElementById('selection-mask-toggle')?.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        const isMasking = this.classList.contains('active');
        
        if (appData.selectedItems.length > 0) {
            appData.selectedItems.forEach(itemName => {
                toggleItemMask(itemName);
            });
            showToast(`${appData.selectedItems.length} éléments ${isMasking ? 'masqués' : 'démasqués'}`, 'success');
            updateContent();
            toggleSelectionMode(false);
        }
    });
}

// Fonction pour rafraîchir les données depuis Supabase
async function refreshDataFromSupabase() {
    if (!supabaseAvailable) return;
    
    try {
        // Obtenir le chemin actuel pour identifier le dossier
        const currentPath = appData.currentPath;
        
        // Si nous sommes dans un dossier spécifique dans Storage
        if (currentPath.length >= 2 && currentPath[0] === 'Home' && currentPath[1] === 'Storage') {
            // Construire le chemin du dossier parent
            const parentPath = currentPath.slice(0, -1);
            const folderName = currentPath[currentPath.length - 1];
            
            // Récupérer les informations à jour du dossier actuel
            const { data: folderData, error: folderError } = await supabase
                .from('folders')
                .select('*')
                .eq('name', folderName)
                .eq('parent_path', JSON.stringify(parentPath))
                .single();
                
            if (folderError) {
                console.error('Erreur lors de la récupération des données du dossier:', folderError);
            } else if (folderData) {
                // Mettre à jour les données locales si nécessaire
                const currentFolder = getCurrentFolder();
                if (currentFolder._id !== folderData.id) {
                    currentFolder._id = folderData.id;
                }
                
                // Récupérer les applications de ce dossier
                const { data: appsData, error: appsError } = await supabase
                    .from('apps')
                    .select('*')
                    .eq('folder_id', folderData.id);
                    
                if (appsError) {
                    console.error('Erreur lors de la récupération des applications:', appsError);
                } else if (appsData) {
                    // Synchroniser les applications si nécessaire
                    console.log('Applications récupérées:', appsData);
                }
            }
        }
    } catch (error) {
        console.error('Exception lors du rafraîchissement des données:', error);
    }
}

// Fonction pour charger les dossiers depuis Supabase
async function loadFoldersFromSupabase() {
    if (!supabaseAvailable) {
        console.log('Supabase n\'est pas disponible, chargement des dossiers ignoré');
        return;
    }
    
    try {
        showToast('Chargement des dossiers...', 'info');
        
        // Charger tous les dossiers
        const { data: folders, error: foldersError } = await supabase
            .from('folders')
            .select('*')
            .order('created_at', { ascending: true });
            
        if (foldersError) {
            console.error('Erreur lors du chargement des dossiers:', foldersError);
            showToast('Erreur lors du chargement des dossiers', 'error');
            return;
        }
        
        // Charger toutes les applications
        const { data: apps, error: appsError } = await supabase
            .from('apps')
            .select('*')
            .order('created_at', { ascending: true });
            
        if (appsError) {
            console.error('Erreur lors du chargement des applications:', appsError);
            showToast('Erreur lors du chargement des applications', 'error');
            return;
        }
        
        // Créer les dossiers dans la structure locale
        folders.forEach(folder => {
            let currentNode = fileSystem;
            const parentPath = Array.isArray(folder.parent_path) ? folder.parent_path : JSON.parse(folder.parent_path);
            
            // Naviguer jusqu'au dossier parent
            for (const pathItem of parentPath) {
                if (currentNode.items && currentNode.items[pathItem]) {
                    currentNode = currentNode.items[pathItem];
                } else if (currentNode[pathItem]) {
                    currentNode = currentNode[pathItem];
                } else {
                    console.error(`Chemin parent non trouvé: ${pathItem} dans ${parentPath}`);
                    return;
                }
            }
            
            // Créer le dossier s'il n'existe pas déjà
            if (!currentNode.items[folder.name]) {
                currentNode.items[folder.name] = {
                    type: 'folder',
                    items: {},
                    _id: folder.id // Stocker l'ID pour référence future
                };
                
                // Appliquer le masquage si nécessaire
                if (folder.is_masked) {
                    currentNode.items[folder.name].masked = true;
                }
            } else {
                // Mettre à jour l'ID si le dossier existe déjà
                currentNode.items[folder.name]._id = folder.id;
            }
        });
        
        // Ajouter les applications dans leurs dossiers respectifs
        apps.forEach(app => {
            // Trouver le dossier parent
            const folder = folders.find(f => f.id === app.folder_id);
            if (!folder) {
                console.error(`Dossier parent non trouvé pour l'application: ${app.name}`);
                return;
            }
            
            let currentNode = fileSystem;
            const parentPath = Array.isArray(folder.parent_path) ? folder.parent_path : JSON.parse(folder.parent_path);
            
            // Naviguer jusqu'au dossier parent
            for (const pathItem of parentPath) {
                if (currentNode.items && currentNode.items[pathItem]) {
                    currentNode = currentNode.items[pathItem];
                } else if (currentNode[pathItem]) {
                    currentNode = currentNode[pathItem];
                } else {
                    console.error(`Chemin parent non trouvé: ${pathItem} dans ${parentPath}`);
                    return;
                }
            }
            
            // Ajouter l'application au dossier
            if (currentNode.items && currentNode.items[folder.name]) {
                currentNode.items[folder.name].items[app.name] = {
                    type: 'app',
                    url: app.url,
                    _id: app.id // Stocker l'ID de l'application
                };
                
                // Appliquer le masquage si nécessaire
                if (app.is_masked) {
                    currentNode.items[folder.name].items[app.name].masked = true;
                }
            }
        });
        
        // Mettre à jour l'interface
        updateContent();
        showToast('Dossiers chargés avec succès', 'success');
        
    } catch (error) {
        console.error('Exception lors du chargement des dossiers:', error);
        showToast('Erreur lors du chargement des dossiers', 'error');
    }
}



// Fonction pour initialiser l'application principale - version modifiée complète
async function initializeMainApplication() {
    try {
        // Initialisation de l'application
        // Désactiver tous les éléments actifs du sidebar
        document.querySelectorAll('.sidebar-item.active').forEach(item => {
            item.classList.remove('active');
        });

        // S'assurer que nous commençons avec le Home
        appData.currentPath = ['Home'];
        updatePaths();
        
        // Activer l'onglet Home par défaut dans le header
        document.querySelectorAll('.header-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-content') === 'home') {
                item.classList.add('active');
            }
        });
        
        // Initialiser la navigation du header
        initializeHeaderNavigation();
        
        // Charger les dossiers depuis Supabase
        if (supabaseAvailable) {
            await loadFoldersFromSupabase();
        }
        
        // Mettre à jour l'interface
        updateContent();
        
        // Initialiser les toggle switches
        initializeToggleSwitches();
        
        // Marquer l'application comme initialisée
        appInitialized = true;
        
        // Si déjà authentifié mais pas encore transitionné, faire la transition
        if (authenticationCompleted && !document.getElementById('app-section').classList.contains('visible')) {
            AppTransitionManager.switchToApp();
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'application :', error);
    }
}



        
        // Initialiser l'application
        initializeMainApplication();

// Initialisation de la barre d'ajout rapide
function initializeQuickAddNav() {
    const quickAddNav = document.querySelector('.quick-add-nav');
    const quickAddContainer = document.querySelector('.quick-add-container');
    const quickAddInput = document.querySelector('.quick-add-input');
    const linkIcon = document.querySelector('.fa-link.quick-add-icon');
    const noteIcon = document.querySelector('.fa-sticky-note.quick-add-icon');
    
    // Focus sur l'input quand on clique sur le container
    quickAddContainer.addEventListener('click', function() {
        quickAddInput.focus();
    });
    
    // Activer l'apparence quand l'input est en focus
    quickAddInput.addEventListener('focus', function() {
        quickAddNav.classList.add('active');
        quickAddContainer.classList.add('active');
    });
    
    // Désactiver l'apparence quand l'input perd le focus
    quickAddInput.addEventListener('blur', function() {
        quickAddNav.classList.remove('active');
        quickAddContainer.classList.remove('active');
    });
    
    // Traiter le lien ou la note quand on appuie sur Entrée
    quickAddInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && quickAddInput.value.trim() !== '') {
            const inputValue = quickAddInput.value.trim();
            
            // Vider l'input après traitement
            quickAddInput.value = '';
            
            // Afficher un toast pour confirmer
            showToast('Contenu ajouté avec succès', 'success');
        }
    });
    
    // Actions spécifiques quand on clique sur les icônes
    linkIcon.addEventListener('click', function() {
        if (quickAddInput.value.trim() !== '') {
            // Traiter comme un lien
            const inputValue = quickAddInput.value.trim();
            quickAddInput.value = '';
            showToast('Lien ajouté avec succès', 'success');
        } else {
            quickAddInput.focus();
            quickAddInput.setAttribute('placeholder', 'Collez un lien pour l\'ajouter à la collection...');
        }
    });
    
    noteIcon.addEventListener('click', function() {
        if (quickAddInput.value.trim() !== '') {
            // Traiter comme une note
            const inputValue = quickAddInput.value.trim();
            quickAddInput.value = '';
            showToast('Note créée avec succès', 'success');
        } else {
            quickAddInput.focus();
            quickAddInput.setAttribute('placeholder', 'Écrivez votre note ici...');
        }
    });
}

// Appeler l'initialisation de la barre d'ajout rapide
initializeQuickAddNav();

});
})();
/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 02
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 03
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 04
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 05
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 06
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 07
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 08
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 09
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 10
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 11
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 12
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 13
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 14
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 15
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 16
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 17
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 18
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 19
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 20
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 21
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 22
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 23
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 24
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 25
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 26
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 27
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 28
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 29
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */

/* ┏━🕷️━━━━━━━━━━━━━━━━━━━━━┓
   Js - VERSION 30
┗━━━━━━━━━━━━━━━━━━━━━🕸️━┛ */