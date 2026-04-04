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

function abrirModal() { //função que abre o modal para adicionar ou editar
    modal.classList.remove("hidden")

    if(modo == "novo") {
        //preparar para cadastro do livro
        
    }else {
        //preparar para edição do livro
    }
}

function fecharModal() { //função para fechar o modal
    modal.classList.add("hidden")
}

bntNovo.addEventListener("click",() => abrirModal("novo"))
bntCancelar.addEventListener("click", fecharModal)

