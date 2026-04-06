import * as api from "./api.js";

const lista = document.getElementById("listaAlunos");
const modal = document.getElementById("modal");
const tituloInput = document.getElementById("modalTitulo");

const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cursoInput = document.getElementById("curso");

const btnNovo = document.getElementById("btnNovo");
const btnCancelar = document.getElementById("cancelar");
const btnSalvar = document.getElementById("salvar");

let alunoEditando = null;

function abrirModal(modo = "novo", aluno = null) {
    modal.classList.remove("hidden");

    if (modo === "novo") {
        tituloInput.innerText = "Novo Aluno";
        nomeInput.value = "";
        idadeInput.value = "";
        cursoInput.value = "";
        alunoEditando = null;
    } else {
        tituloInput.innerText = "Editar Dados";
        nomeInput.value = aluno.nome;
        idadeInput.value = aluno.idade;
        cursoInput.value = aluno.curso;
        alunoEditando = aluno;
    }
}

function fecharModal() {
    modal.classList.add("hidden");
}

btnNovo.addEventListener("click", () => abrirModal("novo"));
btnCancelar.addEventListener("click", fecharModal);
btnSalvar.addEventListener("click", async () => {
    const nome = nomeInput.value;
    const idade = idadeInput.value;
    const curso = cursoInput.value;

    if (!nome || !idade || !curso) {
        alert("Preencha todos os dados");
        return;
    }

    const aluno = {
        nome,
        idade,
        curso
    };

    if (alunoEditando == null) {
        aluno.ativo = true;
        await api.criarALunos(aluno);
    } else {
        await api.editarALunos(alunoEditando.id, aluno);
    }

    fecharModal();
    await listarALunos();
});

async function alternarStatus(aluno) {
    await api.editarALunos(aluno.id, { ativo: !aluno.ativo });
    await listarALunos();
}

function criarCard(aluno) {
    const card = document.createElement("div");
    card.classList.add("card");

    if (aluno.ativo === false) {
        card.classList.add("inativo");
    }

    const titulo = document.createElement("h3");
    titulo.textContent = aluno.nome;

    const idade = document.createElement("p");
    idade.textContent = `Idade: ${aluno.idade}`;

    const curso = document.createElement("p");
    curso.textContent = `Curso: ${aluno.curso}`;

    const statusContainer = document.createElement("label");
    statusContainer.classList.add("status-aluno");

    const checkboxAtivo = document.createElement("input");
    checkboxAtivo.type = "checkbox";
    checkboxAtivo.checked = aluno.ativo !== false;
    checkboxAtivo.addEventListener("change", async () => {
        await alternarStatus(aluno);
    });

    const textoStatus = document.createElement("span");
    textoStatus.textContent = checkboxAtivo.checked ? "Ativo" : "Inativo";

    statusContainer.appendChild(checkboxAtivo);
    statusContainer.appendChild(textoStatus);

    const acoes = document.createElement("div");
    acoes.classList.add("acoes");

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => {
        abrirModal("editar", aluno);
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", async () => {
        const confirmar = confirm("Deseja excluir este aluno?");
        if (!confirmar) return;

        await api.excluirALunos(aluno.id);
        await listarALunos();
    });

    acoes.appendChild(btnEditar);
    acoes.appendChild(btnExcluir);

    card.appendChild(titulo);
    card.appendChild(idade);
    card.appendChild(curso);
    card.appendChild(statusContainer);
    card.appendChild(acoes);

    return card;
}

async function listarALunos() {
    lista.innerHTML = "";

    const alunos = await api.listarALunos();

    alunos.forEach((aluno) => {
        const card = criarCard(aluno);
        lista.appendChild(card);
    });
}

listarALunos();
