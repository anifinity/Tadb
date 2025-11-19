# 📖 Post Page Complete Guide - TADB

## 🎯 Overview
This guide explains how to add and manage anime posts on TADB (Telugu Anime Database) using the Post Generator tool.

---

## ⚡ What's New?

### 🎯 Artists Database System (Recommended!)

We now have a **central artists database** (`artists-database.js`) where you can manage all artist information in one place!

**Old Way (Still works):**
```javascript
// Add description & instagram in EVERY post
"cast": [{
  "actorName": "Sai Sujith",
  "description": "Bio here...",
  "instagram": "username"
}]
```

**New Way (Recommended):**
```javascript
// 1. Add to artists-database.js ONCE
"sai_sujith": {
  name: "Sai Sujith",
  instagram: "username",
  description: "Bio here..."
}

// 2. In posts, just add name - auto-fills!
"cast": [{
  "actorName": "Sai Sujith"
  // Description & Instagram auto-fill!
}]
```

**Benefits:** Update once, use everywhere! 🎉

---

## 🚀 Quick Start

### Step 1: Open Post Generator
1. Open `post-generator.html` in your browser
2. You'll see a form with multiple sections

### Step 2: Fill Basic Information
Fill in the following fields:

#### **Basic Details**
- **ID**: Unique number for the post (e.g., 1, 2, 3...)
- **Title**: Anime name (e.g., "Naruto Classic")
- **Year**: Release year (e.g., "2024")
- **Season**: Season name (e.g., "Fall", "Winter", "Spring", "Summer")
- **Rating**: IMDb/MAL rating (e.g., "8.5")
- **Age Rating**: Content rating (e.g., "PG-13", "PG-18")

#### **Images**
- **Poster URL**: Main poster image (vertical)
- **Backdrop URL**: Background banner image (horizontal)

#### **Content**
- **Genres**: Comma-separated (e.g., "Action, Adventure, Comedy")
- **Synopsis**: Full description of the anime
- **Spoiler Alert**: "none" or "spoiler" (if synopsis contains spoilers)

#### **Production Details**
- **Studio**: Animation studio (e.g., "Mappa", "Ufotable")
- **Format**: Season info (e.g., "Season 01", "Movie")
- **Duration**: Episode length (e.g., "23 min")
- **Total Episodes**: Number of episodes (e.g., "12", "24")

#### **Release Information**
- **Premiere Date**: Release date (e.g., "Released on 2024")
- **Status**: "Completed", "Ongoing", or "Upcoming"
- **Broadcast**: Platform info (e.g., "OTT (Crunchyroll)")
- **Language**: "Telugu Dub Available" or "Telugu Sub Available"

#### **Additional Info**
- **Air Season**: Same as Season field
- **Platform Label**: Main platform (e.g., "Crunchyroll")
- **MRP**: "Visible" or "None" (shows/hides view count)
- **View Count**: Number of views (e.g., "4.2M")

#### **Categories & Labels**
- **Categories**: Tags for filtering (e.g., "Action, Crunchyroll, Isekai")
- **Labels**: Additional tags (e.g., "Telugu Dub", "Popular")

---

## 👥 Adding Cast Members (Voice Actors)

### Click "Add Cast Member" button

Fill in these fields:
1. **Actor Name**: Voice actor's name (e.g., "Sai Sujith")
2. **Character Name**: Character they voiced (e.g., "Naruto")
3. **Platform**: Where it's available (e.g., "Crunchyroll, Netflix")
   - Use dropdown for common platforms
   - Can add multiple platforms separated by comma
4. **Actor Image URL**: Voice actor's photo
5. **Character Image URL**: Character's image
6. **Description** (Optional): Actor bio/info
   - Example: "Talented voice actor known for bringing energetic characters to life"
   - Shows in "More Info" popup on voice artist page

### 💡 Tips:
- Add multiple cast members by clicking "Add Cast Member" again
- Remove unwanted entries with "Remove" button
- Description is optional but recommended for better user experience

---

## 🎬 Adding Crew Members (Production Team)

### Click "Add Crew Member" button

