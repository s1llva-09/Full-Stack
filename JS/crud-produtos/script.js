import { createElement } from 'react'
import * as api from './api.js'

const modal = document.getElementById("modal")

const nomeInput = document.getElementById("nome")
const precoInput = document.getElementById("preco")

const btnNovo = document.getElementById("btnNovo")
const btnSalvar = document.getElementById("salvar")
const btnCancelar = document.getElementById("cancelar")
const modalTitulo = document.getElementById("modalTitulo")
const listaProdutos = document.getElementById("listaProdutos")

let produtoEditando = null

function abrirModal(modo = "novo", produto = null) {
  modal.classList.remove("hidden")

  if (modo === "novo") {
    modalTitulo.innerText = "Novo Produto"
    nomeInput.value = ""
    precoInput.value = ""
    produtoEditando = null
  } else {
    modalTitulo.innerText = "Editar Produto"
    nomeInput.value = produto.nome
    precoInput.value = produto.preco
    produtoEditando = produto
  }
}

function fecharModal() {
  modal.classList.add("hidden")
}

btnNovo.addEventListener("click", () => abrirModal("novo"))
btnCancelar.addEventListener("click", fecharModal)
btnSalvar.addEventListener("click", async () => {
  const nome = nomeInput.value
  const preco = precoInput.value

  if (!nome && !preco) {
    alert("Preencha todos os campos!")
    return
  }

  await api.criarProduto({ nome, preco })

  fecharModal()
})

function criarCard(produto) { //pega um produto e desenha um card desse produto na tela

  const card = document.createElement("div") //Cria uma div
  card.classList.add("card") //Adiciona ela na classe card do CSS

  const titulo = document.createElement("h3") //Cria um h3
  card.textContent = produto.nome //Adiciona o nome do produto no h3

  const preco = document.createElement("p") //cria o paragrafo
  preco.textContent = `R$ ${Number(produto.preco).toFixed(2)}` //Aloca o preço nele com 2 casas decimais

  card.appendChild(titulo) //Passa o h3 para dentro do div.card
  card.appendChild(preco) //Passa o p para dentro do div.card

  listaProdutos.appendChild(card) //coloca o card com as informações dentro da lista
}

async function carregarProdutos() { //precisa estar aqui pois tem await na função
  listaProdutos.innerHTML = "" //limpa tudo que ja esta dentro da div criada de produtos

  const produtos = await api.obterProdutos() //aqui eu chamo a função feita obter produtos da api, vai buscar os produtos do json e devolver uma array

  produtos.forEach((produto) => { //o foreach percorre toda a array para procurar os produtos cadastrados
    criarCard(produto) //cria um card para cada produto cadastrado
  })
}

//criarCard() desenha o card de um produto
// pega todos os produtos e chama criarCard() varias vezes
carregarProdutos()
function criarCard(produto) { // transforma um objeto da api em card visual na tela
  const card = document.createElement("div")
  card.classList.add("card")

  const titulo = document.createElement("h3")
  titulo.innerText = produto.nome

  const preco = document.createElement(p)
  preco.innerText = "R$" + Number(produto.preco).toFixed(2).replace(".", ",")

  const acoes = document.createElement("div")
  acoes.classList.add("acoes")

  const btnEditar = document.createElement("button")
  btnEditar.clas.add("btn-primario")
  btnEditar.innerText = "Editar"
  btnEditar.addEventListener("click", () => {
    abrirModal("editara", produto)
  })

}
>>>>>>> 4e68e4f2677bd5a549dc0e93841b491f9ac311f5
