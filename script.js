let videos = []; // will be populated from JSON
let featured = null; // featured video from JSON
let categories = []; // categories with videos

// fetch video list from external JSON
fetch('videos.json')
    .then(res => res.json())
    .then(data => {
        featured = data.featured;
        categories = data.categories;
        loadFeaturedVideo(featured);
        gallery.innerHTML = '';
        categories.forEach(category => {
            gallery.appendChild(createCategorySection(category));
        });
    })
    .catch(err => console.error('Failed to load video list:', err));

const gallery = document.getElementById('gallery');
const overlay = document.getElementById('overlay');
const player = document.getElementById('player');
const closeBtn = document.getElementById('closeBtn');
const featuredPlayer = document.getElementById('featuredPlayer');
const featuredTitle = document.getElementById('featuredTitle');
const featuredDescription = document.getElementById('featuredDescription');

function loadFeaturedVideo(video) {
    if (!video) return;
    const url = `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&showinfo=0&controls=1&iv_load_policy=3&fs=0&autoplay=0`;
    featuredPlayer.src = url;
    featuredTitle.textContent = video.title;
    featuredDescription.textContent = video.description;
    hideYouTubeCards(featuredPlayer);
}

function hideYouTubeCards(iframeElement) {
    // Wait 5 seconds before trying to hide
    setTimeout(() => {
        let attempts = 0;
        const maxAttempts = 20;
        
        const hideCards = () => {
            try {
                const iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow?.document;
                console.info('Attempting to access iframe document:', iframeDoc);
                if (iframeDoc) {
                    const element = iframeDoc.querySelector('.ytp-chrome-top.ytp-show-cards-title');
                    console.info('div to hide:', element);
                    if (element) {
                        element.style.visibility = 'hidden';
                        return true;
                    }
                }
            } catch (e) {
                // CORS restriction - can't access iframe
            }
            return false;
        };
        
        // Try multiple times as the element might not be loaded yet
        const interval = setInterval(() => {
            if (hideCards() || attempts >= maxAttempts) {
                clearInterval(interval);
            }
            attempts++;
        }, 200);
    }, 5000);
}

function createCategorySection(category) {
    const section = document.createElement('section');
    section.className = 'category-section';
    
    const titleEl = document.createElement('h2');
    titleEl.className = 'category-title';
    titleEl.textContent = category.title;
    section.appendChild(titleEl);
    
    const galleryEl = document.createElement('div');
    galleryEl.className = 'category-gallery';
    category.videos.forEach(video => {
        galleryEl.appendChild(createThumbnail(video));
    });
    section.appendChild(galleryEl);
    
    return section;
}

function createThumbnail(video) {
    const div = document.createElement('div');
    div.className = 'thumbnail';
    div.innerHTML = `
        <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}" />
        <div class="title">${video.title}</div>
    `;
    if (video.description) {
        const desc = document.createElement('div');
        desc.className = 'description';
        desc.textContent = video.description;
        div.appendChild(desc);
    }
    div.addEventListener('click', () => {
        loadFeaturedVideo(video);
        document.getElementById('featuredSection').scrollIntoView({ behavior: 'smooth' });
    });
    return div;
}

function openPlayer(id) {
    const url = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=0&showinfo=0&controls=0&iv_load_policy=3&fs=0`;
    player.src = url;
    overlay.classList.add('visible');
    hideYouTubeCards(player);
}


overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target === closeBtn) {
        closePlayer();
    }
});

