//cotação de moedas atual
const USD = 5.00 //valor dolar
const EUR = 5.88 //valor euro
const GBP = 6.75 //valor libra

//obtendo elementos do formulario
const amount = document.getElementById("amount")//pega o elemente pelo id ("amount") do Html

const currency = document.getElementById("currency") //seleciona pela id o seletor de moedas
const form = document.querySelector("form") //busca pelo id o seletor que esta dentro da tag form
const footer = document.querySelector("main footer") //seleciona a main e dentro dela pega o footer


//Manipulando o input amount para receber somente numeros
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g

    amount.value = amount.value.replace(hasCharactersRegex, "") //pega todos os valores em letras e apaga para conter apenas numeros no conversar de moeda
    
    //console.log(amount.value)//mostra no console os valores digitados
})


//pegando o evento de envio (submit) do formulario
form.onsubmit = () => {
    event.preventDefault()

    switch(currency.value) { //faz um case para identificar qual moeada foi selecionada no seletor
        case "USD":
            convertCurrency(amount.value, USD, "US$") //confere se selecionou USD
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€") //confere se selecionou EUR
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£") //confere se selecionou GBP
            break
    }
}

//função de conversão da moeada
function convertCurrency(amount, price, symbol) {
    try {
        //aplica a classe que exibe o footer para mostrar conversão
        footer.classList.add("show-result")
    } catch (error) {
        //oculta o footer removendo ele
        footer.classList.remove("show-result")
        
        console.log(error)
        alert("Erro ao converter!")
    }
}