Fill in these fields:
1. **Name**: Crew member's name (e.g., "Govardiniprakash")
2. **Role**: Their role (e.g., "Script Writer", "Director", "Sound Engineer")
3. **Platform**: Where their work is available (e.g., "Crunchyroll")
4. **Avatar URL**: Crew member's photo
5. **Project Image URL**: Project/anime poster
6. **Description** (Optional): Role description/bio
   - Example: "Experienced script writer with expertise in anime adaptations"
   - Shows in "More Info" popup on voice artist page

### Common Roles:
- Script Writer
- Director
- Producer
- Sound Engineer
- Music Director
- Editor
- Assistant Director
- Creative Director

---

## 🏢 Adding Dubbing Studios

### Click "Add Studio" button

Fill in these fields:
1. **Studio Name**: Dubbing studio name (e.g., "Crunchyroll Dubs", "Netflix Dubbing")
2. **Role**: Studio role (e.g., "Dubbing Studio", "Post-Production Studio")
3. **Platform**: Where their work is available (e.g., "Crunchyroll")
4. **Studio Logo URL**: Studio logo/image
5. **Project Image URL**: Project/anime poster
6. **Description** (Optional): Studio description/info
   - Example: "Professional dubbing studio specializing in anime localization"
   - Shows in "More Info" popup on voice artist page

### 💡 Tips:
- Add all dubbing studios involved in the project
- Include platform info for better organization
- Description helps users know about the studio's work

---

## 📺 Adding Platforms

### Click "Add Platform" button

Fill in these fields:
1. **Platform Name**: Streaming platform (e.g., "Crunchyroll")
2. **Status**: "Available" or "Coming Soon"
3. **Icon URL**: Platform logo image

### Common Platforms:
- Crunchyroll
- Netflix
- Anime Times
- JioHotstar
- Disney+
- Muse Asia
- Prime Video

---

## 🎥 Adding Trailers

### Click "Add Trailer" button

Fill in these fields:
1. **Title**: Trailer name (e.g., "Official Trailer")
2. **Description**: Brief description (e.g., "Naruto Telugu Trailer")
3. **Thumbnail URL**: Trailer thumbnail image
4. **Video ID**: YouTube video ID
   - Example: If URL is `https://youtube.com/watch?v=X50zZ73VNPQ`
   - Video ID is: `X50zZ73VNPQ`

---

## 📊 Statistics Section

Fill in these fields:
1. **Rating**: Same as main rating (e.g., "8.5")
2. **Liked Percentage**: User rating (e.g., "94%")
3. **Total Views**: View count (e.g., "4.2M")

---

## ✅ Generate & Save

### Step 1: Generate Code
1. Fill all required fields
2. Code automatically generates in the "Generated Code" section
3. Review the generated JSON code

### Step 2: Copy Code
1. Click "Copy Code" button
2. Code is copied to clipboard

### Step 3: Add to posts-data.js
1. Open `posts-data.js` file
2. Find `window.POSTS_DATA = [` array
3. Paste the copied code inside the array
4. Make sure to add comma (`,`) between posts
5. Save the file

### Example Structure:
```javascript
window.POSTS_DATA = [
  {
    // First post
    "id": 1,
    "title": "Anime 1",
    ...
  },
  {
    // Second post (your new post)
    "id": 2,
    "title": "Anime 2",
    ...
  }
];
```

---

## 📋 Complete Example Code

### 🎯 NEW: Artists Database System

**Important:** We now have a central `artists-database.js` file where you can manage all artist information (descriptions, Instagram) in one place!

**Benefits:**
- ✅ Update artist info once, appears everywhere
- ✅ No need to add description/instagram in every post
- ✅ Cleaner posts-data.js
- ✅ Easy to manage

**How it works:**
1. Add artist to `artists-database.js` with description & Instagram
2. In posts, just add actor name - description & Instagram auto-fill!
3. Can still override in posts if needed

---

### Example with Artists Database:

**Step 1: Add to artists-database.js (one time)**
```javascript
window.ARTISTS_DATABASE = {
    "sai_sujith": {
        name: "Sai Sujith",
        type: "voice_actor",
        instagram: "saisujith_official",
        description: "Talented voice actor known for energetic characters."
    },
    "govardiniprakash": {
        name: "Govardiniprakash",
        type: "voice_actor",
        instagram: "govardini_official",
        description: "Versatile voice actress with expertise in strong female characters."
    }
};
```

