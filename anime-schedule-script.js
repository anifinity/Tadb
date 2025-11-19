/* ----------------- ANIME DATA ----------------- */
const upcomingAnime = [
    
    {
        title: "Spy x Family: Season 3",
        platform: "Crunchyroll",
        language: "Telugu",
        type: "Series",
        releaseDate: "2025-12-14T18:00:00",
        image: "https://static.animecorner.me/2023/12/1742465015-3b2948681ea4dd8a3754a3fb7a5025f8.jpg"
    },
    {
        title: "A Gatherer's Adventure in Isekai",
        platform: "Crunchyroll",
        language: "Telugu",
        type: "Series",
        releaseDate: "2025-12-15T18:00:00",
        image: "https://u.livechart.me/anime_visuals/local_version/13439/image/b6ec9a1ff9196bc4ab6413cffb24d2a2.webp/large.jpg"
    },
    {
        title: "One-Punch Man Season 3",
        platform: "Crunchyroll",
        language: "Telugu",
        type: "Series",
        releaseDate: "2025-12-22T18:00:00",
        image: "https://u.livechart.me/anime_visuals/local_version/15083/image/ddb1118fc352e9cafae3f75c3e92cf17.webp/large.jpg"
    }
];

const tvSchedule = [
    {
        title: "One Punch Man Season 3",
        platform: "SonyYAY",
        language: "Telugu",
        type: "TVShow",
        startDate: "2025-11-22T23:00:00",
        intervalDays: 1,
        totalEpisodes: 131,
        currentEpisode: 45,
        image: "https://flxt.tmsimg.com/assets/p12178386_b_v8_aa.jpg"
    }
    
    
    
];

const weeklyEpisodes = [
    {
        title: "Mechanical Marie",
        platform: "Crunchyroll",
        language: "Telugu",
        type: "Series",
        startDate: "2025-10-26T17:30:00",
        intervalDays: 7,
        totalEpisodes: 12,
        currentEpisode: 4,
        image: "https://u.livechart.me/anime_visuals/local_version/13905/image/e5cfa45268a85eea6f2f990fc788d589.webp/large.jpg"
    },
    {
        title: "Tojima Wants to Be a Kamen Rider",
        platform: "Crunchyroll",
        language: "Telugu",
        type: "Series",
        startDate: "2025-10-25T22:30:00",
        intervalDays: 7,
        totalEpisodes: 12,
        currentEpisode: 4,
        image: "https://u.livechart.me/anime_visuals/local_version/14555/image/55cc2aa1025d49562f75d0a4fb55ac94.webp/large.jpg"
    },
    {
        title: "My Status as an Assassin Obviously Exceeds the Hero's",
        platform: "Crunchyroll",
        language: "Telugu",
        type: "Series",
        startDate: "2025-10-06T22:30:00",
        intervalDays: 7,
        totalEpisodes: 12,
        currentEpisode: 1,
        image: "https://u.livechart.me/anime_visuals/local_version/14789/image/04dddb6153aa94912018f8e8c8094dc7.webp/large.jpg"
    },
    {
        title: "Let's Play Season 1",
        platform: "Crunchyroll",
        language: "Telugu",
        type: "Series",
        startDate: "2025-10-22T21:45:00",
        intervalDays: 7,
        totalEpisodes: 12,
        currentEpisode: 4,
        image: "https://u.livechart.me/anime_visuals/local_version/14152/image/49b18ac40a87ee4b71408610e3f449aa.webp/large.jpg"
    },
    {
        title: "A Wild Last Boss Appeared Season 1",
        platform: "Crunchyroll",
        language: "Telugu",
        type: "Series",
        startDate: "2025-10-18T19:30:00",
        intervalDays: 7,
        totalEpisodes: 12,
        currentEpisode: 4,
        image: "https://u.livechart.me/anime_visuals/local_version/11640/image/f227b392ac1de9d921a7e6953216c09f.webp/large.jpg"
    }
];

/* ----------------- DOM ELEMENTS ----------------- */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const themeToggle = document.getElementById('themeToggle');

/* ----------------- INITIALIZATION ----------------- */
document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    setupScrollEffects();
    initTabSwitching();

    renderUpcoming();
    renderWeekly();
    renderTvSchedule();
    updateCountdown();
    updateTabCounts();
    initTVUpdates();
});

/* ----------------- THEME MANAGEMENT ----------------- */
function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'default';
}

