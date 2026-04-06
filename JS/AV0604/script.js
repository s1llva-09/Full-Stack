import * as api from "./api.js"

const lista = document.getElementById("listaAlunos");
const modal = document.getElementById("modal");
const tituloInput = document.getElementById("modalTitulo")

const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cursoInput = document.getElementById("curso");

const btnNovo = document.getElementById("btnNovo");
const btnCancelar = document.getElementById("cancelar");
const btnSalvar = document.getElementById("salvar");

let alunoEditando = null;

function abrirModal(modo = "novo", aluno = null) {
    modal.classList.remove("hidden");
    if (modo == "novo") {
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
    const nome = nomeInput.value
    const idade = idadeInput.value
    const curso = cursoInput.value

    if(!nome || !idade || !curso) {
        alert("preencha todos os dados")
        return
    }

    const aluno = {
        nome, idade, curso
    }

    if(alunoEditando == null) {
        await api.criarALunos(aluno)
    }else {
        await api.editarALunos(alunoEditando.id, aluno)
    }

    fecharModal();
})

function criarCard(aluno) {
    const card = document.createElement("div");
    card.className = "card";

    if (aluno.ativo === false) {
        card.classList.add("inativo");
    }

    const nome = document.createElement("h3");
    nome.innerText = aluno.nome;

    const idade = document.createElement("p");
    idade.innerText = `Idade: ${aluno.idade}`;

    const curso = document.createElement("p");
    curso.innerText = `Curso: ${aluno.curso}`;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.innerText = "Editar";
    btnEditar.addEventListener("click", () => abrirModal("editar", aluno));

    const btnExcluir = document.createElement("button");
    btnExcluir.innerText = "Excluir";
    btnExcluir.addEventListener("click", async () => {
        await api.excluirAluno(aluno.id);
    });

    acoes.appendChild(btnEditar);
    acoes.appendChild(btnExcluir);

    card.appendChild(nome);
    card.appendChild(idade);
    card.appendChild(curso);
    card.appendChild(acoes);

    return card;
}

async function listarALunos(alunos) {
    
}
//listarAlunos
//criarALuno()
//editarALuno()
//excluirAluno()
//excluirAluno
//alternarStatus() (esse aqui eu sei nem por onde começa meu)
