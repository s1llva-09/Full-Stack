export async function getPensamento() {
    try {
        const response = await fetch('http://localhost:3000/pensamentos');
        return response.json();
    } catch (error) {
        console.error('Erro ao buscar pensamentos', error);
    }
} 

export async function postPensamentos(PensamentosDataPost) {
    try {
         const response = await fetch('http://localhost:3000/pensamentos', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(PensamentosDataPost)
         });

         if (response.ok) {
            console.error(response)
            return;
         }

    } catch (error) {
        console.error('Erro ao enviar pensamentos', error);
    }
}

export async function putPensamentos(id, PensamentosDataPut) {
    try {
         const response = await fetch(`http://localhost:3000/pensamentos/${id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(PensamentosDataPut)
         });

         if (response.ok) {
            console.error(response)
            return;
         }

    } catch (error) {
        console.error('Erro ao atualizar pensamentos', error);
    }
}

export async function deletePensamentos(id) {
    try {
        await fetch(`http://localhost:3000/pensamentos/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Erro ao Deletar pensamentos', error);
    }
}