/* ----------------- RENDERING FUNCTIONS ----------------- */
function renderUpcoming() {
    const container = document.getElementById('upcoming-container');
    container.innerHTML = '';

    upcomingAnime.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('schedule-card');
        const releaseDate = new Date(anime.releaseDate);

        const dateStr = releaseDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        const timeStr = releaseDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        card.innerHTML = `
            <div class="card-top">
                <img src="${anime.image}" alt="${anime.title}">
                <div class="schedule-details">
                    <h3>${anime.title}</h3>
                    <div class="tags">
                        <span class="tag ${anime.platform}">${anime.platform}</span>
                        <span class="tag ${anime.language}">${anime.language}</span>
                        <span class="tag ${anime.type}">${anime.type}</span>
                    </div>
                    <div class="episode-date-time">
                        <span class="date-badge">📅 ${dateStr}</span>
                        <span class="time-badge">🕒 ${timeStr}</span>
                        <span class="status-badge">🔜 Upcoming</span>
                    </div>
                    <div class="release-time">Premiere Date</div>
                    <div class="countdown" data-date="${anime.releaseDate}"></div>
                    <div class="btn-row">
                        <button class="btn" onclick="setReminder('${anime.title}','${anime.releaseDate}')">Set Reminder</button>
                    </div>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

function renderTvSchedule() {
    const container = document.getElementById('tv-container');
    container.innerHTML = '';
    const now = new Date();

    tvSchedule.forEach(show => {
        const start = new Date(show.startDate);
        const daysPassed = Math.floor((now - start) / (1000 * 60 * 60 * 24 * show.intervalDays));
        let currentEpisode = show.currentEpisode + daysPassed;
        if (currentEpisode > show.totalEpisodes) currentEpisode = show.totalEpisodes;
        const nextEpNum = currentEpisode < show.totalEpisodes ? currentEpisode + 1 : null;
        const nextDate = nextEpNum ? new Date(start.getTime() + (currentEpisode) * show.intervalDays * 24 * 60 * 60 * 1000) : null;

        const card = document.createElement('div');
        card.classList.add('schedule-card');

        const nextDateStr = nextDate ? nextDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }) : '';

        const nextTimeStr = nextDate ? nextDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }) : '';

        card.innerHTML = `
            <div class="card-top">
                <img src="${show.image}" alt="${show.title}">
                <div class="schedule-details">
                    <h3>${show.title}</h3>
                    <div class="tags">
                        <span class="tag ${show.platform}">${show.platform}</span>
                        <span class="tag ${show.language}">${show.language}</span>
                        <span class="tag ${show.type}">${show.type}</span>
                    </div>
                    ${nextDate ? `
                        <div class="episode-date-time">
                            <span class="date-badge">📅 ${nextDateStr}</span>
                            <span class="time-badge">🕒 ${nextTimeStr}</span>
                            <span class="status-badge">📺 Daily</span>
                        </div>` : ''}
                    <div class="release-time">Episode ${currentEpisode} of ${show.totalEpisodes}</div>
                    ${nextEpNum ? `<div class="next-episode-label">Next Episode: Ep ${nextEpNum}</div>` : ''}
                    <div class="countdown" data-date="${nextDate ? nextDate.toISOString() : ''}">${nextDate ? '' : '✅ All Episodes Aired'}</div>
                    <div class="btn-row">
                        ${nextDate ? `<button class="btn" onclick="setReminder('${show.title} Ep ${nextEpNum}','${nextDate.toISOString()}')">Set Reminder</button>` : ''}
                    </div>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

function renderWeekly() {
    const container = document.getElementById('weekly-container');
    container.innerHTML = '';
    const now = new Date();

    weeklyEpisodes.forEach(ep => {
        const start = new Date(ep.startDate);
        const weeksPassed = Math.floor((now - start) / (1000 * 60 * 60 * 24 * ep.intervalDays));
        let currentEpisode = ep.currentEpisode + weeksPassed;
        if (currentEpisode > ep.totalEpisodes) currentEpisode = ep.totalEpisodes;
        const nextEpNum = currentEpisode < ep.totalEpisodes ? currentEpisode + 1 : null;
        const nextDate = nextEpNum ? new Date(start.getTime() + (currentEpisode) * ep.intervalDays * 24 * 60 * 60 * 1000) : null;

        const card = document.createElement('div');
        card.classList.add('schedule-card');

        const nextDateStr = nextDate ? nextDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }) : '';

        const nextTimeStr = nextDate ? nextDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }) : '';

        card.innerHTML = `
            <div class="card-top">
                <img src="${ep.image}" alt="${ep.title}">
                <div class="schedule-details">
                    <h3>${ep.title}</h3>
                    <div class="tags">
                        <span class="tag ${ep.platform}">${ep.platform}</span>
                        <span class="tag ${ep.language}">${ep.language}</span>
                        <span class="tag ${ep.type}">${ep.type}</span>
                    </div>
                    ${nextDate ? `
                        <div class="episode-date-time">
                            <span class="date-badge">📅 ${nextDateStr}</span>
                            <span class="time-badge">🕒 ${nextTimeStr}</span>
                            <span class="status-badge">📺 Weekly</span>
                        </div>` : ''}
                    <div class="release-time">Episode ${currentEpisode} of ${ep.totalEpisodes}</div>
                    ${nextEpNum ? `<div class="next-episode-label">Next Episode: Ep ${nextEpNum}</div>` : ''}
                    <div class="countdown" data-date="${nextDate ? nextDate.toISOString() : ''}">${nextDate ? '' : '✅ All Episodes Released'}</div>
                    <div class="btn-row">
                        ${nextDate ? `<button class="btn" onclick="setReminder('${ep.title} Ep ${nextEpNum}','${nextDate.toISOString()}')">Set Reminder</button>` : ''}
                    </div>
                    <div class="episode-grid">
                        ${Array.from({ length: ep.totalEpisodes }, (_, i) => {
            const epNum = i + 1;
            let className = 'episode-box';
            if (epNum <= currentEpisode) className += ' current';
            else if (epNum === nextEpNum) className += ' next-ep';

            return `<span class="${className}">Ep ${epNum}</span>`;
        }).join('')}
                    </div>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

/* ----------------- TV UPDATE FUNCTIONS ----------------- */
let currentTVIndex = 0;
let tvUpdateInterval;

function initTVUpdates() {
    updateTVDisplay();
    tvUpdateInterval = setInterval(updateTVDisplay, 5000);
}

function updateTVDisplay() {
    const allShows = [...tvSchedule, ...weeklyEpisodes, ...upcomingAnime];
    const now = new Date();
    
    const activeShows = allShows.filter(show => {
        if (show.startDate) {
            const startDate = new Date(show.startDate);
            return startDate <= now || (now - startDate) < (7 * 24 * 60 * 60 * 1000);
        } else if (show.releaseDate) {
            const releaseDate = new Date(show.releaseDate);
            return releaseDate >= now;
        }
        return false;
    });
    
    if (activeShows.length === 0) return;
    
    const currentShow = activeShows[currentTVIndex % activeShows.length];
    currentTVIndex++;
    
    const playingTitle = document.querySelector('.playing-title');
    const playingTime = document.querySelector('.playing-time');
    const progressFill = document.querySelector('.progress-fill');
    
    if (playingTitle && playingTime && progressFill) {
        playingTitle.textContent = currentShow.title;
        
        let timeText = '';
        if (currentShow.startDate) {
            const startDate = new Date(currentShow.startDate);
            timeText = `${startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} - ${currentShow.platform}`;
        } else if (currentShow.releaseDate) {
            const releaseDate = new Date(currentShow.releaseDate);
            timeText = `${releaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${currentShow.platform}`;
        }
        
        playingTime.textContent = timeText;
        
        const randomProgress = Math.floor(Math.random() * 40) + 30;
        progressFill.style.width = randomProgress + '%';
        progressFill.style.transition = 'width 1s ease-in-out';
    }
}

/* ----------------- UTILITY FUNCTIONS ----------------- */
function initTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
}

function updateTabCounts() {
    document.getElementById('upcomingTabCount').textContent = upcomingAnime.length;
    document.getElementById('weeklyTabCount').textContent = weeklyEpisodes.length;
    document.getElementById('tvTabCount').textContent = tvSchedule.length;
    
    document.getElementById('upcomingCount').textContent = upcomingAnime.length;
    document.getElementById('weeklyCount').textContent = weeklyEpisodes.length;
    document.getElementById('dailyCount').textContent = tvSchedule.length;
}

function updateCountdown() {
    document.querySelectorAll(".countdown").forEach(cd => {
        const dateStr = cd.getAttribute("data-date");
        if (!dateStr) return;
        const date = new Date(dateStr).getTime();
        const now = new Date().getTime();
        const diff = date - now;

        if (diff <= 0) {
            cd.textContent = "🎬 Available Now!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        cd.textContent = `Next Episode in 🕒 ${days}d ${hours}h ${minutes}m ${seconds}s`;
    });
}

function setReminder(title, datetime) {
    const start = new Date(datetime);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start.toISOString().replace(/-|:|\.\d+/g, '')}/${end.toISOString().replace(/-|:|\.\d+/g, '')}`;
    window.open(url, '_blank');
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/* ----------------- EVENT LISTENERS ----------------- */
function setupEventListeners() {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSearchBox();
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            closeMobileMenu();
            closeSearchBox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeSearchBox();
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
            closeSearchBox();
        }
    });
}

