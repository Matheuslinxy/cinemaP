const formSessao = document.getElementById("formSessao");
const selectFilme = document.getElementById("filme");
const selectSala = document.getElementById("sala");
const listaSessoes = document.getElementById("listaSessoes");

function obterFilmes() {
    return JSON.parse(localStorage.getItem("filmes")) || [];
}

function obterSalas() {
    return JSON.parse(localStorage.getItem("salas")) || [];
}

function obterSessoes() {
    return JSON.parse(localStorage.getItem("sessoes")) || [];
}

function salvarSessoes(sessoes) {
    localStorage.setItem("sessoes", JSON.stringify(sessoes));
}

function carregarFilmes() {
    const filmes = obterFilmes();
    selectFilme.innerHTML = `<option value="">Selecione um filme</option>`;

    filmes.forEach((filme, index) => {
        selectFilme.innerHTML += `<option value="${index}">${filme.titulo}</option>`;
    });
}

function carregarSalas() {
    const salas = obterSalas();
    selectSala.innerHTML = `<option value="">Selecione uma sala</option>`;

    salas.forEach((sala, index) => {
        selectSala.innerHTML += `<option value="${index}">${sala.nome}</option>`;
    });
}

function renderizarSessoes() {
    const sessoes = obterSessoes();
    listaSessoes.innerHTML = "";

    if (sessoes.length === 0) {
        listaSessoes.innerHTML = `<p class="text-muted">Nenhuma sessão cadastrada ainda.</p>`;
        return;
    }

    sessoes.forEach((sessao, index) => {
        listaSessoes.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${sessao.filme}</h5>
                        <p class="card-text"><strong>Sala:</strong> ${sessao.sala}</p>
                        <p class="card-text"><strong>Data/Hora:</strong> ${sessao.dataHora}</p>
                        <p class="card-text"><strong>Preço:</strong> R$ ${parseFloat(sessao.preco).toFixed(2)}</p>
                        <p class="card-text"><strong>Idioma:</strong> ${sessao.idioma}</p>
                        <p class="card-text"><strong>Formato:</strong> ${sessao.formato}</p>
                        <button class="btn btn-danger btn-sm" onclick="excluirSessao(${index})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function excluirSessao(index) {
    const sessoes = obterSessoes();
    sessoes.splice(index, 1);
    salvarSessoes(sessoes);
    renderizarSessoes();
}

formSessao.addEventListener("submit", function(event) {
    event.preventDefault();

    const filmes = obterFilmes();
    const salas = obterSalas();

    const indiceFilme = selectFilme.value;
    const indiceSala = selectSala.value;

    const novaSessao = {
        filme: filmes[indiceFilme].titulo,
        sala: salas[indiceSala].nome,
        dataHora: document.getElementById("dataHora").value,
        preco: document.getElementById("preco").value,
        idioma: document.getElementById("idioma").value,
        formato: document.getElementById("formato").value
    };

    const sessoes = obterSessoes();
    sessoes.push(novaSessao);
    salvarSessoes(sessoes);

    formSessao.reset();
    renderizarSessoes();
});

carregarFilmes();
carregarSalas();
renderizarSessoes();