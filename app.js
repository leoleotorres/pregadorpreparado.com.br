// Variável global para armazenar dados dos vídeos
let videosData = null;

// Carregar e exibir vídeos do arquivo JSON
async function loadVideos() {
    try {
        const response = await fetch('videos.json');
        videosData = await response.json();
        
        // Inicializar o player com o vídeo em destaque
        initializePlayerWithFeatured(videosData.featured);
        
        // Renderizar vídeo em destaque
        renderFeatured(videosData.featured);
        
        // Renderizar categorias e vídeos
        renderCategories(videosData.categories);
    } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
    }
}

// Inicializar o player com o vídeo em destaque
function initializePlayerWithFeatured(featured) {
    if (!featured || !featured.id) return;
    
    csPlayer.init("video1", {
        defaultId: featured.id,
        thumbnail: true,
        theme: "default",
        loop: false,
    });
}

// Renderizar vídeo em destaque
function renderFeatured(featured) {
    const container = document.getElementById('featured-container');
    if (!featured) return;
    
    // O elemento de vídeo já existe no HTML, apenas atualizamos a informação
    const videoDiv = document.getElementById('video1');
    if (videoDiv) {
        videoDiv.dataset.videoId = featured.id;
        videoDiv.dataset.videoTitle = featured.title;
    }
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
    csPlayer.init("video1", {
        defaultId: videoId,
        thumbnail: true,
        theme: "default",
        loop: false,
    });
    csPlayer.play("video1");
    
    // Scroll para o player
    document.getElementById('video1').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Carregar vídeos quando a página estiver pronta
document.addEventListener('DOMContentLoaded', loadVideos);