function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ----------------- MOBILE MENU FUNCTIONS ----------------- */
function toggleMobileMenu() {
    closeSearchBox();
    
    if (mobileMenu.classList.contains('show')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    mobileMenu.classList.add('show');
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    
    const menuItems = mobileMenu.querySelectorAll('.mobile-nav-link');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function closeMobileMenu() {
    mobileMenu.classList.remove('show');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

/* ----------------- SEARCH BOX FUNCTIONS ----------------- */
function toggleSearchBox() {
    closeMobileMenu();
    
    if (searchBox.classList.contains('show')) {
        closeSearchBox();
    } else {
        openSearchBox();
    }
}

function openSearchBox() {
    searchBox.classList.add('show');
    searchToggle.innerHTML = '<i class="fas fa-times"></i>';
    
    setTimeout(() => {
        const searchInput = searchBox.querySelector('.search-input');
        searchInput.focus();
    }, 200);
}

function closeSearchBox() {
    searchBox.classList.remove('show');
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
}

/* ----------------- AUTO UPDATE INTERVALS ----------------- */
setInterval(updateCountdown, 1000);

setInterval(() => {
    renderWeekly();
    renderUpcoming();
    renderTvSchedule();
    updateTabCounts();
}, 60000);

window.addEventListener('beforeunload', () => {
    if (tvUpdateInterval) {
        clearInterval(tvUpdateInterval);
    }
});
