// Simple Voice Artist Display System - No Storage
// Directly displays cast and crew data from post-script.js

class VoiceArtistDisplay {
    constructor() {
        this.init();
    }

    init() {
        console.log('Voice Artist Display System initialized');
        
        if (window.location.pathname.includes('voice-artists-real.html')) {
            // Hide loading message
            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
            
            // Load and display data directly
            this.displayArtists();
        }
    }

    // Check if role is a production team role
    isProductionRole(role) {
        const productionRoles = [
            'Script Writer', 'Director', 'Producer', 'Sound Engineer',
            'Music Director', 'Editor', 'Assistant Director', 'Creative Director',
            'Story Writer', 'Screenplay Writer', 'Dialogue Writer', 'Music Composer',
            'Background Score', 'Sound Designer', 'Audio Engineer', 'Mixing Engineer'
        ];
        return productionRoles.some(prodRole => role.includes(prodRole));
    }

    // Get department icon based on role
    getDepartmentIcon(role) {
        if (role.includes('Writer')) return 'fas fa-pen';
        if (role.includes('Director')) return 'fas fa-video';
        if (role.includes('Sound') || role.includes('Audio')) return 'fas fa-volume-up';
        if (role.includes('Music')) return 'fas fa-music';
        if (role.includes('Producer')) return 'fas fa-film';
        if (role.includes('Editor')) return 'fas fa-cut';
        return 'fas fa-cogs';
    }

    // Display artists directly from post data
    displayArtists() {
        const artistsList = document.querySelector('#voiceArtistsList');
        if (!artistsList) return;

        // Check if post data is available
        if (typeof detailedMovieData === 'undefined') {
            artistsList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <p>No data available. Make sure post-script.js is loaded.</p>
                </div>
            `;
            return;
        }

        // Collect all artists from all movies
        const allArtists = [];
        let artistCounter = 1;

        Object.values(detailedMovieData).forEach(movie => {
            // Add cast members
            if (movie.cast && Array.isArray(movie.cast)) {
                movie.cast.forEach(castMember => {
                    if (castMember.actorName && castMember.characterName) {
                        // Get artist info from database
                        const artistInfo = window.getArtistInfo ? window.getArtistInfo(castMember.actorName) : null;
                        
                        allArtists.push({
                            id: artistCounter++,
                            name: castMember.actorName,
                            role: 'Voice Actor',
                            avatar: castMember.actorImage || 'https://via.placeholder.com/150',
                            character: castMember.characterName,
                            anime: movie.title,
                            platform: castMember.platform || '',
                            characterImage: castMember.characterImage || movie.poster,
                            description: castMember.description || (artistInfo ? artistInfo.description : ''),
                            instagram: castMember.instagram || (artistInfo ? artistInfo.instagram : ''),
                            type: 'voice'
                        });
                    }
                });
            }

            // Add crew members
            if (movie.crew && Array.isArray(movie.crew)) {
                movie.crew.forEach(crewMember => {
                    if (crewMember.name && crewMember.role) {
                        // Get artist info from database
                        const artistInfo = window.getArtistInfo ? window.getArtistInfo(crewMember.name) : null;
                        
                        allArtists.push({
                            id: artistCounter++,
                            name: crewMember.name,
                            role: crewMember.role,
                            avatar: crewMember.avatar || 'https://via.placeholder.com/150',
                            project: crewMember.project || movie.title,
                            anime: movie.title,
                            platform: crewMember.platform || '',
                            projectImage: crewMember.projectImage || movie.poster,
                            description: crewMember.description || (artistInfo ? artistInfo.description : ''),
                            instagram: crewMember.instagram || (artistInfo ? artistInfo.instagram : ''),
                            type: 'production'
                        });
                    }
                });
            }

            // Add dubbing studios
            if (movie.dubbingStudios && Array.isArray(movie.dubbingStudios)) {
                movie.dubbingStudios.forEach(studio => {
                    if (studio.name && studio.role) {
                        // Get studio info from database
                        const studioInfo = window.getArtistInfo ? window.getArtistInfo(studio.name) : null;
                        
                        allArtists.push({
                            id: artistCounter++,
                            name: studio.name,
                            role: studio.role,
                            avatar: studio.avatar || 'https://via.placeholder.com/150',
                            project: studio.name,
                            anime: movie.title,
                            platform: studio.platform || '',
                            projectImage: studio.projectImage || movie.poster,
                            description: studio.description || (studioInfo ? studioInfo.description : ''),
                            instagram: studio.instagram || (studioInfo ? studioInfo.instagram : ''),
                            type: 'studio'
                        });
                    }
                });
            }
        });

        // Group artists by name and deduplicate works
        const groupedArtists = {};
        allArtists.forEach(artist => {
            const key = artist.name.toLowerCase();
            if (!groupedArtists[key]) {
                groupedArtists[key] = {
                    name: artist.name,
                    role: artist.role,
                    avatar: artist.avatar,
                    works: []
                };
            }
            
            // Check for existing work (without platform check)
            const existingWork = groupedArtists[key].works.find(work => {
                if (artist.type === 'voice') {
                    // For voice actors, check character + anime combination
                    return work.character === artist.character && 
                           work.anime === artist.anime;
                } else {
                    // For production/studio, check role + anime combination
                    return work.role === artist.role && 
                           work.anime === artist.anime;
                }
            });
            
            if (existingWork) {
                // If work exists, merge platforms
                if (artist.platform && !existingWork.platforms) {
                    existingWork.platforms = existingWork.platform ? [existingWork.platform] : [];
                }
                if (artist.platform && existingWork.platforms && !existingWork.platforms.includes(artist.platform)) {
                    existingWork.platforms.push(artist.platform);
                }
            } else {
                // Add new work with platforms array
                const newWork = { ...artist };
                if (newWork.platform) {
                    newWork.platforms = [newWork.platform];
                }
                groupedArtists[key].works.push(newWork);
            }
        });

        // Display artists
        const artistsArray = Object.values(groupedArtists);
        if (artistsArray.length === 0) {
            artistsList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <p>No artists found in the data.</p>
                </div>
            `;
            return;
        }

        // Render artists
        artistsList.innerHTML = '';
        artistsArray.forEach((artist, index) => {
            const artistElement = this.createArtistElement(artist, index + 1);
            artistsList.appendChild(artistElement);
        });

        // Update stats
        this.updateStats(artistsArray);
        
        // Initialize leaderboard
        this.initializeLeaderboard(artistsArray);
        
        // Initialize search functionality
        this.initializeSearch(artistsArray);
        
        // Initialize accordion
        this.initializeAccordion();
    }

