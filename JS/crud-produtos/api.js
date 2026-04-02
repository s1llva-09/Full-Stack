const API_URL = 'http://localhost:3000/produtos'

export async function obterProdutos() {
    try {
        //Como eu estou obtendo o produto em si, nao precisa de method, header e body pois estou apenas pedindo informações para o servidor o "fetch" ja age como um GET

        const response = await fetch(API_URL) //esta fazendo a requisição para a API em questão
                                //fetch esta agindo como o get
        if(!response.ok) { //verifica se a resposta teve sucesso
            throw new Error("Erro ao buscar produtos") // cria um erro manualmente para informar que a busca falhou
        }

        return await response.json() //pega o body da resposta e transforma em (Json) e transforma em JS

    } catch (error) { //quando alguma parte do try falha ela cai aqui
        console.error(error) //mostra o erro no console
        throw error //repassa o erro pra quem chamou a função em vez de escondelo
    }
}

export async function criarProduto(produto) {
    try {
        const response = await fetch (API_URL, { // faz requisição da api
            method: "POST", //informa a api que vc vai criar um novo produto
            headers: { "Content-Type": "application/json" }, //informando o envio do arquivo JSON
            body: JSON.stringify(produto) //converte JS em JSON para API receber informações
        })

        if (!response.ok) { // se a resposta nao vier com sucesso forca um erro para melhor identificação e tratar no catch
            throw new Error("Erro ao criar produto")
        }

        return await response.json() // devolve toda a task criada para o servidor (json-server) para que com isto ele cria o id autoamticamente
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function editarProduto(id, produto) {
    try {
        const response = await fetch (`${API_URL}/${id}`, {// faz requisição da api
            method: "PATCH",
            headers: {"Content-Type": "application/json"},//informando o envio do arquivo JSON
            body:JSON.stringify(produto)//converte JS em JSON para API receber informações
        })

        if(!response.ok) {// se a resposta nao vier com sucesso forca um erro para melhor identificação e tratar no catch

            throw new Error("Erro ao editar")
        }

        return await response.json() // devolve toda a task criada para o servidor (json-server) para que com isto ele cria o id autoamticamente

    } catch (error) {
        console.error(error)
        throw error
    }
}