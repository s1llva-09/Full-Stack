import * as api from './api.js' //para exportar todos os metodos
// import { listarTasks } from './api.js' //para exportar metodos específicos

const btnAdicionar = document.getElementById("btn-adicioanr")
const listaTarefas = document.getElementById("lista-tarefas")
const paragrafoTotalTarefas = document.getElementById("total-tarefas")
const btnLimpar = document.getElementById("btn-limpar")
const input = document.getElementById("input")

btnAdicionar.addEventListener('click', async () => {
    if (input.value == '') {
        alert('Informe uma tarefa!!')
        return
    }

    const tarefa = {
        description: input.value,
        finished: false
    }
 
    const tarefaCriada = await api.criarTask(tarefa)
    console.log(tarefaCriada)

    // TODO: substituir codigos abaixo por carregarTarefas() que já faz isso
    criarLiTarefa(tarefaCriada)
    atualizarTotalLista(listaTarefas.children.length)
})

btnLimpar.addEventListener('click',async () => {
    // TODO: invocar função da api de deletar todas as tasks
    await api.deletarTodasTasks()
    // TODO: substituir codigos abaixo por carregarTarefas() que já faz isso
    while (listaTarefas.firstChild) {
        listaTarefas.removeChild(listaTarefas.firstChild)
    }
 
    atualizarTotalLista(listaTarefas.children.length)
})

function criarLiTarefa(tarefa) {
    const liTarefa = document.createElement("li")
    liTarefa.textContent = tarefa.description;
    
    const checkConcluido = document.createElement("input")
    checkConcluido.type = 'checkbox'
    checkConcluido.name = 'finished'
    if (tarefa.finished) {
        checkConcluido.checked = true
        liTarefa.classList.add('concluido')
    }
    checkConcluido.addEventListener('change',async () => {
        // TODO: invocar função da api de atualizar uma task
        await api.atualizarTask(tarefa.id, {
            finished: checkConcluido.checked
        })
        liTarefa.classList.toggle('concluido')
    })
    liTarefa.appendChild(checkConcluido)
    
    const btnRemover = document.createElement("button")
    btnRemover.textContent = "🗑️"
    btnRemover.addEventListener('click',async () => {
        await api.deletarTask(tarefa.id)
        // TODO: invocar função da api de deletar uma task passando id

        // TODO: substituir codigos abaixo por carregarTarefas() que já faz isso
        listaTarefas.removeChild(liTarefa)
        atualizarTotalLista(listaTarefas.children.length)
    })
    liTarefa.appendChild(btnRemover)

    listaTarefas.appendChild(liTarefa)
}

export async function carregarTarefas() {
    const tarefas = await api.listarTasks()
    
    if (tarefas.length) {
        tarefas.forEach(tarefa => {
            criarLiTarefa(tarefa)
        });
        atualizarTotalLista(tarefas.length)
    }
}

async function atualizarTotalLista(total) {
    paragrafoTotalTarefas.textContent = `Itens na lista: ${total}`
}