**Step 2: Simplified Post (description & Instagram auto-fill!)**
```javascript
{
  "id": 1,
  "title": "Naruto Classic",
  "year": "2002",
  "season": "Fall",
  "rating": "8.3",
  "ageRating": "PG-13",
  "poster": "https://example.com/naruto-poster.jpg",
  "backdrop": "https://example.com/naruto-backdrop.jpg",
  "genres": "Action, Adventure, Shounen",
  "synopsis": "Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
  "spoilerAlert": "none",
  "studio": "Pierrot",
  "format": "Season 01",
  "duration": "23 min",
  "totalEpisodes": "220",
  "premiereDate": "Released on 2002",
  "status": "Completed",
  "broadcast": "OTT (Crunchyroll)",
  "language": "Telugu Dub Available",
  "airSeason": "Fall",
  "platformLabel": "Crunchyroll",
  "mrp": "Visible",
  "viewCount": "10M",
  "categories": ["Action", "Adventure", "Shounen", "Crunchyroll"],
  "labels": ["Telugu Dub", "Popular"],
  "statistics": {
    "rating": "8.3",
    "likedPercentage": "95%",
    "totalViews": "10M"
  },
  "cast": [
    {
      "actorName": "Sai Sujith",
      "characterName": "Naruto Uzumaki",
      "platform": "Crunchyroll",
      "actorImage": "https://example.com/sai-sujith.jpg",
      "characterImage": "https://example.com/naruto-character.jpg"
      // Description & Instagram auto-fill from database!
    },
    {
      "actorName": "Govardiniprakash",
      "characterName": "Sakura Haruno",
      "platform": "Crunchyroll, Netflix",
      "actorImage": "https://example.com/govardini.jpg",
      "characterImage": "https://example.com/sakura-character.jpg"
      // Description & Instagram auto-fill from database!
    }
  ],
  "crew": [
    {
      "name": "Govardiniprakash",
      "role": "Script Writer",
      "platform": "Crunchyroll",
      "avatar": "https://example.com/govardini.jpg",
      "projectImage": "https://example.com/naruto-poster.jpg"
      // Description & Instagram auto-fill from database!
    }
  ],
  "dubbingStudios": [
    {
      "name": "Crunchyroll Dubs",
      "role": "Dubbing Studio",
      "platform": "Crunchyroll",
      "avatar": "https://example.com/crunchyroll-logo.jpg",
      "projectImage": "https://example.com/naruto-poster.jpg"
      // Description & Instagram auto-fill from database!
    }
  ],
  "platforms": [
    {
      "name": "Crunchyroll",
      "status": "Available",
      "icon": "https://example.com/crunchyroll-icon.jpg"
    }
  ],
  "trailers": [
    {
      "title": "Official Telugu Trailer",
      "description": "Naruto Classic Telugu Dub Trailer",
      "thumbnail": "https://example.com/trailer-thumb.jpg",
      "videoId": "X50zZ73VNPQ"
    }
  ]
}
```

---

### 🔄 Old Method (Still Works - Manual Override)

If you want to override database info or add unique description for specific post:

```javascript
"cast": [
  {
    "actorName": "Sai Sujith",
    "characterName": "Naruto Uzumaki",
    "platform": "Crunchyroll",
    "actorImage": "https://example.com/sai-sujith.jpg",
    "characterImage": "https://example.com/naruto-character.jpg",
    "description": "Custom description for this specific role",
    "instagram": "custom_instagram"
  }
]
```

