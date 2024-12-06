document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd4073fb5d912ce7486c2d5c2a3dbca16';
    const baseUrl = 'https://api.themoviedb.org/3/';

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
    }

    function displayCast(cast) {
        const castSection = document.querySelector('#cast-section');
        castSection.innerHTML = '';  

        cast.forEach(actor => {
            const actorCard = document.createElement('div');
            actorCard.classList.add('col');

            actorCard.innerHTML = `
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" class="card-img-top" alt="${actor.name}">
                    <div class="card-body">
                        <h5 class="card-title">${actor.name}</h5>
                        <p class="card-text">${actor.character}</p>
                    </div>
                </div>
            `;
            castSection.appendChild(actorCard);
        });
    }

    fetchSeriesDetails();
    fetchCast();
});
