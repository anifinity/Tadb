// Content Creators Page - Complete Dynamic Rendering (Like Post Editor)
// All content loaded from localStorage via creators-manager.js

let creatorsData = [];
let currentCreatorIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Content Creators Script Loading...');
    
    // Load creators from localStorage
    if (window.creatorsManager) {
        creatorsData = window.creatorsManager.getAllCreators();
        console.log('✅ Loaded', creatorsData.length, 'creators from localStorage');
    } else {
        console.error('❌ creators-manager.js not loaded!');
        return;
    }
    
    // Render everything dynamically
    renderCreatorButtons();
    renderCreatorProfiles();
    setupEventListeners();
    
    console.log('✅ Content Creators Page Fully Loaded');
});

// Render Creator Buttons Dynamically
function renderCreatorButtons() {
    const buttonsContainer = document.getElementById('creatorButtons');
    if (!buttonsContainer) {
        console.error('❌ Creator buttons container not found');
        return;
    }
    
    buttonsContainer.innerHTML = creatorsData.map((creator, index) => `
        <button class="creator-btn ${index === 0 ? 'active' : ''}" data-creator="${creator.dataCreator}" data-index="${index}">
            ${creator.name}
        </button>
    `).join('');
    
    console.log('✅ Rendered', creatorsData.length, 'creator buttons');
}

// Render All Creator Profiles Dynamically
function renderCreatorProfiles() {
    const profilesContainer = document.getElementById('creatorProfilesContainer');
    if (!profilesContainer) {
        console.error('❌ Creator profiles container not found');
        return;
    }
    
    // Debug: Log each creator's data
    creatorsData.forEach(creator => {
        console.log(`Creator: ${creator.name}`);
        console.log('  - Suggested Animes:', creator.suggestedAnimes?.length || 0);
        console.log('  - Latest Videos:', creator.latestVideos?.length || 0);
    });
    
    profilesContainer.innerHTML = creatorsData.map((creator, index) => 
        createCreatorProfileHTML(creator, index === 0)
    ).join('');
    
    console.log('✅ Rendered', creatorsData.length, 'creator profiles');
}

