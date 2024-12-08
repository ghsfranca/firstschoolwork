document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd4073fb5d912ce7486c2d5c2a3dbca16';
    const baseUrl = 'https://api.themoviedb.org/3/';
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsSection = document.getElementById('results');

    async function searchSeries(query) {
        try {
            const response = await fetch(`${baseUrl}search/tv?api_key=${apiKey}&language=pt-BR&query=${query}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar séries');
            }
            const data = await response.json();
            displayResults(data.results);
        } catch (error) {
            console.error(error);
            resultsSection.innerHTML = '<p>Erro ao carregar séries.</p>';
        }
    }

    function displayResults(series) {
        resultsSection.innerHTML = '';
        if (series.length === 0) {
            resultsSection.innerHTML = '<p>Nenhuma série encontrada.</p>';
            return;
        }

        series.forEach(serie => {
            const card = document.createElement('div');
            card.classList.add('col');

            const image = serie.poster_path
                ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                : 'assets/img/placeholder.jpg';

            card.innerHTML = `
            <div class="card h-100">
                <img src="${image}" class="card-img-top" alt="${serie.name}">
                <div class="card-body">
                    <h5 class="card-title">${serie.name}</h5>
                    <p class="card-text">
                        ${serie.overview
                    ? (serie.overview.length > 200
                        ? serie.overview.slice(0, 200) + '...'
                        : serie.overview)
                    : 'Descrição não disponível.'
                }
                    </p>
                    <button class="btn btn-primary" onclick="redirectToDetails(${serie.id})">Ver detalhes</button>
                </div>
            </div>
        `;


            resultsSection.appendChild(card);
        });
    }


    /*   searchButton.addEventListener('click', () => {
           const query = searchInput.value.trim();
           if (query) {
               searchSeries(query);
           } else {
               alert('Digite um texto para pesquisar!');
           }
       });
       */
    searchSeries("Arcane");

});
function redirectToDetails(seriesId) {
    window.location.href = `detalhes.html?id=${seriesId}`;
}