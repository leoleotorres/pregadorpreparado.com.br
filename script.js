let videos = []; // will be populated from JSON

// fetch video list from external JSON
fetch('videos.json')
    .then(res => res.json())
    .then(data => {
        videos = data;
        gallery.innerHTML = '';
        videos.forEach(v => gallery.appendChild(createThumbnail(v)));
    })
    .catch(err => console.error('Failed to load video list:', err));

const gallery = document.getElementById('gallery');
const overlay = document.getElementById('overlay');
const player = document.getElementById('player');
const closeBtn = document.getElementById('closeBtn');

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
    div.addEventListener('click', () => openPlayer(video.id));
    return div;
}

function openPlayer(id) {
    const url = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&showinfo=0&controls=1&iv_load_policy=3&fs=0`;
    player.src = url;
    overlay.classList.add('visible');
}

function closePlayer() {
    overlay.classList.remove('visible');
    // delay clearing src to stop playback
    setTimeout(() => (player.src = ''), 300);
}

gallery.innerHTML = '';
videos.forEach(v => gallery.appendChild(createThumbnail(v)));

overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target === closeBtn) {
        closePlayer();
    }
});

closeBtn.addEventListener('click', closePlayer);