    // Create artist element
    createArtistElement(artist, number) {
        const artistDiv = document.createElement('div');
        artistDiv.className = 'voice-artist-item';
        
        // Check if this is a production team member
        const isProduction = this.isProductionRole(artist.role);
        if (isProduction) {
            artistDiv.setAttribute('data-production-team', 'true');
        }

        // Separate voice work from production work
        const voiceWork = artist.works.filter(work => work.type === 'voice');
        const productionWork = artist.works.filter(work => work.type === 'production');

        const voiceHtml = voiceWork.map(work => `
            <div class="voice-character-card" onclick="showCharacterPopup('${work.character.replace(/'/g, "\\'")}', '${work.anime.replace(/'/g, "\\'")}', '${work.platforms ? work.platforms.join(', ').replace(/'/g, "\\'") : 'N/A'}', '${work.characterImage}', '${work.description ? work.description.replace(/'/g, "\\'") : ''}', '${work.instagram || ''}')">
                <div class="voice-char-image-square">
                    <img alt="${work.character}" src="${work.characterImage}" onerror="this.src='https://via.placeholder.com/150'" />
                    <div class="char-overlay">
                        <i class="fas fa-info-circle"></i>
                    </div>
                </div>
                <div class="voice-char-info">
                    <div class="char-badge info-badge">
                        <i class="fas fa-info-circle"></i> More Info
                    </div>
                </div>
            </div>
        `).join('');

        const productionHtml = productionWork.map(work => {
            const icon = this.getDepartmentIcon(work.role);
            return `
                <div class="voice-character-card production-work-card" onclick="showProductionPopup('${work.role.replace(/'/g, "\\'")}', '${work.anime.replace(/'/g, "\\'")}', '${work.platforms ? work.platforms.join(', ').replace(/'/g, "\\'") : 'N/A'}', '${work.projectImage}', '${icon}', '${work.description ? work.description.replace(/'/g, "\\'") : ''}', '${work.instagram || ''}')">
                    <div class="voice-char-image-square">
                        <img alt="${work.anime}" src="${work.projectImage}" onerror="this.src='https://via.placeholder.com/150'" />
                        <div class="char-overlay production-overlay">
                            <i class="fas fa-info-circle"></i>
                        </div>
                    </div>
                    <div class="voice-char-info">
                        <div class="char-badge info-badge production-badge">
                            <i class="fas fa-info-circle"></i> More Info
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        artistDiv.innerHTML = `
            <div class="voice-artist-header">
                <div class="artist-number">${number.toString().padStart(2, '0')}</div>
                <div class="voice-artist-name">
                    <h2>${artist.name}</h2>
                    <span class="voice-artist-role">${(() => {
                        // Detect multiple roles for header
                        const hasVoiceWork = voiceWork.length > 0;
                        const hasProductionWork = productionWork.length > 0;
                        
                        if (hasVoiceWork && hasProductionWork) {
                            return 'Multi-Talented Artist';
                        }
                        return artist.role;
                    })()}</span>
                </div>
                <div class="expand-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="voice-artist-content" id="artist${number}">
                <div class="voice-artist-card">
                    <div class="artist-card-header">
                        <div class="artist-avatar-container">
                            <img alt="${artist.name}" class="voice-artist-avatar" src="${artist.avatar}" onerror="this.src='https://via.placeholder.com/150'" />
                            <div class="avatar-badge">
                                <i class="fas fa-microphone"></i>
                            </div>
                        </div>
                        <div class="voice-artist-info">
                            <h3 class="artist-name">${artist.name}</h3>
                            <p class="artist-title">${(() => {
                                // Detect multiple roles
                                const hasVoiceWork = voiceWork.length > 0;
                                const hasProductionWork = productionWork.length > 0;
                                
                                if (hasVoiceWork && hasProductionWork) {
                                    return 'Multi-Talented Artist';
                                }
                                return artist.role;
                            })()}</p>
                            <div class="artist-stats">
                                <span class="stat-item">
                                    <i class="fas fa-play-circle"></i>
                                    ${artist.works.length} Works
                                </span>
                                ${(() => {
                                    // Get Instagram from database
                                    const artistInfo = window.getArtistInfo ? window.getArtistInfo(artist.name) : null;
                                    const instagram = artistInfo ? artistInfo.instagram : null;
                                    return instagram ? `
                                        <a href="https://instagram.com/${instagram}" target="_blank" class="artist-instagram-badge" title="@${instagram}">
                                            <i class="fab fa-instagram"></i>
                                            <span>Instagram</span>
                                        </a>
                                    ` : '';
                                })()}
                            </div>
                        </div>
                    </div>
                </div>

                ${voiceWork.length > 0 ? `
                <div class="voice-characters-section">
                    <h3><i class="fas fa-theater-masks"></i> Characters Voiced</h3>
                    <div class="voice-characters-grid">
                        ${voiceHtml}
                    </div>
                </div>
                ` : ''}
                
                ${productionWork.length > 0 ? `
                <div class="voice-characters-section production-section">
                    <h3><i class="fas fa-cogs"></i> Production Work</h3>
                    <div class="voice-characters-grid">
                        ${productionHtml}
                    </div>
                </div>
                ` : ''}
            </div>
        `;

        return artistDiv;
    }

    // Update hero statistics
    updateStats(artists) {
        // Count artists based on their actual work, not just their primary role
        const voiceActors = artists.filter(artist => 
            artist.works.some(work => work.type === 'voice')
        );
        const productionCrew = artists.filter(artist => 
            artist.works.some(work => work.type === 'production')
        );
        const dubbingStudios = artists.filter(artist => 
            artist.works.some(work => work.type === 'studio')
        );
        
        let totalCharacters = 0;
        const animeSet = new Set();
        
        artists.forEach(artist => {
            artist.works.forEach(work => {
                if (work.type === 'voice') {
                    totalCharacters++;
                }
                animeSet.add(work.anime);
            });
        });

        // Update counters
        this.animateCounter('totalArtists', voiceActors.length);
        this.animateCounter('totalCharacters', totalCharacters);
        this.animateCounter('totalProductionTeam', productionCrew.length);
        this.animateCounter('totalDubbingStudios', dubbingStudios.length);
        this.animateCounter('totalAnimes', animeSet.size);
    }

    // Animate counter
    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let currentValue = 0;
        const increment = targetValue / 30;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentValue);
        }, 50);
    }

    // Initialize leaderboard functionality
    initializeLeaderboard(artists) {
        // Separate artists by type based on their actual work
        const voiceActors = artists.filter(artist => 
            artist.works.some(work => work.type === 'voice')
        );
        const productionCrew = artists.filter(artist => 
            artist.works.some(work => work.type === 'production')
        );
        const dubbingStudios = artists.filter(artist => 
            artist.works.some(work => work.type === 'studio')
        );
        
        // Sort by number of relevant works (descending)
        voiceActors.sort((a, b) => {
            const aVoiceCount = a.works.filter(work => work.type === 'voice').length;
            const bVoiceCount = b.works.filter(work => work.type === 'voice').length;
            return bVoiceCount - aVoiceCount;
        });
        productionCrew.sort((a, b) => {
            const aProductionCount = a.works.filter(work => work.type === 'production').length;
            const bProductionCount = b.works.filter(work => work.type === 'production').length;
            return bProductionCount - aProductionCount;
        });
        dubbingStudios.sort((a, b) => {
            const aStudioCount = a.works.filter(work => work.type === 'studio').length;
            const bStudioCount = b.works.filter(work => work.type === 'studio').length;
            return bStudioCount - aStudioCount;
        });
        
        // Populate leaderboards with specific work type counts
        this.populateLeaderboard('voiceArtistsLeaderboard', voiceActors.slice(0, 5), 'Characters', 'voice');
        this.populateLeaderboard('productionTeamLeaderboard', productionCrew.slice(0, 5), 'Projects', 'production');
        this.populateLeaderboard('dubbingStudiosLeaderboard', dubbingStudios.slice(0, 5), 'Projects', 'studio');
    }

    // Populate individual leaderboard
    populateLeaderboard(containerId, artists, countLabel, workType) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (artists.length === 0) {
            container.innerHTML = `
                <div class="leaderboard-empty">
                    <i class="fas fa-info-circle"></i>
                    <p>No data available yet</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        
        artists.forEach((artist, index) => {
            const position = index + 1;
            const isTopThree = position <= 3;
            
            const leaderboardItem = document.createElement('div');
            leaderboardItem.className = `leaderboard-item ${isTopThree ? 'top-three' : ''}`;
            
            // Calculate count based on work type
            let workCount = 0;
            if (workType) {
                workCount = artist.works.filter(work => work.type === workType).length;
            } else {
                workCount = artist.works.length;
            }
            
            // Get position icon for top 3
            let positionContent = '';
            if (position === 1) {
                positionContent = '<i class="fas fa-trophy position-icon gold"></i>';
            } else if (position === 2) {
                positionContent = '<i class="fas fa-medal position-icon silver"></i>';
            } else if (position === 3) {
                positionContent = '<i class="fas fa-award position-icon bronze"></i>';
            } else {
                positionContent = `<span class="position-number">${position}</span>`;
            }
            
            leaderboardItem.innerHTML = `
                <div class="position">
                    ${positionContent}
                </div>
                <div class="artist-info">
                    <img src="${artist.avatar}" alt="${artist.name}" class="leaderboard-avatar" onerror="this.src='https://via.placeholder.com/45'">
                    <div class="artist-details">
                        <div class="artist-name">${artist.name}</div>
                        <div class="artist-role">
                            <i class="role-icon ${this.getRoleIcon(artist.role)}"></i>
                            ${artist.role}
                        </div>
                    </div>
                </div>
                <div class="artist-count">
                    <div class="count-number">${workCount}</div>
                    <div class="count-label">${countLabel}</div>
                </div>
            `;
            
            container.appendChild(leaderboardItem);
        });
    }

    // Get role icon
    getRoleIcon(role) {
        if (role.includes('Voice')) return 'fas fa-microphone';
        if (role.includes('Writer')) return 'fas fa-pen';
        if (role.includes('Director')) return 'fas fa-video';
        if (role.includes('Sound') || role.includes('Audio')) return 'fas fa-volume-up';
        if (role.includes('Music')) return 'fas fa-music';
        if (role.includes('Producer')) return 'fas fa-film';
        if (role.includes('Editor')) return 'fas fa-cut';
        if (role.includes('Studio')) return 'fas fa-building';
        return 'fas fa-cogs';
    }

    // Initialize search functionality
    initializeSearch(artists) {
        const searchInputs = [
            document.getElementById('voiceArtistSearchInput'),
            document.getElementById('prominentSearchInput')
        ];
        
        const searchBtn = document.getElementById('voiceArtistSearchBtn');
        const clearBtns = [
            document.getElementById('clearSearchBtn'),
            document.getElementById('prominentClearBtn')
        ];
        
        // Store original artists for reset
        this.allArtists = artists;
        
        // Search function
        const performSearch = (query) => {
            const searchQuery = query.toLowerCase().trim();
            
            if (searchQuery === '') {
                this.showAllArtists();
                this.hideSearchNotice();
                return;
            }
            
            const filteredArtists = this.allArtists.filter(artist => {
                // Search in artist name
                if (artist.name.toLowerCase().includes(searchQuery)) return true;
                
                // Search in role
                if (artist.role.toLowerCase().includes(searchQuery)) return true;
                
                // Search in works (characters/projects)
                return artist.works.some(work => {
                    return work.character?.toLowerCase().includes(searchQuery) ||
                           work.anime?.toLowerCase().includes(searchQuery) ||
                           work.project?.toLowerCase().includes(searchQuery);
                });
            });
            
            this.displayFilteredArtists(filteredArtists, searchQuery);
            this.showSearchNotice(searchQuery, filteredArtists.length);
        };
        
        // Add event listeners to search inputs
        searchInputs.forEach(input => {
            if (input) {
                input.addEventListener('input', (e) => {
                    const query = e.target.value;
                    performSearch(query);
                    
                    // Show/hide clear buttons
                    clearBtns.forEach(btn => {
                        if (btn) {
                            btn.style.display = query ? 'flex' : 'none';
                        }
                    });
                    
                    // Sync other search input
                    searchInputs.forEach(otherInput => {
                        if (otherInput && otherInput !== input) {
                            otherInput.value = query;
                        }
                    });
                });
                
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        performSearch(input.value);
                        // Close navigation search box after search
                        if (input.id === 'voiceArtistSearchInput') {
                            closeSearchBox();
                        }
                    }
                });
            }
        });
        
