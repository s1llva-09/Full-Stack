import * as api from './api.js'

const modal = document.getElementById("modal")

const nomeInput = document.getElementById("nome")
const precoInput = document.getElementById("preco")

const btnNovo = document.getElementById("btnNovo")
const btnSalvar = document.getElementById("salvar")
const btnCancelar = document.getElementById("cancelar")
const modalTitulo = document.getElementById("modalTitulo")
const listaProdutos = document.getElementById("listaProdutos")

let produtoEditando = null // inicia informando que não esta editando nenhuma informação

function abrirModal(modo = "novo", produto = null) {
  modal.classList.remove("hidden")

  if (modo === "novo") {
    modalTitulo.innerText = "Novo Produto"
    nomeInput.value = ""
    precoInput.value = ""
    produtoEditando = null
  } else { //entra no modo de edição caso o modal aberto nao seja "novo"
    modalTitulo.innerText = "Editar Produto" //Muda o titulo
    nomeInput.value = produto.nome // Coloca o noo=vo nome atual no input
    precoInput.value = produto.preco // Informa o novo preço do input
    produtoEditando = produto //guarda o produto que esta sendo editado

    //dps o btnSalvar usa o valor do produtoEditando para alterar as informações e salvar os dados
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

  if (!nome || !preco) {
    alert("Preencha todos os campos!")
    return
  }

  const produto = { //pega o valor dos imputs: nome e preco
    nome, preco //valida e monta o objeto
  }

  if(produtoEditando == null) { //se nao esta editando, chama a função api.criarProduto(produto)
    await api.criarProduto(produto) // chama a API
  }else {
    await api.editarProduto(produtoEditando.id, produto) // se esta editando chama a api de edição usando o id do produto atual
  }

  fecharModal() // fecha o modal de cadastro e envia os dados
  await carregarProdutos() //carrega os dados dos produtos
})

function criarCard(produto) { //pega um produto e desenha um card desse produto na tela

  const card = document.createElement("div") //Cria uma div
  card.classList.add("card") //Adiciona ela na classe card do CSS

  const titulo = document.createElement("h3") //Cria um h3
  titulo.textContent = produto.nome //Adiciona o nome do produto no h3

  const preco = document.createElement("p") //cria o paragrafo
  preco.textContent = `R$ ${Number(produto.preco).toFixed(2)}` //Aloca o preço nele com 2 casas decimais

  card.appendChild(titulo) //Passa o h3 para dentro do div.card
  card.appendChild(preco) //Passa o p para dentro do div.card

  listaProdutos.appendChild(card) //coloca o card com as informações dentro da lista

  const bntEditar = document.createElement("button") // cria o botão
  bntEditar.textContent = "Editar" // deixa o texto visivel

  bntEditar.addEventListener("click", () => { //define oq vai acontecer ao clicar
    abrirModal("editar", produto)//abre o modal no modo de edição e passa o produto atual
  })

  card.appendChild(bntEditar) // faz o botao editar aparecer na tela do html

  const bntExcluir = document.createElement("button") // cria botao de excluir
  bntExcluir.textContent = "Excluir" //deixa o texto de deletar visivel

  bntExcluir.addEventListener("click", async () => { //define oq vai acontecer ao clicar o botão
    const confirmar = confirm("Deseja excluir este produto?") // pergunta ao usuario se ira deletar ou nao
    if (!confirmar) return // se a resposta for nao ele cancela o evento


    await api.excluirProduto(produto.id) //aqui chamo a função da api para exclusão de produtos no HTML
    carregarProdutos() // atualiza a lista e carrega os produtos
  })
  card.appendChild(bntExcluir) // adiciona o botao de exlcuir no card
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