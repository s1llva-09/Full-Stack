// Desafio:
import * as api from "./api.js"

const listaFilmes = document.getElementById("listaFilmes") // div da lista dos filmes, onde ira aparecer os cards dos livros
const contadorFilmes = document.getElementById("contadorFilmes") // contador dos cards dos filmes, onde ira mostrar os cards em questão

const modal = document.getElementById("modal") //modal onde vai ser feito o cadastro e a edição dos filmes e onde ira aparecer as informações na tela
const modalTitulo = document.getElementById("modalTitulo") //titulo do modal(titulo do filme)
const tituloInput = document.getElementById("titulo") //Titulo do filme
const diretorInput = document.getElementById("diretor") //input do diretor do movie
const anoInput = document.getElementById("ano") //input do ano do movie

const bntNovo = document.getElementById("bntNovo") //botao de adicionar novo livro
const bntCancelar = document.getElementById("cancelar") //botao de cancelar o cadastro ou edição de um livro em questão
const btnSalvar = document.getElementById("salvar") // botão de salvar o cadastro do livro em questão

let filmeEditando = null

function abrirModal(modo = "novo", filme = null) {
    modal.classList.remove("hidden") //remove a "capa" que esconde o modal para poder aparecer a abrir ele em situações especificar (criar, editar etc)

    
}


// 1. Selecionar os elementos do DOM.
// 2. Criar let filmeEditando = null.
// 3. Fazer abrirModal() e fecharModal().
// 4. Criar criarCard(filme).
// 5. Fazer carregarFilmes().
// 6. Cadastrar filme no botao salvar.
// 7. Editar filme pelo card.
// 8. Excluir filme com confirmacao.

// IDs disponiveis no HTML:
// listaFilmes
// contadorFilmes
// modal
// modalTitulo
// titulo
// diretor
// ano
// btnNovo
// cancelar
// salvar