        // Add event listener to search button
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInputs[0]?.value || '';
                performSearch(query);
                // Close navigation search box after search
                closeSearchBox();
            });
        }
        
        // Add event listeners to clear buttons
        clearBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    searchInputs.forEach(input => {
                        if (input) input.value = '';
                    });
                    clearBtns.forEach(clearBtn => {
                        if (clearBtn) clearBtn.style.display = 'none';
                    });
                    this.showAllArtists();
                    this.hideSearchNotice();
                });
            }
        });
    }
    
    // Display filtered artists
    displayFilteredArtists(artists, query) {
        const artistsList = document.querySelector('#voiceArtistsList');
        if (!artistsList) return;
        
        artistsList.innerHTML = '';
        
        if (artists.length === 0) {
            artistsList.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3 style="margin-bottom: 10px;">No results found</h3>
                    <p>No artists found matching "${query}". Try different keywords.</p>
                </div>
            `;
            return;
        }
        
        artists.forEach((artist, index) => {
            const artistElement = this.createArtistElement(artist, index + 1);
            artistsList.appendChild(artistElement);
        });
        
        // Reinitialize accordion for filtered results
        this.initializeAccordion();
    }
    
    // Show all artists
    showAllArtists() {
        const artistsList = document.querySelector('#voiceArtistsList');
        if (!artistsList || !this.allArtists) return;
        
        artistsList.innerHTML = '';
        this.allArtists.forEach((artist, index) => {
            const artistElement = this.createArtistElement(artist, index + 1);
            artistsList.appendChild(artistElement);
        });
        
        // Reinitialize accordion
        this.initializeAccordion();
    }
    
    // Show search notice
    showSearchNotice(query, resultCount) {
        const noticeSection = document.getElementById('searchNoticeSection');
        const searchQuerySpan = document.getElementById('searchQuery');
        
        if (noticeSection && searchQuerySpan) {
            searchQuerySpan.textContent = query;
            noticeSection.style.display = 'block';
            
            // Update notice content based on results
            const noticeContent = noticeSection.querySelector('.notice-content p');
            if (noticeContent) {
                if (resultCount === 0) {
                    noticeContent.innerHTML = `No results found for "<span id="searchQuery">${query}</span>". Try different keywords.`;
                } else {
                    noticeContent.innerHTML = `Found ${resultCount} result${resultCount !== 1 ? 's' : ''} for "<span id="searchQuery">${query}</span>".`;
                }
            }
        }
    }
    
    // Hide search notice
    hideSearchNotice() {
        const noticeSection = document.getElementById('searchNoticeSection');
        if (noticeSection) {
            noticeSection.style.display = 'none';
        }
    }

    // Initialize accordion functionality
    initializeAccordion() {
        const artistItems = document.querySelectorAll('.voice-artist-item');
        
        artistItems.forEach(item => {
            const header = item.querySelector('.voice-artist-header');
            if (header) {
                header.addEventListener('click', () => {
                    // Close all other items
                    artistItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
    }
}

// Global instance for external access
let voiceArtistDisplayInstance = null;

// Global clear search function
function clearSearch() {
    if (voiceArtistDisplayInstance) {
        const searchInputs = [
            document.getElementById('voiceArtistSearchInput'),
            document.getElementById('prominentSearchInput')
        ];
        const clearBtns = [
            document.getElementById('clearSearchBtn'),
            document.getElementById('prominentClearBtn')
        ];
        
        searchInputs.forEach(input => {
            if (input) input.value = '';
        });
        clearBtns.forEach(btn => {
            if (btn) btn.style.display = 'none';
        });
        
        voiceArtistDisplayInstance.showAllArtists();
        voiceArtistDisplayInstance.hideSearchNotice();
    }
}

// Navigation Search Toggle Functionality
function initializeNavigationSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchBox = document.getElementById('searchBox');
    
    if (searchToggle && searchBox) {
        // Search toggle functionality
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSearchBox();
        });
        
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchToggle.contains(e.target) && !searchBox.contains(e.target)) {
                closeSearchBox();
            }
        });
        
        // Close search on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSearchBox();
            }
        });
    }
}

function toggleSearchBox() {
    const searchBox = document.getElementById('searchBox');
    const searchToggle = document.getElementById('searchToggle');
    
    if (searchBox.classList.contains('active')) {
        closeSearchBox();
    } else {
        openSearchBox();
    }
}

function openSearchBox() {
    const searchBox = document.getElementById('searchBox');
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('voiceArtistSearchInput');
    
    searchBox.classList.add('active');
    searchToggle.innerHTML = '<i class="fas fa-times"></i>';
    
    // Focus on input with delay for smooth animation
    setTimeout(() => {
        if (searchInput) {
            searchInput.focus();
        }
    }, 300);
}

function closeSearchBox() {
    const searchBox = document.getElementById('searchBox');
    const searchToggle = document.getElementById('searchToggle');
    
    searchBox.classList.remove('active');
    searchToggle.innerHTML = '<i class="fas fa-search"></i>';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation search first
    initializeNavigationSearch();
    
    // Then initialize voice artist display
    setTimeout(() => {
        voiceArtistDisplayInstance = new VoiceArtistDisplay();
    }, 100);
});


// Character Details Popup Function
function showCharacterPopup(characterName, animeName, platforms, characterImage, description, instagram) {
    // Remove existing popup if any
    const existingPopup = document.getElementById('platformPopup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create popup
    const popup = document.createElement('div');
    popup.id = 'platformPopup';
    popup.className = 'platform-popup';
    
    const platformsList = platforms !== 'N/A' 
        ? platforms.split(', ').map(platform => `
            <div class="platform-item">
                <i class="fas fa-check-circle"></i>
                <span>${platform}</span>
            </div>
        `).join('')
        : '<div class="platform-item"><i class="fas fa-info-circle"></i><span>No platform info</span></div>';
    
    const descriptionHtml = description 
        ? `<div class="popup-description">
                <i class="fas fa-quote-left"></i>
                <p>${description}</p>
            </div>`
        : '';
    
    popup.innerHTML = `
        <div class="platform-popup-overlay" onclick="closePlatformPopup()"></div>
        <div class="platform-popup-content">
            <button class="platform-popup-close" onclick="closePlatformPopup()">
                <i class="fas fa-times"></i>
            </button>
            <div class="character-popup-image">
                <img src="${characterImage}" alt="${characterName}" onerror="this.src='https://via.placeholder.com/150'">
            </div>
            <div class="platform-popup-header">
                <i class="fas fa-user"></i>
                <h3>${characterName}</h3>
            </div>
            <div class="character-popup-anime">
                <i class="fas fa-film"></i>
                <span>${animeName}</span>
            </div>
            ${descriptionHtml}
            <div class="platform-popup-section">
                <h4><i class="fas fa-tv"></i> Available Platforms</h4>
                <div class="platform-popup-list">
                    ${platformsList}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Animate in
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
}

function closePlatformPopup() {
    const popup = document.getElementById('platformPopup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

// Close popup on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePlatformPopup();
    }
});


