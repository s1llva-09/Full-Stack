const API_URL = 'http://localhost:3000/produtos'

export async function obterProdutos() {
    try {
        //Como eu estou obtendo o produto em si, nao precisa de method, header e body pois estou apenas pedindo informações para o servidor o "fetch" ja age como um GET

        const response = await fetch(API_URL) //esta fazendo a requisição para a API em questão

        if(!response.ok) { //verifica se a resposta teve sucesso
            throw new Error("Erro ao buscar produtos") // cria um erro manualmente para informar que a busca falhou
        }

        return await response.json() //pega o body da resposta e transforma em (Json) e transforma em JS
        
    } catch (error) { //quando alguma parte do try falha ela cai aqui
        console.error(error) //mostra o erro no console
        throw error //repassa o erro pra quem chamou a função em vez de escondelo
    }
}
