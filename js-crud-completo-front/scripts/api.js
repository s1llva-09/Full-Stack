//função para obter todas as task
export async function listarTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks')

        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

//criar função para criar uma task
export async function criarTask(taskData) {
    try {
        const response = await fetch('http://localhost:3000/tasks', { //faz a requisição para se conectar com a rota de (task)
            method: 'POST', //informa a API que você quer criar um novo item por isso o metodo POST pois esta enviando um certo tipo de dados
            headers: { //o header esta informando que esta enviando o arquivo .JSON
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskdata) //Converte o (objeto JS) em texto JSON para a API poder receber suas informações
        })

        if (!response.ok) { // se a resposta nao vier com sucesso forca um erro para melhor identificação e tratar no catch
            throw new Error('Erro ao criar task')
        }
        return await response.json() // devolve toda a task criada para o servidor (json-server) para que com isto ele cria o id autoamticamente
    } catch (error) {
        console.error(error)
        throw error
    }
}

//criar função para atualizar uma task pelo id


//criar função para deletar uma task pelo id


//criar função para deletar todas as tasks




