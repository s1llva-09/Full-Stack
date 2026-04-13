// ==================================================
// UI.JS - Lógica de Interface (Frontend)
// ==================================================
// Este arquivo controla tudo que o usuário vê:
// - Criar cards dinamicamente
// - Abrir/fechar modal
// - Listeners de clique (botões editar, deletar)
// ==================================================

// Importa todas as funções do arquivo api.js
// (api = application programming interface)
import * as api from "./api.js";

// ==================================================
// SELEÇÃO DE ELEMENTOS DO HTML
// ==================================================
// document.getElementById() busca elementos pelo ID definido no HTML

const buttonadicionarPensamanetoModal = document.getElementById('buttonadicionarPensamanetoModal');
const divVazia = document.getElementById('divVazia');
const tituloh1 = document.getElementById('tituloh1');
const tituloMeuMural = document.getElementById('tituloMeuMural');

// ==================================================
// VARIÁVEIS GLOBAIS
// ==================================================
// 'let' = pode mudar durante a execução

let modal;              // Armazena o modal (formulário) quando aberto
let muralContainer;     // Armazena o container onde os cards são inseridos

// ==================================================
// FUNÇÕES EXPORTADAS (públicas)
// ==================================================
// Podem ser usadas por outros arquivos (como main.js)

// configurar o botão "Adicionar pensamentos"
// Adiciona um "ouvinte" (listener) de clique
export function adicionarPensamento() {
    // addEventListener = ficar ouvindo por eventos
    // Quando o usuário clicar no botão, chama abrirModal()
    buttonadicionarPensamanetoModal.addEventListener('click', abrirModal);
}

// buscar pensamentos do banco e criar os cards
export async function carregarPensamentos() {
    //await = esperar a resposta da API
    const pensamentos = await api.getPensamento();

    // Se tiver pensamentos cadastrados:
    if (pensamentos && pensamentos.length > 0) {
        // Esconde a div "vazia" (adiciona classe .oculto)
        divVazia.classList.add('oculto');
        
        // forEach = para cada pensamento, fazer algo
        // Chama criarMuralContainer() para cada um
        pensamentos.forEach(pensamento => criarMuralContainer(pensamento));
    }
    // Se não tiver nada, a divVazia continua visível
}

// ==================================================
// CRIAÇÃO DO MODAL (FORMULÁRIO)
// ==================================================
// Cria a estrutura HTML do modal dinamicamente
// Retorna o elemento pronto para ser inserido no DOM
// Nota: Esta função só cria a estrutura — não insere no HTML ainda!

// Só monta a estrutura — sem listener de ação no botão confirmar
function criarModal() {
    // document.createElement() cria elementos HTML via JavaScript
    // Útil para criar elementos dinamicamente
    
    // Container principal do modal
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');

    // Título "Pensamento"
    const h1Pensamento = document.createElement('h1');
    h1Pensamento.textContent = 'Pensamento';

    // Input para digitar o pensamento
    const inputPensamento = document.createElement('input');
    inputPensamento.type = 'text';                          // tipo texto
    inputPensamento.placeholder = 'Digite seu Pensamento';   // texto de exemplo

    // Título "Autor"
    const h1Autor = document.createElement('h1');
    h1Autor.textContent = 'Autor';

    // Input para digitar o autor/fonte
    const inputAutor = document.createElement('input');
    inputAutor.placeholder = 'Insira o nome do(a) autor(a) ou fonte';

    // Container para os botões
    const modalContainerButtons = document.createElement('div');

    // Botão Confirmar (Adicionar/Salvar)
    const buttonConfirmar = document.createElement('button');
    buttonConfirmar.textContent = 'Adicionar';  // Texto do botão

    // Botão Cancelar (Fechar)
    const buttonFechar = document.createElement('button');
    buttonFechar.textContent = 'Fechar';
    // addEventListener = Listener de clique no botão
    buttonFechar.addEventListener('click', fecharModal);

    // .append() = adicionar elementos filhos
    // Adiciona os elementos ao container
    modalContainer.append(h1Pensamento, inputPensamento, h1Autor, inputAutor, modalContainerButtons);
    modalContainerButtons.append(buttonConfirmar, buttonFechar);

    // Retorna o elemento criado para quem chamou a função
    return modalContainer;
}

// ==================================================
// CRIAÇÃO DO CARD (PENSAMENTO)
// ==================================================
// Cria um card para cada pensamento
// Insere no container muralContainer

