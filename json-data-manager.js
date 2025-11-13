/**
 * JSON Data Manager - Hybrid System
 * Loads data from JSON files (visible to everyone)
 * Falls back to localStorage (personal data)
 * Generates JSON files from localStorage
 */

(function() {
    'use strict';
    
    const JSON_DATA_MANAGER = {
        // Data cache
        cache: {
            posts: null,
            schedule: null,
            creators: null
        },
        
        // Check if JSON files exist and load them
        async loadFromJSON(type) {
            const fileMap = {
                posts: 'data/posts.json',
                schedule: 'data/schedule.json',
                creators: 'data/creators.json'
            };
            
            try {
                const response = await fetch(fileMap[type]);
                if (response.ok) {
                    const data = await response.json();
                    this.cache[type] = data;
                    console.log(`✅ Loaded ${type} from JSON file (${data.length} items)`);
                    return data;
                }
            } catch (error) {
                console.log(`⚠️ No JSON file for ${type}, using localStorage`);
            }
            
            return null;
        },
        
        // Load from localStorage
        loadFromLocalStorage(type) {
            const keyMap = {
                posts: 'tadb_posts',
                schedule: 'tadb_schedule',
                creators: 'tadb_creators'
            };
            
            try {
                const data = localStorage.getItem(keyMap[type]);
                if (data) {
                    const parsed = JSON.parse(data);
                    console.log(`📦 Loaded ${type} from localStorage (${parsed.length} items)`);
                    return parsed;
                }
            } catch (error) {
                console.error(`Error loading ${type} from localStorage:`, error);
            }
            
            return [];
        },
        
        // Get data (JSON first, then localStorage)
        async getData(type) {
            // Check cache first
            if (this.cache[type] !== null) {
                return this.cache[type];
            }
            
            // Try JSON file first
            const jsonData = await this.loadFromJSON(type);
            if (jsonData !== null) {
                return jsonData;
            }
            
            // Fall back to localStorage
            const localData = this.loadFromLocalStorage(type);
            this.cache[type] = localData;
            return localData;
        },
        
        // Generate JSON files from localStorage
        generateJSONFiles() {
            const data = {
                posts: this.loadFromLocalStorage('posts'),
                schedule: this.loadFromLocalStorage('schedule'),
                creators: this.loadFromLocalStorage('creators')
            };
            
            // Create downloadable files
            const files = [];
            
            Object.keys(data).forEach(type => {
                const jsonStr = JSON.stringify(data[type], null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                files.push({
                    type: type,
                    url: url,
                    filename: `${type}.json`,
                    size: jsonStr.length
                });
            });
            
            return files;
        },
        
        // Download all JSON files
        downloadJSONFiles() {
            const files = this.generateJSONFiles();
            
            files.forEach((file, index) => {
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = file.url;
                    link.download = file.filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(file.url);
                }, index * 500); // Stagger downloads
            });
            
            return files;
        },
        
        // Get statistics
        async getStats() {
            const posts = await this.getData('posts');
            const schedule = await this.getData('schedule');
            const creators = await this.getData('creators');
            
            return {
                posts: posts.length,
                schedule: schedule.length,
                creators: creators.length,
                total: posts.length + schedule.length + creators.length
            };
        }
    };
    
    // Make it globally available
    window.jsonDataManager = JSON_DATA_MANAGER;
    
    console.log('📊 JSON Data Manager initialized');
})();
