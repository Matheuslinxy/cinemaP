const formSala = document.getElementById("formSala");
const listaSalas = document.getElementById("listaSalas");

function obterSalas() {
    return JSON.parse(localStorage.getItem("salas")) || [];
}

function salvarSalas(salas) {
    localStorage.setItem("salas", JSON.stringify(salas));
}

function renderizarSalas() {
    const salas = obterSalas();
    listaSalas.innerHTML = "";

    if (salas.length === 0) {
        listaSalas.innerHTML = `<p class="text-muted">Nenhuma sala cadastrada ainda.</p>`;
        return;
    }

    salas.forEach((sala, index) => {
        listaSalas.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${sala.nome}</h5>
                        <p class="card-text"><strong>Capacidade:</strong> ${sala.capacidade} lugares</p>
                        <p class="card-text"><strong>Tipo:</strong> ${sala.tipo}</p>
                        <button class="btn btn-danger btn-sm" onclick="excluirSala(${index})">Excluir</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function excluirSala(index) {
    const salas = obterSalas();
    salas.splice(index, 1);
    salvarSalas(salas);
    renderizarSalas();
}

formSala.addEventListener("submit", function(event) {
    event.preventDefault();

    const novaSala = {
        nome: document.getElementById("nomeSala").value,
        capacidade: document.getElementById("capacidade").value,
        tipo: document.getElementById("tipoSala").value
    };

    const salas = obterSalas();
    salas.push(novaSala);
    salvarSalas(salas);

    formSala.reset();
    renderizarSalas();
});

renderizarSalas();