function criarMuralContainer(pensamento) {
    // Se o container principal não existir, cria agora
    // Só executa uma vez (na primeira vez que um card é criado)
    if (!muralContainer) {
        muralContainer = document.createElement('div');
        muralContainer.classList.add('muralContainer');
        
        // .after() = inserir após um elemento específico
        // Insere o container após o título "Meu Mural"
        tituloMeuMural.after(muralContainer);
    }

    // Container do card individual
    const muralSubContainer = document.createElement('div');
    muralSubContainer.classList.add('muralSubContainer');

    // Parágrafo com o pensamento
    const pPensamento = document.createElement('p');
    pPensamento.textContent = pensamento.nomePensamento;

    // Parágrafo com o autor
    const pAutor = document.createElement('p');
    pAutor.textContent = pensamento.autor;

    // Container para os botões de ação
    const botoesContainer = document.createElement('div');
    botoesContainer.classList.add('botoesContainer');

    // Botão Editar (lápis)
    const btnEditar = document.createElement('button');
    btnEditar.textContent = '✏️';                 // emoji de lápis
    btnEditar.classList.add('botaoAcao');          // classe para estilo

    // Botão Deletar (lixeira)
    const btnDeletar = document.createElement('button');
    btnDeletar.textContent = '🗑️';                // emoji de lixeira
    btnDeletar.classList.add('botaoAcao');

    // ==================================================
    // LISTENER - DELETAR
    // ==================================================
    // Quando clicar em deletar:
    // 1. Chama a API para remover do banco
    // 2. Remove o card do DOM
    // 3. Se não sobrar nenhum card, mostra a div vazia
    btnDeletar.addEventListener('click', async () => {
        // await = esperar a API responder
        await api.deletePensamentos(pensamento.id);  // Remove do banco
        
        muralSubContainer.remove();                  // Remove do HTML

        // Se não tiver mais cards, mostra mensagem vazia
        if (muralContainer.children.length === 0) {
            divVazia.classList.remove('oculto');     // Remove classe oculto
        }
    });

    // ==================================================
    // LISTENER - EDITAR
    // ==================================================
    // Quando clicar em editar, abre o modal de edição
    // Passa o pensamento atual e as referências dos <p> para atualizar
    btnEditar.addEventListener('click', () => {
        abrirModalEdicao(pensamento, pPensamento, pAutor);
    });

    // Monta o card: adiciona elementos filhos
    botoesContainer.append(btnEditar, btnDeletar);
    muralSubContainer.append(pPensamento, pAutor, botoesContainer);
    
    // .appendChild() = adicionar como último filho
    muralContainer.appendChild(muralSubContainer);
}

// ==================================================
// ABRIR MODAL (ADICIONAR NOVO)
// ==================================================
// Abre o formulário para adicionar um novo pensamento

function abrirModal() {
    // Se já tiver um modal aberto, remove para não duplicar
    if (modal) modal.remove();

    // Cria a estrutura do modal
    modal = criarModal();

    // querySelectorAll() = buscar todos os elementos de um tipo
    const inputs = modal.querySelectorAll('input');   // Os 2 inputs
    const btnConfirmar = modal.querySelector('button');  // O primeiro botão (confirmar)

    // ==================================================
    // LISTENER - CONFIRMAR (CRIAR)
    // ==================================================
    // Quando clicar em confirmar:
    // 1. Pega os valores dos inputs
    // 2. Envia para a API via POST
    // 3. Recarrega a página para atualizar
    btnConfirmar.addEventListener('click', async () => {
        // .value = pega o texto digitado no input
        const novoPensamento = {
            nomePensamento: inputs[0].value,  // Primeiro input = pensamento
            autor: inputs[1].value              // Segundo input = autor
        };
        
        // Envia para o banco de dados
        await api.postPensamentos(novoPensamento);
        
        // location.reload() = recarrega a página
        // Forma simples de atualizar a lista de cards
        location.reload();
    });

    // Insere o modal na página (após o título)
    tituloh1.after(modal);
    
    // Oculta o botão de adicionar enquanto o modal está aberto
    buttonadicionarPensamanetoModal.classList.add('oculto');
}

function abrirModalEdicao(pensamento, pPensamento, pAutor) {
    // Se já tiver um modal aberto, remove para não duplicar
    if (modal) modal.remove();

    // Cria a estrutura do modal
    modal = criarModal();

    // Busca os elementos dentro do modal
    const inputs = modal.querySelectorAll('input');
    const btnConfirmar = modal.querySelector('button');

    // Preenche os inputs com os valores atuais do pensamento
    inputs[0].value = pensamento.nomePensamento;
    inputs[1].value = pensamento.autor;
    
    // Altera o texto do botão
    btnConfirmar.textContent = 'Salvar';

    // ==================================================
    // LISTENER - SALVAR (EDITAR)
    // ==================================================
    // Quando clicar em salvar:
    // 1. Pega os valores dos inputs
    // 2. Envia para a API via PUT (atualizar)
    // 3. Atualiza o card diretamente no DOM (sem recarregar)
    btnConfirmar.addEventListener('click', async () => {
        const atualizado = {
            nomePensamento: inputs[0].value,
            autor: inputs[1].value
        };
        
        // PUT = atualizar registro existente
        await api.putPensamentos(pensamento.id, atualizado);

        // Atualiza o texto dos <p> diretamente
        // Dessa forma não precisa recarregar a página
        pPensamento.textContent = atualizado.nomePensamento;
        pAutor.textContent = atualizado.autor;

        // Fecha o modal
        fecharModal();
    });

    // Insere o modal na página
    tituloh1.after(modal);
    
    // Oculta o botão de adicionar
    buttonadicionarPensamanetoModal.classList.add('oculto');
}

function fecharModal() {
    // Se o modal existir:
    if (modal) {
        modal.remove();           // Remove do HTML
        modal = null;             // Limpa a variável
        buttonadicionarPensamanetoModal.classList.remove('oculto'); // Mostra o botão
    }
}