let qtdRows = 60
let qtdColumns = 60
let renderTimer = 30
let hasWind = true
const layer = []
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

//Inicia o array com zeros
function InitializeLayer(){
    for (let i = 0; i < (qtdRows * qtdColumns); i++) {
        layer.push(0);
    }
}

//Seta a ultima linha do array para 36 que é o valor máximo do array de cores
function BaseValueFill(){
    let indiceUltimaLinha = (qtdRows - 1) * qtdRows
    for(let column = 0; column < qtdColumns; column++){
        layer[indiceUltimaLinha + column] = 36
    }
} 

//renderiza a parte visual
function Render(){
    let htmlRows = '' 
    for (let row = 0; row < qtdRows; row++) {
        htmlRows += '<tr>'
        for (let column = 0; column < qtdColumns; column++) {
            let indice = (row * qtdRows) + column
            const color = fireColorsPalette[layer[indice]]
            const colorString = `${color.r},${color.g},${color.b}`

            //htmlRow += `<td style="color: rgb(${colorString})">${layer[indice]}</td>`
            htmlRows += `<td style="background-color: rgb(${colorString})"></td>`
        }
        htmlRows += '</tr>'
    }
    document.querySelector('#pixelTable').innerHTML = htmlRows
}

//efetua os calculos da estrutura do fogo e renderiza novamente a tela
function calculateFireStructure(){
    let decay = 1
    let wind = 0

    for (let row = 0; row < qtdRows-1; row++) {
        for (let column = 0; column < qtdColumns; column++) {
            let indice = (row * qtdRows) + column
            let indiceAbaixo = indice + qtdRows
            
            decay = Math.floor(Math.random() * 3)
            if(hasWind)
                wind = Math.floor(Math.random() * 2)

            if(layer[indiceAbaixo] - decay < 0)
                layer[indice] = 0
            else
                layer[indice-wind] = layer[indiceAbaixo] - decay
        }
    }
}

function firePropagation(){
    InitializeLayer()
    BaseValueFill()
    setInterval(function(){
        calculateFireStructure()
        Render()
    }, renderTimer)
}

// Roda direto a função
(function Run(){
    firePropagation()
})()
