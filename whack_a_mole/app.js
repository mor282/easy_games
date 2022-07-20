//problems:
//can get point even after the game ended

const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent

let easyOn = 0
let hardOn = 0
let mediumOn = 0

var easy = document.getElementById('easy')
easy.addEventListener('click', easyMode)
var medium = document.getElementById('medium')
medium.addEventListener('click', mediumMode)
var hard = document.getElementById('hard')
hard.addEventListener('click', hardMode)

//removing the old mole and put a new one instead
function randomSquare(){
    square.forEach(className => {
        className.classList.remove('mole')
        className.classList.add('grass')
    })
    let randomPosition = square[Math.floor(Math.random()*9)]
    randomPosition.classList.add('mole')
    randomPosition.classList.remove('grass')
    hitPosition = randomPosition.id
}

//check if we hit the mole
if (timeLeft.textContent > 0){
    square.forEach(id => {
        id.addEventListener('mouseup',() => {
            if (id.id == hitPosition){
                result = result + 1
                score.textContent = result
            }
        })
    })
}

function moveMole(){
    //moving the mole every 1000 ms
    if (easyOn > 0){
        timerId2 = setInterval(randomSquare, 500)
    }
    else if (mediumOn > 0){
        timerId2 = setInterval(randomSquare, 300)
    }
    else {
        timerId2 = setInterval(randomSquare, 150)
    }
}

function countdown(){
    currentTime--
    timeLeft.textContent = currentTime
    if (timeLeft.textContent == 0){
        clearInterval(timerId)
        alert("GAME OVER! Your final score is "+ result)
    }
}

function easyMode(){
    easyOn = 1
    hardOn = 0
    mediumOn = 0
    start()
}

function mediumMode(){
    easyOn = 0
    hardOn = 0
    mediumOn = 1
    start()
}

function hardMode(){
    easyOn = 0
    hardOn = 1
    mediumOn = 0
    start()
}

function start(){
    currentTime = 20
    timeLeft.textContent = currentTime
    score.textContent = 0
    result = 0
    clearInterval(timerId)
    clearInterval(timerId2)
    moveMole()
    timerId = setInterval(countdown, 1000)
}

let timerId = null
let timerId2 = null