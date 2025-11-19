// Site Notice System with Cookie Control
// Set NOTICE_VISIBILITY to 'visible' or 'none' to control display

const SITE_NOTICE_CONFIG = {
    // Change this to 'visible' or 'none' to show/hide notice
    visibility: 'visible', // 'visible' or 'none'
    
    // Notice content
    title: '🚧 Website Under Development',
    message: 'We are currently adding content to TADB. Phase 1 (50 anime titles) is complete. Phase 2 with more content is coming soon!',
    progress: 30, // Percentage complete
    
    // Styling
    position: 'bottom', // 'top' or 'bottom'
    theme: 'blue' // 'blue', 'orange', 'green', 'purple'
};

// Cookie functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Show notice if visibility is 'visible' and user hasn't dismissed it
function showSiteNotice() {
    // Check if visibility is set to 'none'
    if (SITE_NOTICE_CONFIG.visibility === 'none') {
        console.log('📢 Site notice is disabled (visibility: none)');
        return;
    }
    
    // Check if user has dismissed the notice
    if (getCookie('site_notice_dismissed') === 'true') {
        console.log('📢 Site notice already dismissed by user');
        return;
    }
    
    // Create notice HTML
    const noticeHTML = `
        <div class="site-notice-overlay" id="siteNoticeOverlay">
            <div class="site-notice-box ${SITE_NOTICE_CONFIG.theme}">
                <button class="notice-close-btn" onclick="dismissSiteNotice()">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="notice-icon">
                    <i class="fas fa-info-circle"></i>
                </div>
                
                <div class="notice-content">
                    <h3 class="notice-title">${SITE_NOTICE_CONFIG.title}</h3>
                    <p class="notice-message">${SITE_NOTICE_CONFIG.message}</p>
                    
                    <div class="notice-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${SITE_NOTICE_CONFIG.progress}%">
                                <span class="progress-text">${SITE_NOTICE_CONFIG.progress}% Complete</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="notice-actions">
                        <button class="notice-btn primary" onclick="dismissSiteNotice()">
                            <i class="fas fa-check"></i>
                            Got it!
                        </button>
                        <button class="notice-btn secondary" onclick="dismissSiteNotice(30)">
                            <i class="fas fa-clock"></i>
                            Remind me later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.insertAdjacentHTML('beforeend', noticeHTML);
    
    // Animate in
    setTimeout(() => {
        const overlay = document.getElementById('siteNoticeOverlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }, 500);
    
    console.log('📢 Site notice displayed');
}

// Dismiss notice
function dismissSiteNotice(days = 365) {
    const overlay = document.getElementById('siteNoticeOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
    
    // Set cookie
    setCookie('site_notice_dismissed', 'true', days);
    console.log(`📢 Site notice dismissed for ${days} days`);
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showSiteNotice);
} else {
    showSiteNotice();
}

console.log('✅ Site Notice System loaded (Visibility:', SITE_NOTICE_CONFIG.visibility + ')');
