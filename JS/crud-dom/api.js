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