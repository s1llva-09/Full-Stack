const API_URL = "http://localhost:3001/livros"

export async function obterLivros() {
    try {                    //fetch age como GET nesta situação
        const response = await fetch(API_URL)//passa o comando para a api pedindo a lista de livros cadastrados

        if(!response.ok) {
            throw new Error("Erro ao obter livros") //caso de erro na resposta da API sinaliza de melhor forma para facil identificação
        }
        return await response.json()// devolve toda a task criada para o servidor (json-server) para que com isto ele cria o id autoamticamente
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function criarLivro(livro) {
    try {
        const response = await fetch(API_URL, { //passa o comando para a API criando um livro
            method: 'POST', //metodo post enviando os dados
            headers: {"Content-Type" : "application/json"}, //informa o envio do arquivo
            body: JSON.stringify(livro) //converte o arquivo Js em Json
        })

        if (!response.ok) { //tras o erro com mais clareza
            throw new Error("Erro ao criar")
        }

        return await response.json() //devolve a task e retona ela para criar um id automatico no BD
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function editarLivro(id, livro) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { //passa o comando para a API criando um livro
            method: 'PATCH', //metodo patch de edição de dados
            headers: {"Content-Type" : "application/json"}, //informa o envio do arquivo
            body: JSON.stringify(livro) //converte o arquivo Js em Json
        })

        if (!response.ok) { //tras o erro com mais clareza
            throw new Error("Erro ao editar")
        }

        return await response.json() //devolve a task e retona ela para criar um id automatico no BD
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function excluirLivro(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { //passa o comando para a API criando um livro
            method: 'DELETE', //metodo DELETE de exclusão de dados
            //ele nao necessita passar header ou body
        })

        if (!response.ok) { //tras o erro com mais clareza
            throw new Error("Erro ao excluir")
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}