const formIngresso = document.getElementById("formIngresso");
const selectSessao = document.getElementById("sessao");
const listaIngressos = document.getElementById("listaIngressos");

function obterSessoes() {
    return JSON.parse(localStorage.getItem("sessoes")) || [];
}

function obterIngressos() {
    return JSON.parse(localStorage.getItem("ingressos")) || [];
}

function salvarIngressos(ingressos) {
    localStorage.setItem("ingressos", JSON.stringify(ingressos));
}

function carregarSessoes() {
    const sessoes = obterSessoes();
    selectSessao.innerHTML = `<option value="">Selecione uma sessão</option>`;

    sessoes.forEach((sessao, index) => {
        selectSessao.innerHTML += `
            <option value="${index}">
                ${sessao.filme} - ${sessao.sala} - ${sessao.dataHora}
            </option>
        `;
    });
}

function renderizarIngressos() {
    const ingressos = obterIngressos();
    listaIngressos.innerHTML = "";

    if (ingressos.length === 0) {
        listaIngressos.innerHTML = `<p class="text-muted">Nenhum ingresso vendido ainda.</p>`;
        return;
    }

    ingressos.forEach((ingresso, index) => {
        listaIngressos.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${ingresso.cliente}</h5>
                        <p class="card-text"><strong>Sessão:</strong> ${ingresso.sessao}</p>
                        <p class="card-text"><strong>CPF:</strong> ${ingresso.cpf}</p>
                        <p class="card-text"><strong>Assento:</strong> ${ingresso.assento}</p>
                        <p class="card-text"><strong>Pagamento:</strong> ${ingresso.pagamento}</p>
                        <button class="btn btn-danger btn-sm" onclick="excluirIngresso(${index})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function excluirIngresso(index) {
    const ingressos = obterIngressos();
    ingressos.splice(index, 1);
    salvarIngressos(ingressos);
    renderizarIngressos();
}

formIngresso.addEventListener("submit", function(event) {
    event.preventDefault();

    const sessoes = obterSessoes();
    const indiceSessao = selectSessao.value;

    const novoIngresso = {
        sessao: `${sessoes[indiceSessao].filme} - ${sessoes[indiceSessao].sala} - ${sessoes[indiceSessao].dataHora}`,
        cliente: document.getElementById("cliente").value,
        cpf: document.getElementById("cpf").value,
        assento: document.getElementById("assento").value,
        pagamento: document.getElementById("pagamento").value
    };

    const ingressos = obterIngressos();
    ingressos.push(novoIngresso);
    salvarIngressos(ingressos);

    formIngresso.reset();
    renderizarIngressos();
});

carregarSessoes();
renderizarIngressos();