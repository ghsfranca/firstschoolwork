document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd4073fb5d912ce7486c2d5c2a3dbca16';
    const baseUrl = 'https://api.themoviedb.org/3/';
    const JSON_SERVER_URL = 'http://localhost:3000/favorites';

    const urlParams = new URLSearchParams(window.location.search);
    const seriesId = urlParams.get('id');

    async function fetchSeriesDetails() {
        try {
            const response = await fetch(`${baseUrl}tv/${seriesId}?api_key=${apiKey}&language=pt-BR`);
            if (!response.ok) {
                throw new Error('Falha ao carregar detalhes da série');
            }
            const data = await response.json();
            if (data) {
                displaySeriesDetails(data);
            }
        } catch (error) {
            console.error(error);
            document.querySelector('#serie-titulo').textContent = 'Erro ao carregar detalhes da série';
        }
    }

    async function fetchCast() {
        try {
            const response = await fetch(`${baseUrl}tv/${seriesId}/credits?api_key=${apiKey}&language=pt-BR`);
            if (!response.ok) {
                throw new Error('Falha ao carregar elenco');
            }
            const data = await response.json();
            if (data.cast) {
                displayCast(data.cast);
            }
        } catch (error) {
            console.error(error);
            document.querySelector('#cast-section').innerHTML = '<p>Erro ao carregar o elenco.</p>';
        }
    }

    function displaySeriesDetails(data) {
        document.title = data.name;

        const titleElement = document.querySelector('#serie-titulo');
        titleElement.textContent = data.name;

        const imageElement = document.querySelector('#serie-imagem img');
        const imagePath = data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : 'https://via.placeholder.com/300x400';
        imageElement.src = imagePath;
        imageElement.alt = `Imagem de ${data.name}`;

        const sinopseElement = document.querySelector('#serie-sinopse');
        sinopseElement.innerHTML = `
            <h2 class="mb-2">Sinopse</h2>
            <p>${data.overview || 'Sinopse não disponível.'}</p>
        `;


        const addFavoriteButton = document.createElement('button');
        addFavoriteButton.id = 'add-favorite-btn';
        addFavoriteButton.textContent = 'Adicionar aos Favoritos';
        addFavoriteButton.style.display = 'inline-block';  

        addFavoriteButton.addEventListener('click', () => addFavoriteSeries(data));


        sinopseElement.appendChild(addFavoriteButton);
    }

    function displayCast(cast) {
        const castSection = document.querySelector('#cast-section');
        castSection.innerHTML = '';

        cast.forEach(actor => {
            const actorCard = document.createElement('div');
            actorCard.classList.add('col');

            const profileImage = actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : 'https://via.placeholder.com/150?text=No+Image';

            actorCard.innerHTML = `
                <div class="card">
                    <img src="${profileImage}" class="card-img-top" alt="${actor.name}">
                    <div class="card-body">
                        <h5 class="card-title">${actor.name}</h5>
                        <p class="card-text">${actor.character}</p>
                    </div>
                </div>
            `;
            castSection.appendChild(actorCard);
        });
    }


    function addFavoriteSeries(series) {
        const favoriteData = {
            id: series.id,
            name: series.name,
            poster_path: series.poster_path,
            overview: series.overview
        };

        fetch(JSON_SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(favoriteData),
        })
            .then(response => {
                if (response.ok) {
                    alert('Série adicionada aos favoritos!');
                } else {
                    throw new Error('Erro ao adicionar aos favoritos');
                }
            })
            .catch(error => {
                console.error('Erro ao adicionar série aos favoritos:', error);
                alert('Erro ao adicionar aos favoritos');
            });
    }

    fetchSeriesDetails();
    fetchCast();
});
