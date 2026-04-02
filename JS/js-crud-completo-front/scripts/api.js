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
            body: JSON.stringify(taskData) //Converte o (objeto JS) em texto JSON para a API poder receber suas informações
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
export async function atualizarTask(id, taskData) {
    try {
        const respose = await fetch(`http://localhost:3000/tasks/${id}`, { // as informações nesta função ja nao serao enviadas para (task), agora sao enviadas para uma task em especifio
            method: 'PATCH', //o metodo PATCH é usado quando for alterar parte de algum objeto dentro de algum dado em especifico
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData) // aqui é enviado o campo em especifico que voce quer alterar
        })

        if (!response.ok) {
            throw new Error('Erro ao atualizar a task')
        }

        return await respose.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

//criar função para deletar uma task pelo id
export async function deletarTask(id) {
    try {
        const response = await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Erro ao deletar task')
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

//criar função para deletar todas as tasks
export async function deletarTodasTasks() {
    try {
        const tasks = await listarTasks()

        for (const task of tasks) {
            await deletarTask(task.id)
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
