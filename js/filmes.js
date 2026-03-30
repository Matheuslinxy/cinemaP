const formFilme = document.getElementById("formFilme");
const listaFilmes = document.getElementById("listaFilmes");

function obterFilmes() {
    return JSON.parse(localStorage.getItem("filmes")) || [];
}

function salvarFilmes(filmes) {
    localStorage.setItem("filmes", JSON.stringify(filmes));
}

function renderizarFilmes() {
    const filmes = obterFilmes();
    listaFilmes.innerHTML = "";

    if (filmes.length === 0) {
        listaFilmes.innerHTML = `<p class="text-muted">Nenhum filme cadastrado ainda.</p>`;
        return;
    }

    filmes.forEach((filme, index) => {
        listaFilmes.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${filme.titulo}</h5>
                        <p class="card-text"><strong>Gênero:</strong> ${filme.genero}</p>
                        <p class="card-text"><strong>Descrição:</strong> ${filme.descricao}</p>
                        <p class="card-text"><strong>Classificação:</strong> ${filme.classificacao}</p>
                        <p class="card-text"><strong>Duração:</strong> ${filme.duracao} min</p>
                        <p class="card-text"><strong>Estreia:</strong> ${filme.estreia}</p>
                        <button class="btn btn-danger btn-sm" onclick="excluirFilme(${index})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function excluirFilme(index) {
    const filmes = obterFilmes();
    filmes.splice(index, 1);
    salvarFilmes(filmes);
    renderizarFilmes();
}

formFilme.addEventListener("submit", function(event) {
    event.preventDefault();

    const novoFilme = {
        titulo: document.getElementById("titulo").value,
        genero: document.getElementById("genero").value,
        descricao: document.getElementById("descricao").value,
        classificacao: document.getElementById("classificacao").value,
        duracao: document.getElementById("duracao").value,
        estreia: document.getElementById("estreia").value
    };

    const filmes = obterFilmes();
    filmes.push(novoFilme);
    salvarFilmes(filmes);

    formFilme.reset();
    renderizarFilmes();
});

renderizarFilmes();