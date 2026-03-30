import * as api from './api.js' //para exportar todos os metodos
// import { listarTasks } from './api.js' //para exportar metodos específicos

const btnAdicionar = document.getElementById("btn-adicioanr")
const listaTarefas = document.getElementById("lista-tarefas")
const paragrafoTotalTarefas = document.getElementById("total-tarefas")
const btnLimpar = document.getElementById("btn-limpar")
const input = document.getElementById("input")

btnAdicionar.addEventListener('click', () => {
    if (input.value == '') {
        alert('Informe uma tarefa!!')
        return
    }

    const tarefa = {
        description: input.value,
        finished: false
    }
 
    api.criarTask(tarefa)

    // TODO: substituir codigos abaixo por carregarTarefas() que já faz isso
    criarLiTarefa(tarefa)
    atualizarTotalLista(listaTarefas.children.length)
})

btnLimpar.addEventListener('click', () => {
    // TODO: invocar função da api de deletar todas as tasks

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
    checkConcluido.addEventListener('change', () => {
        // TODO: invocar função da api de atualizar uma task
        liTarefa.classList.toggle('concluido')
    })
    liTarefa.appendChild(checkConcluido)
    
    const btnRemover = document.createElement("button")
    btnRemover.textContent = "🗑️"
    btnRemover.addEventListener('click', () => {
        // TODO: invocar função da api de deletar uma task passando id

        // TODO: substituir codigos abaixo por carregarTarefas() que já faz isso
        listaTarefas.removeChild(liTarefa)
        atualizarTotalLista()
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
