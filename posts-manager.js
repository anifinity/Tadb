// Central Posts Management System
// This file manages all posts for both index.html and post.html
// Supports both JSON files (public) and localStorage (personal)

class PostsManager {
    constructor() {
        this.storageKey = 'tadb_posts';
        this.jsonFile = 'data/posts.json';
        this.postsCache = null;
        this.jsonLoaded = false;
        this.init();
    }

    async init() {
        // Try to load from JSON file first
        await this.loadFromJSON();
        
        // Initialize with default posts if no data
        if (!this.getAllPosts().length) {
            this.initializeDefaultPosts();
        }
    }

    // Load posts from JSON file (public data)
    async loadFromJSON() {
        try {
            const response = await fetch(this.jsonFile);
            if (response.ok) {
                const posts = await response.json();
                if (posts && posts.length > 0) {
                    this.postsCache = posts;
                    this.jsonLoaded = true;
                    console.log(`✅ Loaded ${posts.length} posts from JSON file`);
                    return posts;
                }
            }
        } catch (error) {
            console.log('⚠️ No JSON file found, using localStorage');
        }
        return null;
    }

    // Get all posts (JSON first, then localStorage)
    getAllPosts() {
        // If JSON was loaded, use that
        if (this.jsonLoaded && this.postsCache) {
            return this.postsCache;
        }
        
        // Otherwise use localStorage
        try {
            const posts = localStorage.getItem(this.storageKey);
            return posts ? JSON.parse(posts) : [];
        } catch (error) {
            console.error('Error loading posts:', error);
            return [];
        }
    }