**Priority:** Post data > Artists Database
```

### Field-by-Field Explanation:

#### Basic Info:
- **id**: `1` - Unique identifier
- **title**: `"Naruto Classic"` - Anime name
- **year**: `"2002"` - Release year
- **season**: `"Fall"` - Season name
- **rating**: `"8.3"` - IMDb/MAL rating

#### Images:
- **poster**: Vertical poster image URL
- **backdrop**: Horizontal banner image URL

#### Content:
- **genres**: Comma-separated genre list
- **synopsis**: Full anime description
- **spoilerAlert**: `"none"` or `"spoiler"`

#### Production:
- **studio**: Animation studio name
- **format**: Season/Movie info
- **duration**: Episode length
- **totalEpisodes**: Number of episodes

#### Release:
- **premiereDate**: Release date text
- **status**: `"Completed"`, `"Ongoing"`, or `"Upcoming"`
- **broadcast**: Platform info
- **language**: Dub/Sub availability

#### Additional:
- **airSeason**: Same as season
- **platformLabel**: Main platform
- **mrp**: `"Visible"` or `"None"`
- **viewCount**: View count with suffix (M, K)

#### Arrays:
- **categories**: Tags for filtering
- **labels**: Additional tags
- **statistics**: Rating, percentage, views object

#### Cast Array:
Each cast member includes:
- **Actor name** (required) - Used to match with artists-database.js
- **Character name** (required)
- **Actor image** (required)
- **Character image** (required)
- **Platform(s)** (optional) - Can be multiple separated by comma
- **Description** (optional) - Auto-fills from database, can override
- **Instagram** (optional) - Auto-fills from database, can override

#### Crew Array:
Each crew member includes:
- **Name** (required) - Used to match with artists-database.js
- **Role** (required) - Script Writer, Director, etc.
- **Avatar** (required)
- **Project image** (required)
- **Platform(s)** (optional)
- **Description** (optional) - Auto-fills from database, can override
- **Instagram** (optional) - Auto-fills from database, can override

#### Dubbing Studios Array:
Each studio includes:
- **Studio name** (required) - Used to match with artists-database.js
- **Role** (required) - Dubbing Studio, etc.
- **Avatar/Logo** (required)
- **Project image** (required)
- **Platform(s)** (optional)
- **Description** (optional) - Auto-fills from database, can override
- **Instagram** (optional) - Auto-fills from database, can override

**💡 Pro Tip:** Add artists to `artists-database.js` first, then you don't need to add description/instagram in every post!

#### Platforms Array:
Each platform includes:
- Platform name
- Status (Available/Coming Soon)
- Icon/logo URL

#### Trailers Array:
Each trailer includes:
- Title and description
- Thumbnail image
- YouTube video ID (not full URL)

---

## 🗃️ Managing Artists Database

### File: `artists-database.js`

This is your central hub for all artist information. Update once, use everywhere!

### Adding New Artist:

```javascript
window.ARTISTS_DATABASE = {
    // Existing artists...
    
    // Add new artist
    "new_artist_id": {
        name: "Artist Full Name",
        type: "voice_actor",  // or "crew" or "studio"
        instagram: "instagram_username",  // without @
        description: "Brief bio about the artist"
    }
};
```

### Artist Types:
- `"voice_actor"` - Voice actors/actresses
- `"crew"` - Script writers, directors, sound engineers, etc.
- `"studio"` - Dubbing studios

### ID Naming Convention:
- Use lowercase
- Replace spaces with underscore
- Examples:
  - "Sai Sujith" → `"sai_sujith"`
  - "Govardiniprakash" → `"govardiniprakash"`
  - "Crunchyroll Dubs" → `"crunchyroll_dubs"`

### Complete Example:

```javascript
window.ARTISTS_DATABASE = {
    // Voice Actors
    "sai_sujith": {
        name: "Sai Sujith",
        type: "voice_actor",
        instagram: "saisujith_official",
        description: "Talented voice actor known for bringing energetic and emotional characters to life."
    },
    
    "govardiniprakash": {
        name: "Govardiniprakash",
        type: "voice_actor",
        instagram: "govardini_official",
        description: "Versatile voice actress with expertise in strong female characters and comedy roles."
    },
    
    // Crew Members
    "govardini_writer": {
        name: "Govardiniprakash",
        type: "crew",
        instagram: "govardini_official",
        description: "Experienced script writer with expertise in anime adaptations."
    },
    
    // Dubbing Studios
    "crunchyroll_dubs": {
        name: "Crunchyroll Dubs",
        type: "studio",
        instagram: "crunchyroll",
        description: "Professional dubbing studio specializing in anime localization."
    }
};
```

### How Name Matching Works:

The system automatically matches artist names:
1. Exact match with ID
2. Fuzzy match with name field
3. Case-insensitive

**Example:**
- Post has: `"actorName": "Sai Sujith"`
- Database has: `"sai_sujith": { name: "Sai Sujith", ... }`
- ✅ Automatically matched!

### Updating Artist Info:

Just edit `artists-database.js`:
```javascript
"sai_sujith": {
    name: "Sai Sujith",
    type: "voice_actor",
    instagram: "new_instagram_handle",  // Updated!
    description: "Updated bio here"  // Updated!
}
```

All posts using "Sai Sujith" will automatically show updated info!

---

## 📝 Minimal Example (Required Fields Only)

If you want to add a post quickly with just the essential fields:

```javascript
{
  "id": 2,
  "title": "DanDaDan",
  "year": "2024",
  "season": "Fall",
  "rating": "8.5",
  "ageRating": "PG-18",
  "poster": "https://example.com/dandadan-poster.jpg",
  "backdrop": "https://example.com/dandadan-backdrop.jpg",
  "genres": "Action, Comedy, Supernatural",
  "synopsis": "A high school student and his classmate encounter supernatural forces.",
  "spoilerAlert": "none",
  "studio": "Science SARU",
  "format": "Season 01",
  "duration": "24 min",
  "totalEpisodes": "12",
  "premiereDate": "Released on 2024",
  "status": "Ongoing",
  "broadcast": "OTT (Crunchyroll)",
  "language": "Telugu Dub Available",
  "airSeason": "Fall",
  "platformLabel": "Crunchyroll",
  "mrp": "Visible",
  "viewCount": "5M",
  "categories": ["Action", "Comedy", "Crunchyroll"],
  "labels": ["Telugu Dub"],
  "statistics": {
    "rating": "8.5",
    "likedPercentage": "96%",
    "totalViews": "5M"
  },
  "cast": [
    {
      "actorName": "Sai Sujith",
      "characterName": "Okarun",
      "platform": "Crunchyroll",
      "actorImage": "https://example.com/sai.jpg",
      "characterImage": "https://example.com/okarun.jpg"
      "description": "Crunchyroll Dubbing (2024)"
    }
  ],
  "crew": [],
  "dubbingStudios": [],
  "platforms": [
    {
      "name": "Crunchyroll",
      "status": "Available",
      "icon": "https://example.com/cr-icon.jpg"
    }
  ],
  "trailers": []
}
```

**Note**: Empty arrays (`[]`) are required for crew, dubbingStudios, and trailers even if you don't have data.

---

## 🔄 Editing Existing Posts

### Step 1: Load Existing Data
1. Open post-generator.html
2. Click "Load Existing Post" button
3. Select the post ID you want to edit
4. All fields will be populated automatically

### Step 2: Make Changes
1. Edit any fields you want to change
2. Add/remove cast, crew, platforms, or trailers
3. Code updates automatically

### Step 3: Save Changes
1. Copy the updated code
2. Replace the old post in posts-data.js
3. Save the file

---

## 🎨 Voice Artist Page Integration

### How Cast/Crew/Studios Appears on Voice Artist Page:

#### **Card Display:**
- Shows character/project image
- "More Info" badge at bottom
- Minimal, clean design
- Hover effect for better UX

#### **More Info Popup (Click on card):**
When users click on any card, a beautiful popup appears with:

**For Voice Actors:**
- Character image (120x120 rounded)
- Character name with user icon
- Anime name with film icon
- **Description** (if added) - in quote-style box
- Available platforms list with checkmarks

**For Crew Members:**
- Project image (120x120 rounded)
- Role name with department icon
- Anime name with film icon
- **Description** (if added) - in quote-style box
- Available platforms list with checkmarks
- Department icon overlay on image

**For Dubbing Studios:**
- Project image (120x120 rounded)
- Studio name with building icon
- Anime name with film icon
- **Description** (if added) - in quote-style box
- Available platforms list with checkmarks

#### **Popup Features:**
- Smooth fade-in animation
- Click outside to close
- Press Escape key to close
- Close button (X) at top-right
- Mobile responsive design
- Backdrop blur effect
- Professional styling

#### **Benefits:**
- Space-efficient cards (just image + badge)
- All details in organized popup
- Professional presentation
- Easy to add rich descriptions
- Multiple platforms displayed clearly
- Mobile responsive
- Better user experience

#### **Example Description Display:**
```
┌─────────────────────────────────────┐
│  📷 Character Image                 │
│                                     │
│  👤 Naruto Uzumaki                  │
│  🎬 Naruto Classic                  │
│                                     │
│  💬 "Talented voice actor known     │
│      for bringing energetic and     │
│      emotional characters to life   │
│      with dynamic voice range."     │
│                                     │
│  📺 Available Platforms             │
│  ✓ Crunchyroll                      │
│  ✓ Netflix                          │
└─────────────────────────────────────┘
```

---

## 📝 Best Practices

### Images:
- Use high-quality images (minimum 500px width)
- Poster: Vertical orientation (2:3 ratio)
- Backdrop: Horizontal orientation (16:9 ratio)
- Character images: Square or portrait
- Compress images for faster loading

### Descriptions:
- Keep cast descriptions 1-2 sentences
- Focus on voice acting style/expertise
- Keep crew descriptions role-specific
- Mention notable achievements if any

**Good Description Examples:**

✅ **Voice Actor:**
```
"Talented voice actor known for bringing energetic and emotional characters to life with his dynamic voice range."
```

✅ **Crew Member:**
```
"Experienced script writer with expertise in anime adaptations and storytelling. Known for maintaining the essence of original content."
```

✅ **Dubbing Studio:**
```
"Professional dubbing studio specializing in anime localization with state-of-the-art recording facilities."
```

❌ **Too Short:**
```
"Good actor"  // Not descriptive enough
```

❌ **Too Long:**
```
"This is an amazing voice actor who has worked on many projects over the years and has won several awards and is known throughout the industry for his incredible talent and dedication to his craft and has been working since 2010..."  // Too verbose
```

### Platforms:
- Always add platform info for cast/crew
- Use consistent platform names
- Add multiple platforms if available
- Keep platform list updated

### Content:
- Write clear, engaging synopsis
- Use proper grammar and spelling
- Add spoiler alert if needed
- Keep genres accurate

### Organization:
- Use sequential IDs (1, 2, 3...)
- Keep consistent naming conventions
- Add all available cast/crew
- Include all streaming platforms

---

## 🐛 Troubleshooting

### Issue: Code not generating
**Solution**: Make sure ID and Title fields are filled

**Example Fix:**
```javascript
// ❌ Wrong - Missing required fields
{
  "id": ,
  "title": "",
  ...
}