// Production Work Popup Function
function showProductionPopup(role, animeName, platforms, projectImage, icon, description, instagram) {
    // Remove existing popup if any
    const existingPopup = document.getElementById('platformPopup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create popup
    const popup = document.createElement('div');
    popup.id = 'platformPopup';
    popup.className = 'platform-popup';
    
    const platformsList = platforms !== 'N/A' 
        ? platforms.split(', ').map(platform => `
            <div class="platform-item">
                <i class="fas fa-check-circle"></i>
                <span>${platform}</span>
            </div>
        `).join('')
        : '<div class="platform-item"><i class="fas fa-info-circle"></i><span>No platform info</span></div>';
    
    const descriptionHtml = description 
        ? `<div class="popup-description">
                <i class="fas fa-quote-left"></i>
                <p>${description}</p>
            </div>`
        : '';
    
    popup.innerHTML = `
        <div class="platform-popup-overlay" onclick="closePlatformPopup()"></div>
        <div class="platform-popup-content production-popup">
            <button class="platform-popup-close" onclick="closePlatformPopup()">
                <i class="fas fa-times"></i>
            </button>
            <div class="character-popup-image">
                <img src="${projectImage}" alt="${animeName}" onerror="this.src='https://via.placeholder.com/150'">
                <div class="production-icon-overlay">
                    <i class="${icon}"></i>
                </div>
            </div>
            <div class="platform-popup-header">
                <i class="${icon}"></i>
                <h3>${role}</h3>
            </div>
            <div class="character-popup-anime">
                <i class="fas fa-film"></i>
                <span>${animeName}</span>
            </div>
            ${descriptionHtml}
            <div class="platform-popup-section">
                <h4><i class="fas fa-tv"></i> Available Platforms</h4>
                <div class="platform-popup-list">
                    ${platformsList}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Animate in
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
}
