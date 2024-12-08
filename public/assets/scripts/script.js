document.addEventListener('DOMContentLoaded', () => {
    const dbUrl = 'http://localhost:3000/criador';
    const API_KEY = 'd4073fb5d912ce7486c2d5c2a3dbca16';
    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    const JSON_SERVER_URL = 'http://localhost:3000';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


    fetch(dbUrl)
        .then(response => response.json())
        .then(data => {
            const criador = data[0];
            document.getElementById('avatar').src = criador.avatar || 'assets/img/naoeia.jpg';
            document.getElementById('nomeCriador').textContent = criador.nome;
            document.getElementById('cursoCriador').textContent = criador.curso;
            document.getElementById('turmaCriador').textContent = criador.turma;
            document.getElementById('emailCriador').textContent = criador.email;
            document.getElementById('bioCriador').textContent = criador.bio;

            const linksSociaisDiv = document.getElementById('linksSociais');
            if (criador.git) {
                const gitLink = document.createElement('a');
                gitLink.href = criador.git;
                gitLink.classList.add('text-decoration-none', 'fab', 'fa-github', 'fa-lg', 'me-3')
                linksSociaisDiv.appendChild(gitLink);
            }
            if (criador.twitter) {
                const twitterLink = document.createElement('a');
                twitterLink.href = criador.twitter;
                twitterLink.classList.add('text-decoration-none', 'fab', 'fa-twitter', 'fa-lg', 'me-3')
                linksSociaisDiv.appendChild(twitterLink);
            }
            if (criador.insta) {
                const instaLink = document.createElement('a');
                instaLink.href = criador.insta;
                instaLink.classList.add('text-decoration-none', 'fab', 'fa-instagram', 'fa-lg', 'me-3')
                linksSociaisDiv.appendChild(instaLink);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os dados do criador:', error);
        });

    // Carregar séries populares
    function loadPopularSeries() {
        const url = `${TMDB_BASE_URL}/tv/popular?api_key=${API_KEY}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const seriesList = data.results;
                const carouselContainer = document.getElementById('carouselItems');
                carouselContainer.innerHTML = '';
                seriesList.forEach((series, index) => {
                    const isActive = index === 0 ? 'active' : '';
                    carouselContainer.innerHTML += `
                        <div class="carousel-item ${isActive}">
                            <img src="${IMAGE_BASE_URL}${series.poster_path}" class="d-block w-100" alt="${series.name}">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${series.name}</h5>
                                <p>${series.overview}</p>
                            </div>
                        </div>`;
                });
            })
            .catch(error => console.error('Erro ao carregar séries populares:', error));
    }

    // Carregar novas séries
    function loadNewSeries() {
        const url = `${TMDB_BASE_URL}/tv/airing_today?api_key=${API_KEY}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const seriesList = data.results;
                const newSeriesContainer = document.getElementById('novasSeries');
                newSeriesContainer.innerHTML = '';
                seriesList.forEach(series => {
                    newSeriesContainer.innerHTML += `
                        <div class="col">
                            <div class="card">
                                <img src="${IMAGE_BASE_URL}${series.poster_path}" class="card-img-top" alt="${series.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${series.name}</h5>
                                    <p class="card-text">${series.overview.substring(0, 100)}...</p>
                                    <a href="detalhes.html?id=${series.id}" class="btn btn-primary">Detalhes</a>
                                </div>
                            </div>
                        </div>`;
                });
            })
            .catch(error => console.error('Erro ao carregar séries recentes:', error));
    }


    function loadFavoriteSeries() {
        fetch(`${JSON_SERVER_URL}/favorites`)
            .then(response => response.json())
            .then(favorites => {
                const favoritesContainer = document.getElementById('seriesFavoritas');
                favoritesContainer.innerHTML = ''; 
                favorites.forEach(series => {
                    favoritesContainer.innerHTML += `
                        <div class="col">
                            <div class="card">
                                <img src="${IMAGE_BASE_URL}${series.poster_path}" class="card-img-top" alt="${series.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${series.name}</h5>
                                    <p class="card-text">${series.overview.substring(0, 100)}...</p>
                                    <a href="detalhes.html?id=${series.id}" class="btn btn-primary">Detalhes</a>
                                </div>
                            </div>
                        </div>`;
                });
            })
            .catch(error => console.error('Erro ao carregar séries favoritas:', error));
    }


    loadPopularSeries();
    loadNewSeries();
    loadFavoriteSeries();
});