// ✅ Correct
{
  "id": 1,
  "title": "Naruto Classic",
  ...
}
```

### Issue: Cast/Crew/Studios not showing on voice artist page
**Solution**: Check if platform field is filled and posts-data.js is saved

**Example Fix:**
```javascript
// ❌ Wrong - No platform
"cast": [
  {
    "actorName": "Sai Sujith",
    "characterName": "Naruto",
    "platform": "",  // Empty!
    ...
  }
]

// ✅ Correct
"cast": [
  {
    "actorName": "Sai Sujith",
    "characterName": "Naruto",
    "platform": "Crunchyroll",  // Filled!
    ...
  }
]
```

### Issue: Description not appearing in popup
**Solution**: Verify description field is filled in post generator

**Example:**
```javascript
// ❌ Without description
"cast": [
  {
    "actorName": "Sai Sujith",
    "characterName": "Naruto",
    "platform": "Crunchyroll",
    "actorImage": "...",
    "characterImage": "..."
  }
]

// ✅ With description
"cast": [
  {
    "actorName": "Sai Sujith",
    "characterName": "Naruto",
    "platform": "Crunchyroll",
    "actorImage": "...",
    "characterImage": "...",
    "description": "Talented voice actor known for energetic characters"
  }
]
```

### Issue: Images not loading
**Solution**: Check if image URLs are valid and accessible

**Example:**
```javascript
// ❌ Wrong - Invalid URL
"poster": "image.jpg"  // Relative path won't work

