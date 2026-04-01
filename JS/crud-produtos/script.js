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

