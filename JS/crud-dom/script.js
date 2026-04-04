// Implemente aqui o CRUD DOM dos livros.
import * as api from "./api.js" //importando api para o script


const listaLivros = document.getElementById("listaLivros") // lista onde vai ser armazenado os livros

const contadorLivros = document.getElementById("contadorLivros") //chama o contador de livros para o script para comunicação com a API

const modal = document.getElementById("modal") //modal 
const modalTitulo = document.getElementById("modalTiutlo") //titulo do modal


const tituloInput = document.getElementById("titulo") // input do titulo
const autorInput = document.getElementById("autor") //input do autor
const anoInput = document.getElementById("ano") //input do ano

const bntNovo = document.getElementById("bntNovo") //botao de adicionar livro
const bntCancelar = document.getElementById("cancelar") //botao de cancelar
const bntSalvar = document.getElementById("salvar") //botao de salvar


let livroEditando = null //informa que ao inicar nao tera edição acontencendo


//Em resumo essa função abre o modal e dependendo do valor passado decide se esta cadastrando algo novo ou editando

function abrirModal(modo = "novo", livro = null) { //função que abre o modal para adicionar ou editar          |se nao passar algum valor no modal ele abre como padrao para novo
    modal.classList.remove("hidden") //faz o modal aparecer

    if(modo == "novo") { //verifica o valor passado, se for "novo" vai para cadastro
        //preparar para cadastro do livro
        modalTitulo.innerText = "Novo Titulo" //troca o titulo do modal para o titulo do q vc esta cadastrando
        tituloInput.value = "" //limpa o input titulo
        autorInput.value = "" //limpa o input autor
        anoInput.value = "" //limpa o input ano
        livroEditando = null //significa cadastro novo

    }else { //se o valor passado nao for "novo", vai para edição
        //preparar para edição do livro
        modalTitulo.innerText = "Editar Livro" //muda o titulo do modal
        tituloInput.value = livro.titulo //preenche o input com titulo do livro atual
        autorInput.value = livro.autor //preenche o input com o autor atual
        anoInput.value = livro.ano //preenche o input com o ano atual
        livroEditando = livro // guarda o livro que esta editando na variavel
    }
}

function fecharModal() { //função para fechar o modal
    modal.classList.add("hidden")
}

bntNovo.addEventListener("click",() => abrirModal("novo")) //quando o usuario clicar em Novo Livro vai para abrir modal
bntCancelar.addEventListener("click", fecharModal)

function criarCard(livros) {
    const card = document.createElement("div")
    card.classList("modal-card")
}
