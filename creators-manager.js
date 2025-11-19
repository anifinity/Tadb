// Content Creators Manager - TADB
// Manages content creators data

class CreatorsManager {
    constructor() {
        this.creators = [];
        this.init();
    }

    init() {
        // Load creators from CREATORS_DATA
        if (window.CREATORS_DATA && Array.isArray(window.CREATORS_DATA)) {
            this.creators = window.CREATORS_DATA;
            console.log(`✅ Loaded ${this.creators.length} creators from creators-data.js`);
        } else {
            console.warn('⚠️ No creators data found in creators-data.js');
            this.creators = [];
        }
    }

    // Get all creators
    getAllCreators() {
        return this.creators;
    }

    // Get creator by ID
    getCreatorById(id) {
        return this.creators.find(creator => creator.id === parseInt(id));
    }

    // Get creator by data-creator attribute
    getCreatorByDataCreator(dataCreator) {
        return this.creators.find(creator => creator.dataCreator === dataCreator);
    }

    // Search creators
    searchCreators(query) {
        const searchQuery = query.toLowerCase();
        return this.creators.filter(creator => {
            return creator.name.toLowerCase().includes(searchQuery) ||
                   creator.role.toLowerCase().includes(searchQuery) ||
                   creator.bio.toLowerCase().includes(searchQuery);
        });
    }

    // Get total creators count
    getTotalCreators() {
        return this.creators.length;
    }

    // Get total projects across all creators
    getTotalProjects() {
        return this.creators.reduce((total, creator) => {
            return total + (creator.stats?.totalProjects || 0);
        }, 0);
    }

    // Get total views across all creators
    getTotalViews() {
        let total = 0;
        this.creators.forEach(creator => {
            if (creator.stats?.totalViews) {
                const views = creator.stats.totalViews;
                // Convert string like "2.5M" to number
                if (typeof views === 'string') {
                    const num = parseFloat(views);
                    if (views.includes('M')) {
                        total += num * 1000000;
                    } else if (views.includes('K')) {
                        total += num * 1000;
                    } else {
                        total += num;
                    }
                } else {
                    total += views;
                }
            }
        });
        
        // Convert back to readable format
        if (total >= 1000000) {
            return (total / 1000000).toFixed(1) + 'M';
        } else if (total >= 1000) {
            return (total / 1000).toFixed(1) + 'K';
        }
        return total.toString();
    }
}

// Initialize global instance
let creatorsManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        creatorsManager = new CreatorsManager();
        window.creatorsManager = creatorsManager;
    });
} else {
    creatorsManager = new CreatorsManager();
    window.creatorsManager = creatorsManager;
}

// Export for use in other scripts
window.CreatorsManager = CreatorsManager;
