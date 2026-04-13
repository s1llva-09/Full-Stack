import * as api from "./api.js";

const buttonadicionarPensamanetoModal = document.getElementById('buttonadicionarPensamanetoModal');
const divVazia = document.getElementById('divVazia');
const tituloh1 = document.getElementById('tituloh1');
const tituloMeuMural = document.getElementById('tituloMeuMural');

let modal;
let muralContainer;

export function adicionarPensamento() {
    buttonadicionarPensamanetoModal.addEventListener('click', abrirModal);
}

export async function carregarPensamentos() {
    const pensamentos = await api.getPensamento();

    if (pensamentos && pensamentos.length > 0) {
        divVazia.classList.add('oculto'); // esconde só se tiver algo
        pensamentos.forEach(pensamento => criarMuralContainer(pensamento));
    }
}

// Só monta a estrutura — sem listener de ação no botão confirmar
function criarModal() {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');

    const h1Pensamento = document.createElement('h1');
    h1Pensamento.textContent = 'Pensamento';

    const inputPensamento = document.createElement('input');
    inputPensamento.type = 'text';
    inputPensamento.placeholder = 'Digite seu Pensamento';

    const h1Autor = document.createElement('h1');
    h1Autor.textContent = 'Autor';

    const inputAutor = document.createElement('input');
    inputAutor.placeholder = 'Insira o nome do(a) autor(a) ou fonte';

    const modalContainerButtons = document.createElement('div');

    const buttonConfirmar = document.createElement('button');
    buttonConfirmar.textContent = 'Adicionar';

    const buttonFechar = document.createElement('button');
    buttonFechar.textContent = 'Fechar';
    buttonFechar.addEventListener('click', fecharModal);

    modalContainer.append(h1Pensamento, inputPensamento, h1Autor, inputAutor, modalContainerButtons);
    modalContainerButtons.append(buttonConfirmar, buttonFechar);

    return modalContainer;
}

function criarMuralContainer(pensamento) {
    if (!muralContainer) {
        muralContainer = document.createElement('div');
        muralContainer.classList.add('muralContainer');
        tituloMeuMural.after(muralContainer);
    }

    const muralSubContainer = document.createElement('div');
    muralSubContainer.classList.add('muralSubContainer');

    const pPensamento = document.createElement('p');
    pPensamento.textContent = pensamento.nomePensamento;

    const pAutor = document.createElement('p');
    pAutor.textContent = pensamento.autor;

    const botoesContainer = document.createElement('div');
    botoesContainer.classList.add('botoesContainer');

    const btnEditar = document.createElement('button');
    btnEditar.textContent = '✏️';
    btnEditar.classList.add('botaoAcao');

    const btnDeletar = document.createElement('button');
    btnDeletar.textContent = '🗑️';
    btnDeletar.classList.add('botaoAcao');

    btnDeletar.addEventListener('click', async () => {
        await api.deletePensamentos(pensamento.id);
        muralSubContainer.remove();

        // Mostra divVazia se não sobrou nenhum card
        if (muralContainer.children.length === 0) {
            divVazia.classList.remove('oculto');
        }
    });

    // Passa as referências dos <p> para editar in-place (sem reload)
    btnEditar.addEventListener('click', () => {
        abrirModalEdicao(pensamento, pPensamento, pAutor);
    });

    botoesContainer.append(btnEditar, btnDeletar);
    muralSubContainer.append(pPensamento, pAutor, botoesContainer);
    muralContainer.appendChild(muralSubContainer);
}

function abrirModal() {
    if (modal) modal.remove(); // garante que não abre dois

    modal = criarModal();

    const inputs = modal.querySelectorAll('input');
    const btnConfirmar = modal.querySelector('button');

    // Listener de POST só aqui
    btnConfirmar.addEventListener('click', async () => {
        const novoPensamento = {
            nomePensamento: inputs[0].value,
            autor: inputs[1].value
        };
        await api.postPensamentos(novoPensamento);
        location.reload();
    });

    tituloh1.after(modal);
    buttonadicionarPensamanetoModal.classList.add('oculto');
}

function abrirModalEdicao(pensamento, pPensamento, pAutor) {
    if (modal) modal.remove(); // fecha modal anterior se aberto

    modal = criarModal();

    const inputs = modal.querySelectorAll('input');
    const btnConfirmar = modal.querySelector('button');

    // Preenche com os valores atuais
    inputs[0].value = pensamento.nomePensamento;
    inputs[1].value = pensamento.autor;
    btnConfirmar.textContent = 'Salvar';

    // Listener de PUT só aqui — atualiza o card sem reload
    btnConfirmar.addEventListener('click', async () => {
        const atualizado = {
            nomePensamento: inputs[0].value,
            autor: inputs[1].value
        };
        await api.putPensamentos(pensamento.id, atualizado);

        // Atualiza os <p> do card diretamente no DOM
        pPensamento.textContent = atualizado.nomePensamento;
        pAutor.textContent = atualizado.autor;

        fecharModal();
    });

    tituloh1.after(modal);
    buttonadicionarPensamanetoModal.classList.add('oculto');
}

function fecharModal() {
    if (modal) {
        modal.remove();
        modal = null;
        buttonadicionarPensamanetoModal.classList.remove('oculto');
    }
}