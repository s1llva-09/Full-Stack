// Implemente aqui o CRUD DOM dos livros.
import * as api from "./api.js" //importando api para o script


const listaLivros = document.getElementById("listaLivros") // lista onde vai ser armazenado os livros

const contadorLivros = document.getElementById("contadorLivros") //chama o contador de livros para o script para comunicação com a API

const modal = document.getElementById("modal") //modal 
const modalTitulo = document.getElementById("modalTitulo") //titulo do modal


const tituloInput = document.getElementById("titulo") // input do titulo
const autorInput = document.getElementById("autor") //input do autor
const anoInput = document.getElementById("ano") //input do ano

const bntNovo = document.getElementById("btnNovo") //botao de adicionar livro
const bntCancelar = document.getElementById("cancelar") //botao de cancelar
const bntSalvar = document.getElementById("salvar") //botao de salvar


let livroEditando = null //informa que ao inicar nao tera edição acontencendo


//Em resumo essa função abre o modal e dependendo do valor passado decide se esta cadastrando algo novo ou editando

function abrirModal(modo = "novo", livro = null) { //função que abre o modal para adicionar ou editar          |se nao passar algum valor no modal ele abre como padrao para novo
    modal.classList.remove("hidden") //faz o modal aparecer

    if(modo == "novo") { //verifica o valor passado, se for "novo" vai para cadastro
        //preparar para cadastro do livro
        modalTitulo.innerText = "Novo" //troca o titulo do modal para o titulo do q vc esta cadastrando
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
bntCancelar.addEventListener("click", fecharModal) //ao click fecha o modal

function criarCard(livro) {            
    const card = document.createElement("div") //cria uma div para o card
    card.classList.add("card") // aplica a div do card na classe "card" do css

    const titulo = document.createElement("h3") //cria o h3 para o titulo
    titulo.textContent = livro.titulo //passa a variavel de titulo para o h3

    const autor = document.createElement("p") //cria um paragrafo para nome do autor
    autor.textContent = `Autor: ${livro.autor}` //passa a variavel do nome do autor para o "P"

    const ano = document.createElement("p") //cria um paragrafo com o ano de lançamento do livro
    ano.textContent = `Ano: ${livro.ano}` //passa a variavel do ano do livro para o "P"

    //area dos botões
    const acoes = document.createElement("div") //cria a div dos botões de ações
    acoes.classList.add("acoes") //Adiciona na classe de acoes

    //Botao Editar
    const btnEditar = document.createElement("button") //cria o botao de editar
    btnEditar.textContent = "Editar" // coloca o nome dele como "Editar"
    btnEditar.classList.add("btn", "btn-secundario") // adiciona ele a classe de "btn-secundario"
    btnEditar.addEventListener("click", () => { //abre o modal para edição
        abrirModal("editar", livro)
    })

    //Botao Excluir
    const btnExcluir = document.createElement("button") //cria o botao de excluir
    btnExcluir.textContent = "Excluir"
    btnExcluir.classList.add("btn", "btn-perigo") // adiciona ele a classe de "btn-perigo"
    btnExcluir.addEventListener("click", async () => { //ao clicar no botao ativa a função
        const confirmar = confirm("Deseja excluir o livro?")
        if(!confirmar) return //verifica se ira excluir ou nao

        await api.excluirLivro(livro.id) //chama funcao de exclusao
        await carregarLivro()
    })

    acoes.appendChild(btnEditar) //passa o btnEditar para dentro da div "acoes"
    acoes.appendChild(btnExcluir) //passa o btnExcluir para dentro da div "acoes"

    card.appendChild(titulo) //passa o titulo(h3) para dentro do card(div)
    card.appendChild(autor) //passa o autor(p) para dentro do card(div)
    card.appendChild(ano) //passa o ano(p) para dentro do card(div)
    card.appendChild(acoes) //passa acoes(div) para dentro do card(div)

    listaLivros.appendChild(card) //passa todo o card(div) criado para listaLivros(div)
}

async function carregarLivros() { //uma função async pois contem await
    listaLivros.innerHTML = "" // apaga tudo dentro da (div) Lista de livros para recarregar a lista do zero

    const livros = await api.obterLivros() //chama a função e busca os livros

    livros.forEach((livro) => { //percorre a lista, passa por cada item e retorna cada objeto
        criarCard(livro)
    })

    contadorLivros.textContent = `${livros.length} livros` //pega o tamanho da array e retorna cada item presente
}

bntSalvar.addEventListener("click", async () => {
    const titulo = tituloInput.value //pega o valor digitado de titulo
    const autor = autorInput.value //pega o valor digitado de autor
    const ano = anoInput.value //pega o valor digitado de ano

    if(!titulo || !autor || !ano) { //valida se algum campo esta vazio
        alert("Preencha todos os campos!")
        return
    }

    const livro = { // monta o objeto livro
        titulo, autor, ano
    }

    if (livroEditando == null) { //verifica se esta cadastrando
        await api.criarLivro(livro) //se nao for edição o cadastro é novo
    }else {
        await api.editarLivro(livroEditando.id, livro) //se sim abre a edição
    }

    fecharModal()
    await carregarLivros()
})

carregarLivros()