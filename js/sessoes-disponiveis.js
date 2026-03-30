const listaSessoesDisponiveis = document.getElementById("listaSessoesDisponiveis");

function obterSessoes() {
    return JSON.parse(localStorage.getItem("sessoes")) || [];
}

function renderizarSessoesDisponiveis() {
    const sessoes = obterSessoes();
    listaSessoesDisponiveis.innerHTML = "";

    if (sessoes.length === 0) {
        listaSessoesDisponiveis.innerHTML = `<p class="text-muted">Nenhuma sessão disponível no momento.</p>`;
        return;
    }

    sessoes.forEach((sessao) => {
        listaSessoesDisponiveis.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${sessao.filme}</h5>
                        <p class="card-text"><strong>Sala:</strong> ${sessao.sala}</p>
                        <p class="card-text"><strong>Data/Hora:</strong> ${sessao.dataHora}</p>
                        <p class="card-text"><strong>Preço:</strong> R$ ${parseFloat(sessao.preco).toFixed(2)}</p>
                        <a href="./ingressos.html" class="btn btn-dark">Comprar Ingresso</a>
                    </div>
                </div>
            </div>
        `;
    });
}

renderizarSessoesDisponiveis();