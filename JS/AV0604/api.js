API_URL = "http://localhost:3000/alunos"

export async function listarALunos() {
    try {                       //fetch age como get
        const response = await fetch (API_URL)

        if(!response.ok) {
            throw new Error("Erro na Listagem")
        }

        return await response.json()
    } catch (error) {
        console.error(error)  
        throw error
    }
}

export async function criarALunos(aluno) {
    try {                       
        const response = await fetch (API_URL, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(aluno)
        })

        if(!response.ok) {
            throw new Error("Erro na criação")
        }

        return await response.json()
    } catch (error) {
        console.error(error)  
        throw error
    }
}

export async function editarALunos(id, aluno) {
    try {
        const response = await fetch (`${API_URL}/${id}`, {
            method:'PATCH',
            headers: {
                "Content-Type" : "application-json"
            },
            body: JSON.stringify(aluno)
        })

        if(!response.ok) {
            throw new Error("Erro ao editar")
        }

        return await response.json()
    } catch (error) {
        console.error(error)  
        throw error
    }
}

export async function listarALunos(id) {
    try {
        const response = await fetch (`${API_URL}/${id}`, {
            method: "DELETE"
        })

        if(!response.ok) {
            throw new Error("Erro ao deletar")
        }
    } catch (error) {
        console.error(error)  
        throw error
    }
}