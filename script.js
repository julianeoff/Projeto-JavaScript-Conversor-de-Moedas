const convertButton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select")
const currencyPais = document.querySelector(".currency-pais")

function convertValues() {
  const inputCurrency = Number(document.querySelector(".input-currency").value)
  const currencyValueToConvert = document.querySelector(".currency-values-to-convert")
  const currencyValueConverted = document.querySelector(".currency-values")

  // Validação se o valor é válido
  if (!inputCurrency || inputCurrency <= 0) {
    currencyValueToConvert.innerHTML = "R$0,00"
    currencyValueConverted.innerHTML = "US$0,00"
    return
  }

  const dolarToday = 5.4
  const euroToday = 6.3
  const libraToday = 7.5
  const bitcoinToday = 180000.0

  // Taxas de câmbio (quantos reais vale 1 unidade da moeda)
  const exchangeRates = {
    real: 1,
    dolar: dolarToday,    // 1 dólar = 5.4 reais
    euro: euroToday,      // 1 euro = 6.3 reais
    libra: libraToday,    // 1 libra = 7.5 reais
    bitcoin: bitcoinToday // 1 bitcoin = 180000 reais
  }

  // Símbolos das moedas
  const currencySymbols = {
    real: "R$",
    dolar: "US$",
    euro: "€",
    libra: "£",
    bitcoin: "₿"
  }

  // Pega as moedas selecionadas
  const fromCurrency = currencyPais.value
  const toCurrency = currencySelect.value

  // CORREÇÃO: Converte o valor de entrada para Real (moeda base)
  const valueInReal = inputCurrency * exchangeRates[fromCurrency]  // MULTIPLICAR, não dividir!
  
  // Converte de Real para a moeda de destino
  const convertedValue = valueInReal / exchangeRates[toCurrency]   // DIVIDIR para converter de real para outra moeda

  // Formatar valores
  let fromFormatted, toFormatted

  if (fromCurrency === "bitcoin") {
    fromFormatted = `${currencySymbols[fromCurrency]}${inputCurrency.toFixed(8)}`
  } else {
    fromFormatted = `${currencySymbols[fromCurrency]}${inputCurrency.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
  }

  if (toCurrency === "bitcoin") {
    toFormatted = `${currencySymbols[toCurrency]}${convertedValue.toFixed(8)}`
  } else {
    toFormatted = `${currencySymbols[toCurrency]}${convertedValue.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
  }

  // Atualiza os valores na tela
  currencyValueToConvert.innerHTML = fromFormatted
  currencyValueConverted.innerHTML = toFormatted
}

function changeCurrency() {
  const currencyName = document.getElementById("name-to")
  const currencyImg = document.getElementById("logo-to")

  switch (currencySelect.value) {
    case "dolar":
      currencyName.innerHTML = "Dólar"
      currencyImg.src = "./assets/USD.png"
      break
    case "euro":
      currencyName.innerHTML = "Euro"
      currencyImg.src = "./assets/EURO.png"
      break
    case "bitcoin":
      currencyName.innerHTML = "Bitcoin"
      currencyImg.src = "./assets/bitcoin.png"
      break
    case "libra":
      currencyName.innerHTML = "Libra"
      currencyImg.src = "./assets/libra.png"
      break
    case "real":
      currencyName.innerHTML = "Real"
      currencyImg.src = "./assets/Real.png"
      break
  }

  // Se já tem valor digitado, reconverte
  if (document.querySelector(".input-currency").value) {
    convertValues()
  }
}

function changeFromCurrency() {
  const fromCurrency = currencyPais.value
  const currencyName = document.getElementById("name-from")
  const currencyImg = document.getElementById("logo-from")

  // Atualiza nome e imagem da moeda de origem
  switch (fromCurrency) {
    case "real":
      currencyName.innerHTML = "Real"
      currencyImg.src = "./assets/Real.png"
      break
    case "dolar":
      currencyName.innerHTML = "Dólar"
      currencyImg.src = "./assets/USD.png"
      break
    case "euro":
      currencyName.innerHTML = "Euro"
      currencyImg.src = "./assets/EURO.png"
      break
    case "libra":
      currencyName.innerHTML = "Libra"
      currencyImg.src = "./assets/libra.png"
      break
    case "bitcoin":
      currencyName.innerHTML = "Bitcoin"
      currencyImg.src = "./assets/bitcoin.png"
      break
  }

  // Se já tem valor digitado, reconverte
  if (document.querySelector(".input-currency").value) {
    convertValues()
  }
}

// Event listeners
currencyPais.addEventListener("change", changeFromCurrency)
currencySelect.addEventListener("change", changeCurrency)
convertButton.addEventListener("click", convertValues)