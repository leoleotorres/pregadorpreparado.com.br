// Carregar e exibir vídeos do arquivo JSON
async function loadVideos() {
    try {
        const response = await fetch('videos.json');
        const data = await response.json();
        
        // Renderizar vídeo em destaque
        renderFeatured(data.featured);
        
        // Renderizar categorias e vídeos
        renderCategories(data.categories);
    } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
    }
}

// Renderizar vídeo em destaque
function renderFeatured(featured) {
    const container = document.getElementById('featured-container');
    if (!featured) return;
    
    const videoElement = createVideoElement(featured);
    container.appendChild(videoElement);
}

// Renderizar categorias e seus vídeos
function renderCategories(categories) {
    const section = document.getElementById('categories-section');
    section.innerHTML = ''; // Limpar conteúdo anterior
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.id = `category-${category.id}`;
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.title;
        categoryDiv.appendChild(categoryTitle);
        
        const videosContainer = document.createElement('div');
        videosContainer.className = 'videos-grid';
        
        category.videos.forEach(video => {
            const videoElement = createVideoElement(video);
            videosContainer.appendChild(videoElement);
        });
        
        categoryDiv.appendChild(videosContainer);
        section.appendChild(categoryDiv);
    });
}

// Criar elemento de vídeo
function createVideoElement(video) {
    const videoDiv = document.createElement('div');
    videoDiv.className = 'video-item';
    videoDiv.onclick = () => playVideo(video.id, video.title);
    
    const thumbnail = document.createElement('img');
    thumbnail.src = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
    thumbnail.alt = video.title;
    thumbnail.className = 'video-thumbnail';
    thumbnail.onerror = function() {
        this.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
    };
    
    const playIcon = document.createElement('div');
    playIcon.className = 'play-icon';
    playIcon.innerHTML = '▶';
    
    const info = document.createElement('div');
    info.className = 'video-info';
    
    const title = document.createElement('h3');
    title.textContent = video.title;
    
    const description = document.createElement('p');
    description.textContent = video.description;
    
    info.appendChild(title);
    info.appendChild(description);
    
    videoDiv.appendChild(thumbnail);
    videoDiv.appendChild(playIcon);
    videoDiv.appendChild(info);
    
    return videoDiv;
}

// Função para reproduzir vídeo
function playVideo(videoId, title) {
    csPlayer.setVideoId("video1", videoId);
    csPlayer.play("video1");
    document.querySelector('.video-box h1').textContent = title;
    
    // Scroll para o player
    document.querySelector('.video-box').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Carregar vídeos quando a página estiver pronta
document.addEventListener('DOMContentLoaded', loadVideos);
