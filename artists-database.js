// Artists Database - Central location for all artist information
// Update artist details here once, they'll automatically appear everywhere

window.ARTISTS_DATABASE = {
    // Voice Actors
    "sai_sujith": {
        name: "Sai Sujith",
        type: "voice_actor",
        instagram: "saisujith94",
        description: "Talented voice actor known for bringing energetic and emotional characters to life with his dynamic voice range."
    },
    
    "govardiniprakash": {
        name: "Govardiniprakash",
        type: "voice_actor",
        instagram: "govardhiniprakash",
        description: "Versatile voice actress with expertise in strong female characters and comedy roles."
    },
    
    "kedharnath": {
        name: "Kedharnath",
        type: "ked.dubs",
        instagram: "kedharnath_voice",
        description: "Professional voice actor with a wide range of character voices and emotional depth."
    },
    
    "sai_abhijith": {
        name: "Sai Abhijith",
        type: "voice_actor",
        instagram: "saiabhi",
        description: "Emerging voice talent known for youthful and energetic character portrayals."
    },
    
    // Crew Members (Script Writers, Directors, etc.)
    "govardini_writer": {
        name: "Govardiniprakash",
        type: "crew",
        instagram: "govardhiniprakash",
        description: "Experienced script writer with expertise in anime adaptations and storytelling. Known for maintaining the essence of original content."
    },
    
    "kedharnath_director": {
        name: "Kedharnath",
        type: "crew",
        instagram: "kedharnath_voice",
        description: "Skilled director specializing in anime dubbing with over 50+ projects completed."
    },
    
    // Dubbing Studios
    "crunchyroll_dubs": {
        name: "Crunchyroll Dubs",
        type: "studio",
        instagram: "crunchyroll",
        description: "Professional dubbing studio specializing in anime localization with state-of-the-art recording facilities."
    },
    
    "netflix_dubbing": {
        name: "Netflix Dubbing Studio",
        type: "studio",
        instagram: "netflix",
        description: "Leading dubbing studio for Netflix originals and licensed content with international quality standards."
    }
};

// Helper function to get artist info by name
window.getArtistInfo = function(artistName) {
    if (!artistName) return null;
    
    // Normalize name for lookup
    const normalizedName = artistName.toLowerCase().replace(/\s+/g, '_');
    
    // Try direct lookup
    if (window.ARTISTS_DATABASE[normalizedName]) {
        return window.ARTISTS_DATABASE[normalizedName];
    }
    
    // Try fuzzy match by name
    for (const key in window.ARTISTS_DATABASE) {
        const artist = window.ARTISTS_DATABASE[key];
        if (artist.name.toLowerCase() === artistName.toLowerCase()) {
            return artist;
        }
    }
    
    return null;
};

// Helper function to get Instagram by name
window.getArtistInstagram = function(artistName) {
    const artist = window.getArtistInfo(artistName);
    return artist ? artist.instagram : null;
};

// Helper function to get description by name
window.getArtistDescription = function(artistName) {
    const artist = window.getArtistInfo(artistName);
    return artist ? artist.description : null;
};

console.log('✅ Artists Database loaded with', Object.keys(window.ARTISTS_DATABASE).length, 'artists');