// ✅ Correct - Full URL
"poster": "https://example.com/images/poster.jpg"
```

### Issue: Multiple platforms not showing
**Solution**: Separate platforms with comma (e.g., "Crunchyroll, Netflix")

**Example:**
```javascript
// ❌ Wrong - Only one platform shows
"platform": "Crunchyroll Netflix"

// ✅ Correct - Both platforms show
"platform": "Crunchyroll, Netflix"
```

### Issue: Syntax error in posts-data.js
**Solution**: Check for missing commas, brackets, or quotes

**Common Mistakes:**
```javascript
// ❌ Wrong - Missing comma between posts
window.POSTS_DATA = [
  {
    "id": 1,
    "title": "Anime 1"
  }  // Missing comma here!
  {
    "id": 2,
    "title": "Anime 2"
  }
];

// ✅ Correct
window.POSTS_DATA = [
  {
    "id": 1,
    "title": "Anime 1"
  },  // Comma added!
  {
    "id": 2,
    "title": "Anime 2"
  }
];
```

### Issue: Empty arrays causing errors
**Solution**: Always include empty arrays for optional sections

**Example:**
```javascript
// ❌ Wrong - Missing arrays
{
  "id": 1,
  "title": "Anime",
  "cast": [...]
  // Missing crew, dubbingStudios, trailers
}

