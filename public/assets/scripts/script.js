document.addEventListener('DOMContentLoaded', () => {

    const dbUrl = 'http://localhost:3000/criador'; 


    fetch(dbUrl)
        .then(response => response.json())
        .then(data => {
            
            const criador = data[0]; 
            document.getElementById('avatar').src = criador.avatar;
            document.getElementById('nomeCriador').textContent = criador.nome;
            document.getElementById('cursoCriador').textContent = criador.curso;
            document.getElementById('turmaCriador').textContent = criador.turma;
            document.getElementById('emailCriador').textContent = criador.email;
            document.getElementById('bioCriador').textContent = criador.bio;


            const linksSociaisDiv = document.getElementById('linksSociais');
            if (criador.git) {
                const gitLink = document.createElement('a');
                gitLink.href = criador.git;
                gitLink.textContent = 'GitHub';
                gitLink.classList.add('me-3');
                linksSociaisDiv.appendChild(gitLink);
            }
            if (criador.twitter) {
                const twitterLink = document.createElement('a');
                twitterLink.href = criador.twitter;
                twitterLink.textContent = 'Twitter';
                twitterLink.classList.add('me-3');
                linksSociaisDiv.appendChild(twitterLink);
            }
            if (criador.insta) {
                const instaLink = document.createElement('a');
                instaLink.href = criador.insta;
                instaLink.textContent = 'Instagram';
                linksSociaisDiv.appendChild(instaLink);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os dados do criador:', error);
        });
});
