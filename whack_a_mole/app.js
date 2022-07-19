const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result = 0
let currentTime = timeLeft.textContent

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
    let timerId = null
    //moving the mole every 1000 ms
    timerId = setInterval(randomSquare, 350)
}

function countdown(){
    currentTime--
    timeLeft.textContent = currentTime
    if (timeLeft.textContent == 0){
        clearInterval(timerId)
        alert("GAME OVER! Your final score is "+ result)
    }
}

let timerId = setInterval(countdown, 1000)
moveMole()