    // Save all posts to localStorage
    savePosts(posts) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(posts));
            return true;
        } catch (error) {
            console.error('Error saving posts:', error);
            return false;
        }
    }

    // Get single post by ID
    getPostById(id) {
        const posts = this.getAllPosts();
        return posts.find(post => post.id === parseInt(id));
    }

    // Add or update a post
    savePost(postData) {
        const posts = this.getAllPosts();
        const existingIndex = posts.findIndex(p => p.id === postData.id);

        if (existingIndex >= 0) {
            // Update existing post
            posts[existingIndex] = { ...posts[existingIndex], ...postData };
        } else {
            // Add new post with auto-generated ID
            const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
            postData.id = newId;
            posts.push(postData);
        }

        return this.savePosts(posts);
    }

    // Delete a post
    deletePost(id) {
        const posts = this.getAllPosts();
        const filteredPosts = posts.filter(p => p.id !== parseInt(id));
        return this.savePosts(filteredPosts);
    }

    // Initialize with default posts
    initializeDefaultPosts() {
        const defaultPosts = [
            {
                id: 1,
                title: "Zenshu",
                year: "2025",
                season: "Season 1",
                poster: "https://blogger.googleusercontent.com/img/a/AVvXsEgnFAm3R_lG6USF7JA83Zh6J1lhOruxA9UuggmHeMZueaN-HlY0PmZobkDTddr20-ADoXgiw1a5t2rPNdrsz8TMqXDmLkv_blqm96L7yVgEnoF6vq3skLqyJX3ymxGlCCua85uAm9vknrsdMQUKVZ4_MvnpBavqYLIBE9-4TSvVzdVo4-TelzqlGvhdpxk=s16000",
                categories: ["Action", "Adventure", "Drama"],
                labels: ["Popular", "Telugu Dub"],
                airSeason: "Summer",
                // Detailed data
                rating: "6.8",
                ageRating: "PG-13",
                duration: "23 min",
                totalEpisodes: "12",
                backdrop: "https://m.media-amazon.com/images/S/pv-target-images/38fb4aa27144f3bd4ebfa1c7daec3709e0482dae8723a40e0f8b13d1cbe5b8bd.jpg",
                genres: "Fantasy, Isekai, Workplace",
                synopsis: "After graduating from high school, Natsuko Hirose starts her career as an animator. Her talent quickly flourishes, and she makes her debut as a director in no time. Her first anime becomes a massive hit, sparking a social phenomenon and earning her recognition as an up-and-coming genius director. Her next project is set to be a romantic comedy movie themed around first love! However, having never been in love herself, Natsuko struggles to understand the concept of first love, and as a result, she's unable to create the storyboard, causing the movie production to come to a standstill. One day, she passes out while working on her storyboard and wakes up in the world of her favorite childhood anime movie A Tale of Perishing.",
                studio: "Mappa",
                format: "Season 01",
                premiereDate: "Released on 2025",
                status: "Completed",
                broadcast: "OTT (Crunchyroll)",
                language: "Telugu Dub Available",
                statistics: {
                    rating: "6.9",
                    likedPercentage: "94%",
                    totalViews: "4.2M"
                },
                crew: [
                    {
                        name: "Govardiniprakash",
                        role: "Script Writer",
                        avatar: "https://blogger.googleusercontent.com/img/a/AVvXsEgqSAoFrLipdqwCxIPX5XlfrVUdkzLsUgLP2kBrKm0WmYZ4cR24RnY1jVcg_bwtmC_TSHZYaBtBqDQsmy02kDdQAjYv2iC51E__lTKzvMkh9Sj64_wrPot2URldD5C5oCZDdY368nc0punGcbwdXDgaNAGA9cYhwlfTnlFcjNWbFQ7p_Qcz5o4H3yAbsUU=s16000",
                        projectImage: "https://i.pinimg.com/736x/a1/45/54/a14554b65d4c6974257e19bcc6242e84.jpg"
                    }
                ],
                platforms: [
                    { name: "Crunchyroll", status: "Available", icon: "https://logos-marcas.com/wp-content/uploads/2021/03/Crunchyroll-Logotipo-2012-presente.jpg" }
                ],
                trailers: [
                    {
                        title: "Official Trailer",
                        description: "Zenshu Telugu Trailer",
                        thumbnail: "https://image.tmdb.org/t/p/original/5CQYgKT7P3uArdazN7GhBCwW0zn.jpg",
                        videoId: "X50zZ73VNPQ"
                    },
                    {
                        title: "Trailer 02",
                        description: "Zenshu Telugu Trailer 02",
                        thumbnail: "https://www.animeclick.it/immagini/anime/ZENSHU/gallery_original/ZENSHU-677b116095780.jpg",
                        videoId: "77P_4W7vjOc"
                    },
                    {
                        title: "Trailer 03",
                        description: "Zenshu Telugu Trailer 03",
                        thumbnail: "https://finalweapon.net/wp-content/uploads/2024/03/Zenshu-Anime-Announced-by-MAPPA.jpg",
                        videoId: "IIL0JHhaT0s"
                    }
                ],
                mrp: "Visible"
            },
            {
                id: 2,
                title: "DanDaDan",
                year: "2024",
                season: "Season 1",
                poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7xLFElqSEYG5ykrx82TfqmYLjpkVckixcvaNoWpqzO-z-HuIiP1_dYBERLfYEyMU7ZPehuQuj-UWOWHanmA3_ll683gz7_5caehDcvn2VMsGlnO1ED83UYI03zz3G-VCYZlVRigWDq221ls5SW2AVPqkkyqDrd3gQX2n9F5QLMKUFvDUKQ9ca5a0QQfY/s16000/dandadan.jpg",
                categories: ["Action", "Adventure", "Comedy"],
                labels: ["Crunchyroll", "Free"],
                airSeason: "Summer",
                rating: "8.3",
                ageRating: "PG-18",
                duration: "24 min",
                totalEpisodes: "12",
                backdrop: "https://epicflix.com/img/containers/assets/dandadan.png/9c76cbca39a69c1bacc44e8b22169cdb.png",
                genres: "Action, Adventure, Comedy",
                synopsis: "Zenshu – Season 1 is a supernatural action-fantasy anime that follows a young boy who unknowingly awakens an ancient guardian spirit tied to his bloodline, setting off a chain of mystical events that threaten both the human and spirit worlds. As dark entities rise, Zenshu must learn to control his hidden powers and uncover the secrets of his family's past, all while protecting his friends and facing the destiny he never asked for. Blending heartfelt emotion, high-octane battles, and striking visuals, the series explores courage, friendship, and the true meaning of power — leaving one haunting question: Was this power ever truly his?",
                studio: "Science SARU",
                format: "Season 01",
                premiereDate: "Released on 2024",
                status: "Completed",
                broadcast: "OTT (Crunchyroll)",
                language: "Telugu Dub Available",
                statistics: {
                    rating: "8.3",
                    likedPercentage: "85%",
                    totalViews: "2.1M"
                },
                cast: [
                    {
                        actorName: "Sai Sujith",
                        characterName: "Okarun",
                        actorImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwALrO96FUcdMYrVONs7MYHgDAHXUE-g-6YgKSUx2tSltG_77AcOyuyravuihg1H8fKn86vbmk2CE9Y85GiE2mEwa6V597tH74Aq2kd0eNIEL1Ka9-OMtbhDR6Iq_NQEIUOEwg7IUuSX-0-uw2SmWIZ9x9b1-u6fwsQ0_8U5gDCxfwQ8MXxPKonx4KT6I/s16000/Uncle%20look%20Vandhuducho%20%F0%9F%98%90.jpg",
                        characterImage: "https://i.pinimg.com/1200x/89/4c/ff/894cffe0e261788602d578e86b12e532.jpg"
                    },
                    {
                        actorName: "Govardiniprakash",
                        characterName: "Momo Ayase",
                        actorImage: "https://blogger.googleusercontent.com/img/a/AVvXsEgqSAoFrLipdqwCxIPX5XlfrVUdkzLsUgLP2kBrKm0WmYZ4cR24RnY1jVcg_bwtmC_TSHZYaBtBqDQsmy02kDdQAjYv2iC51E__lTKzvMkh9Sj64_wrPot2URldD5C5oCZDdY368nc0punGcbwdXDgaNAGA9cYhwlfTnlFcjNWbFQ7p_Qcz5o4H3yAbsUU=s16000",
                        characterImage: "https://i.pinimg.com/736x/2d/7d/4b/2d7d4b9971a3fb5794ed0cd2391e67eb.jpg"
                    }
                ],
                crew: [
                    {
                        name: "Govardiniprakash",
                        role: "Script Writer",
                        avatar: "https://blogger.googleusercontent.com/img/a/AVvXsEgqSAoFrLipdqwCxIPX5XlfrVUdkzLsUgLP2kBrKm0WmYZ4cR24RnY1jVcg_bwtmC_TSHZYaBtBqDQsmy02kDdQAjYv2iC51E__lTKzvMkh9Sj64_wrPot2URldD5C5oCZDdY368nc0punGcbwdXDgaNAGA9cYhwlfTnlFcjNWbFQ7p_Qcz5o4H3yAbsUU=s16000",
                        projectImage: "https://i.pinimg.com/736x/61/da/4b/61da4b8bc214fa53da718e8355af0e85.jpg"
                    }
                ],
                platforms: [
                    { name: "Crunchyroll", status: "Available", icon: "https://logos-marcas.com/wp-content/uploads/2021/03/Crunchyroll-Logotipo-2012-presente.jpg" }
                ],
                trailers: [
                    {
                        title: "Official Trailer",
                        description: "Dandadan Trailer",
                        thumbnail: "https://epicflix.com/img/containers/assets/dandadan.png/9c76cbca39a69c1bacc44e8b22169cdb.png",
                        videoId: "Jl_L50tDZ7Q"
                    }
                ],
                mrp: "none"
            }
        ];

        this.savePosts(defaultPosts);
    }

    // Get posts for index page (simplified format)
    getIndexPosts() {
        return this.getAllPosts().map(post => ({
            id: post.id,
            title: post.title,
            year: post.year,
            season: post.season,
            poster: post.poster,
            categories: post.categories || [],
            labels: post.labels || [],
            airSeason: post.airSeason || "Unknown"
        }));
    }

    // Get detailed post data for post page
    getDetailedPost(id) {
        return this.getPostById(id);
    }
}

// Create global instance
window.postsManager = new PostsManager();
