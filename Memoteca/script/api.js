// ==================================================
// API.JS - Funções de comunicação com o backend
// ==================================================
// Usa fetch API para fazer requisições HTTP
// json-server fornece API REST em localhost:3000
// ==================================================

// BUSCAR todos os pensamentos
// Método: GET
// URL: http://localhost:3000/pensamentos
// Retorna: Array com todos os pensamentos
export async function getPensamento() {
    try {
        // fetch() éAPI nativo do JavaScript para fazer requisições HTTP
        const response = await fetch('http://localhost:3000/pensamentos');
        // Converte a resposta para JSON
        return response.json();
    } catch (error) {
        // Se der erro, mostra no console
        console.error('Erro ao buscar pensamentos', error);
    }
} 

// CRIAR novo pensamento
// Método: POST (enviar dados para criar)
// URL: http://localhost:3000/pensamentos
// Parâmetro: objeto com nomePensamento e autor
export async function postPensamentos(PensamentosDataPost) {
    try {
         const response = await fetch('http://localhost:3000/pensamentos', {
            // POST = criar novo registro
            method: 'POST',
            // Informar que o corpo é JSON
            headers: {'Content-Type' : 'application/json'},
            // Converter objeto JavaScript para string JSON
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

// ATUALIZAR pensamento existente
// Método: PUT (substituir dados)
// URL: http://localhost:3000/pensamentos/{id}
// Parâmetros: ID do pensamento + objeto com novos dados
export async function putPensamentos(id, PensamentosDataPut) {
    try {
         const response = await fetch(`http://localhost:3000/pensamentos/${id}`, {
            // PUT = atualizar registro existente
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

// DELETAR pensamento
// Método: DELETE (remover)
// URL: http://localhost:3000/pensamentos/{id}
// Parâmetro: ID do pensamento a remover
export async function deletePensamentos(id) {
    try {
        await fetch(`http://localhost:3000/pensamentos/${id}`, {
            // DELETE = remover registro
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Erro ao Deletar pensamentos', error);
    }
}