// ✅ Correct - All arrays present
{
  "id": 1,
  "title": "Anime",
  "cast": [...],
  "crew": [],  // Empty but present
  "dubbingStudios": [],  // Empty but present
  "platforms": [...],
  "trailers": []  // Empty but present
}
```

---

## 🎯 Quick Checklist

Before saving a post, verify:
- ✅ ID is unique
- ✅ Title is correct
- ✅ Poster and backdrop URLs work
- ✅ Synopsis is complete
- ✅ At least one platform added
- ✅ Cast members have descriptions (optional but recommended)
- ✅ Crew members have descriptions (optional but recommended)
- ✅ Dubbing studios have descriptions (optional but recommended)
- ✅ Platform info added for cast/crew/studios
- ✅ Trailer video IDs are correct
- ✅ Statistics are filled
- ✅ Code is copied and pasted correctly in posts-data.js

---

## 📞 Need Help?

If you encounter any issues:
1. Check this guide first
2. Verify all required fields are filled
3. Check browser console for errors (F12)
4. Ensure posts-data.js syntax is correct (no missing commas/brackets)

---

## 🎉 You're All Set!

Now you can easily add and manage anime posts on TADB. The voice artist page will automatically show all cast, crew, and dubbing studios with beautiful More Info popups!

---

## 📚 Quick Reference

### Required Fields:
- ID, Title, Year, Season, Rating
- Poster, Backdrop
- Genres, Synopsis
- Studio, Format, Duration, Episodes
- Status, Broadcast, Language
- Statistics object

### Optional But Recommended:
- Cast with descriptions
- Crew with descriptions
- Dubbing Studios with descriptions
- Multiple platforms per person/studio
- Trailers

### Key Features:
✨ **More Info Popup** - Shows descriptions and platforms  
✨ **Multiple Platforms** - Comma-separated support  
✨ **Rich Descriptions** - Quote-style display  
✨ **Mobile Responsive** - Works on all devices  
✨ **Easy Editing** - Load and update existing posts  

### Remember:
1. Always use full image URLs (https://...)
2. Separate multiple platforms with commas
3. Add descriptions for better user experience
4. Include platform info for cast/crew/studios
5. Check syntax before saving (commas, brackets)
6. Test on voice artist page after adding

---

## 🔗 Related Files

- **artists-database.js** - ⭐ Central artist information (NEW!)
- **post-generator.html** - Post editor tool
- **posts-data.js** - All posts data
- **post-script.js** - Post page logic
- **voice-artist-sync.js** - Voice artist page logic
- **voice-artist-styles.css** - Popup styling

### File Priority:
1. **artists-database.js** - Add artist info here first
2. **posts-data.js** - Add posts, artist info auto-fills
3. **post-generator.html** - Use this to generate post code

---

**Happy posting! 🚀**

For any issues or questions, refer to the troubleshooting section above.
