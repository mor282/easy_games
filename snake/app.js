document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const starBtn = document.querySelector('.start')
    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2,1,0] //2=head, 0=tail, 1=body
    let direction = 1 //snake always moving 1 block
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //refresh the board
    function startGame(){
        currentSnake.forEach(index => {
            squares[index].classList.remove('snake')
            })
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 200
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //for what happens when the snake moves
    function moveOutcomes(){
        if ( //cases when game is over
            (currentSnake[0] + width >= (width * width) && direction == width ) || //hits bottom
            (currentSnake[0] % width == width -1 && direction == 1) || //hits right wall
            (currentSnake[0] % width == 0 && direction == -1) || //hits left wall
            (currentSnake[0] - width < 0 && direction == -width) ||  //hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //hits itself
          ) {
            alert("Game Over!")
            clearInterval(interval)
            return
          }
        
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)

        //took the apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
          }
          squares[currentSnake[0]].classList.add('snake')
        
    }

    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
          } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
          squares[appleIndex].classList.add('apple')
    }

    //function to keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake')
        if (e.keyCode == 39){
            //right arrow
            direction = 1
        }
        else if (e.keyCode == 38){
            //up arrow
            direction = - width
        }
        else if(e.keyCode == 37){
            //left arrow
            direction = -1
        }
        else{
            //down arrow
            direction = + width
        }
    }

    document.addEventListener('keyup',control)
    starBtn.addEventListener('click',startGame)
})