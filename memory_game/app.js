document.addEventListener('DOMContentLoaded', () => {

    //cards options
    const cardArray = [
        {
        name: 'cat',
        img: 'images/cat.png'
        },
        {
            name: 'cat',
            img: 'images/cat.png'
            },
        {
        name: 'hipo',
        img: 'images/hipo.png'
        },
        {
            name: 'hipo',
            img: 'images/hipo.png'
            },
        {
        name: 'mouse',
        img: 'images/mouse.png'
        },
        {
            name: 'mouse',
            img: 'images/mouse.png'
            },
        {
        name: 'panda',
        img: 'images/panda.png'
        },
        {
            name: 'panda',
            img: 'images/panda.png'
            },
        {
        name: 'brownbear',
        img: 'images/brownbear.png'
        },
        {
            name: 'brownbear',
            img: 'images/brownbear.png'
            },
        {
        name: 'sheep',
        img: 'images/sheep.png'
        },
        {
            name: 'sheep',
            img: 'images/sheep.png'
            },
        {
        name: 'fox',
        img: 'images/fox.png'
        },
        {
            name: 'fox',
            img: 'images/fox.png'
            },
        {
        name: 'lion',
        img: 'images/lion.png'
        },
        {
            name: 'lion',
            img: 'images/lion.png'
            },
        {
        name: 'elephent',
        img: 'images/elephent.png'
        },
        {
            name: 'elephent',
            img: 'images/elephent.png'
            },
        {
        name: 'giraff',
        img: 'images/giraff.png'
        },
        {
            name: 'giraff',
            img: 'images/giraff.png'
            },
        {
        name: 'pig',
        img: 'images/pig.png'
        },
        {
            name: 'pig',
            img: 'images/pig.png'
            },
        {
        name: 'bunny',
        img: 'images/bunny.png'
        },
        {
            name: 'bunny',
            img: 'images/bunny.png'
            }      
]

cardArray.sort(() => 0.5-Math.random())

const grid = document.querySelector('.grid') //the grid div
const resultDisplay = document.querySelector('#result')
var cardsChosen = []
var cardsChosenId = []
var cardsWon = []

//create the board
function createBoard(){
    for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img')
        card.setAttribute('src','images/back.png')
        card.setAttribute('data-id',i)
        card.addEventListener('click',flipCard)
        grid.appendChild(card)
    }
    var restart = document.getElementById('restart')
    restart.addEventListener('click', restartBoard)

    resultDisplay.textContent = 0
}

//check for matches
function checkForMatch(){
    var cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (cardsChosen[0] == cardsChosen[1]){
        //alert('you found a match!')
        cards[optionTwoId].removeEventListener('click', flipCard)
        cards[optionOneId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    }
    else{
        cards[optionOneId].setAttribute('src','images/back.png')
        cards[optionTwoId].setAttribute('src','images/back.png')
    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length == cardArray.length/2){
        alert('You Won!')
        resultDisplay.textContent = "You won!"
    }
}

//flip the cards
function flipCard(){
    var cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src',cardArray[cardId].img)
    if (cardsChosen.length == 2){
        //the time out is that it wont happen too quickly
        setTimeout(checkForMatch, 300)
    }
}

//restart the board
function restartBoard(){
    var cards = document.querySelectorAll('img')
    for (let i = 0; i < cardArray.length; i++) {
        cards[i].setAttribute('src','images/back.png')
        cards[i].addEventListener('click',flipCard)
    }
    cardsChosen = []
    cardsChosenId = []
    cardsWon = []
    cardArray.sort(() => 0.5-Math.random())
    resultDisplay.textContent = 0
}

createBoard()

})