// Create HTML for Single Creator Profile
function createCreatorProfileHTML(creator, isActive) {
    const badgeIcon = getBadgeIcon(creator.badge);
    
    return `
        <div class="creator-profile ${isActive ? 'active' : ''}" id="${creator.dataCreator}">
            <!-- Creator Card -->
            <div class="creator-card ${isActive ? 'featured-card' : ''}">
                <div class="creator-avatar">
                    <img src="${creator.avatar}" alt="${creator.name}">
                    ${creator.badge ? `
                        <div class="creator-badge">
                            <i class="${badgeIcon}"></i>
                            <span>${creator.badge}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="creator-info">
                    <h3 class="creator-name">${creator.name}</h3>
                    <p class="creator-role">${creator.role}</p>
                    ${creator.bio ? `<p class="creator-description">${creator.bio}</p>` : ''}
                    
                    <!-- Stats -->
                    ${creator.stats ? `
                        <div class="creator-stats">
                            ${creator.stats.totalProjects ? `
                                <div class="stat-item">
                                    <span class="stat-number">${creator.stats.totalProjects}</span>
                                    <span class="stat-label">Videos</span>
                                </div>
                            ` : ''}
                            ${creator.stats.totalViews ? `
                                <div class="stat-item">
                                    <span class="stat-number">${creator.stats.totalViews}</span>
                                    <span class="stat-label">Views</span>
                                </div>
                            ` : ''}
                            ${creator.stats.subscribers ? `
                                <div class="stat-item">
                                    <span class="stat-number">${creator.stats.subscribers}</span>
                                    <span class="stat-label">Subscribers</span>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    
                    <!-- Social Links -->
                    ${creator.socialLinks && (creator.socialLinks.youtube || creator.socialLinks.instagram || creator.socialLinks.twitter) ? `
                        <div class="creator-social">
                            ${creator.socialLinks.youtube ? `
                                <a href="${creator.socialLinks.youtube}" target="_blank" class="social-btn youtube" title="YouTube">
                                    <i class="fab fa-youtube"></i>
                                </a>
                            ` : ''}
                            ${creator.socialLinks.instagram ? `
                                <a href="${creator.socialLinks.instagram}" target="_blank" class="social-btn instagram" title="Instagram">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            ` : ''}
                            ${creator.socialLinks.twitter ? `
                                <a href="${creator.socialLinks.twitter}" target="_blank" class="social-btn twitter" title="Twitter">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            ` : ''}
                            ${creator.socialLinks.facebook ? `
                                <a href="${creator.socialLinks.facebook}" target="_blank" class="social-btn facebook" title="Facebook">
                                    <i class="fab fa-facebook"></i>
                                </a>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- Suggested Animes Section -->
            ${creator.suggestedAnimes && creator.suggestedAnimes.length > 0 ? `
                <div class="creator-content-section">
                    <h4 class="content-section-title">
                        <i class="fas fa-film"></i> Suggested Anime by ${creator.name}
                    </h4>
                    <div class="ratings-list">
                        ${creator.suggestedAnimes.map((anime, index) => `
                            <div class="ranking-item" style="background-image: url('${anime.poster}');">
                                <div class="rank-number">${index + 1}</div>
                                <div class="anime-title-section">
                                    <h3 class="anime-title">${anime.title}</h3>
                                </div>
                                ${anime.rating ? `
                                    <div class="imdb-rating-box">
                                        <div class="rating-text">${anime.rating}</div>
                                        <div class="imdb-logo">IMDb</div>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <!-- Latest Videos Section -->
            ${creator.latestVideos && creator.latestVideos.length > 0 ? `
                <div class="creator-content-section">
                    <h4 class="content-section-title">
                        <i class="fas fa-video"></i> Latest Videos by ${creator.name}
                    </h4>
                    <div class="videos-grid">
                        ${creator.latestVideos.map(video => `
                            <div class="video-card" onclick="openVideoModal('${video.videoId}', '${escapeQuotes(video.title)}')">
                                <div class="video-thumbnail">
                                    <img src="https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg" alt="${video.title}" onerror="this.src='https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg'">
                                    <div class="video-play-overlay">
                                        <i class="fas fa-play-circle"></i>
                                    </div>
                                    <div class="video-views-badge">
                                        <i class="fas fa-eye"></i> ${video.views}
                                    </div>
                                </div>
                                <div class="video-info">
                                    <h3 class="video-title">${video.title}</h3>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Get Badge Icon Based on Badge Text
function getBadgeIcon(badge) {
    const iconMap = {
        'Founder': 'fas fa-crown',
        'Channel': 'fas fa-play',
        'Artist': 'fas fa-brush',
        'Designer': 'fas fa-pencil-alt',
        'Studio': 'fas fa-building'
    };
    return iconMap[badge] || 'fas fa-star';
}

// Escape quotes for HTML attributes
function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Setup Event Listeners
function setupEventListeners() {
    // Creator button clicks
    const creatorBtns = document.querySelectorAll('.creator-btn');
    creatorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCreator = btn.getAttribute('data-creator');
            const index = parseInt(btn.getAttribute('data-index'));
            switchCreator(targetCreator, index);
        });
    });
    
    // Search functionality
    const searchToggle = document.getElementById('searchToggle');
    const searchBox = document.getElementById('searchBox');
    
    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', () => {
            searchBox.classList.toggle('active');
            searchToggle.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!searchToggle.contains(e.target) && !searchBox.contains(e.target)) {
                searchBox.classList.remove('active');
                searchToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Intersection Observer for animations
    setupAnimations();
}

// Switch Between Creators
function switchCreator(targetCreator, index) {
    // Update buttons
    document.querySelectorAll('.creator-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-creator="${targetCreator}"]`).classList.add('active');
    
    // Update profiles
    document.querySelectorAll('.creator-profile').forEach(profile => profile.classList.remove('active'));
    document.getElementById(targetCreator).classList.add('active');
    
    currentCreatorIndex = index;
    console.log('Switched to creator:', targetCreator);
}

// Setup Animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe anime and video cards
    document.querySelectorAll('.anime-card-box, .video-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Utility Functions
function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return duration;
    
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) {
        return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.padStart(2, '0')}`;
}

function formatViewCount(count) {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
}

function timeAgo(date) {
    const now = new Date();
    const diffTime = Math.abs(now - new Date(date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    }
    if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return months === 1 ? '1 month ago' : `${months} months ago`;
    }
    const years = Math.floor(diffDays / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
}


// Video Modal Functions
function openVideoModal(videoId, title) {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const modalTitle = document.getElementById('modalVideoTitle');
    
    if (modal && videoPlayer && modalTitle) {
        // Set video title
        modalTitle.textContent = title;
        
        // Set video source with autoplay
        videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        console.log('✅ Opened video modal:', title);
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (modal && videoPlayer) {
        // Stop video by clearing source
        videoPlayer.src = '';
        
        // Hide modal
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        console.log('✅ Closed video modal');
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
});
