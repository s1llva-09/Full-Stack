const API_URL = "http://localhost:3002/filmes"

export async function obterFilmes() {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error("Erro ao obter filmes")
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function criarFilme(filme) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filme)
    })

    if (!response.ok) {
      throw new Error("Erro ao criar filme")
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function editarFilme(id, filme) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filme)
    })

    if (!response.ok) {
      throw new Error("Erro ao editar filme")
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function excluirFilme(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })

    if (!response.ok) {
      throw new Error("Erro ao excluir filme")
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { API_URL }
