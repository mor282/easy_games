document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid')
    const resultsDisplay = document.querySelector('.results')
    let width = 15
    let currentShooterIndex = 202
    let results = 0
    let aliensRemoved = []
    let goingRight = true
    let invadersId
    let direction = 1
    const alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
      ]

    //create the grid
    for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
    }
    const squares = Array.from(document.querySelectorAll('.grid div'))
    squares[currentShooterIndex].classList.add('shooter')

    //add invaders to the board
    function draw(){
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!aliensRemoved.includes(i)){
                squares[alienInvaders[i]].classList.add('invader')
            }
            
        }
    }
    draw()

    //remove invaders from the board
    function remove(){
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('invader')
            
        }
    }

    function moveShooter(e){
        squares[currentShooterIndex].classList.remove('shooter')
        switch(e.key){
            case 'ArrowLeft':
                if (currentShooterIndex % width != 0)
                    currentShooterIndex -= 1
                break
            case 'ArrowRight':
                if (currentShooterIndex % width < width -1)
                    currentShooterIndex += 1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
    }

    document.addEventListener('keydown',moveShooter)

    function moveInvaders(){
        const leftEdge = (alienInvaders[0] % width == 0)
        const rightEdge = (alienInvaders[alienInvaders.length-1] % width == width-1)
        remove()

        //we hit the right side - need to change movement to left
        if (rightEdge && goingRight){
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width + 1
                direction = -1
                goingRight = false
            }
        }

        //we hit the left side - need to change the movement to right
        if (leftEdge && !goingRight){
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width -1
                direction = 1
                goingRight = true  
            }
        }
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction   
        }

        //actully move the invaders
        draw()

        if (squares[currentShooterIndex].classList.contains('invader','shooter')){
            //we are killed!
            resultsDisplay.innerHTML = 'GAME OVER!'
            clearInterval(invadersId)
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[i] > (squares.length)){
                // the invaders are at the bottom of the screen
                resultsDisplay.innerHTML = "GAME OVER!"
                clearInterval(invadersId)
            }
        }
        if (aliensRemoved.length == alienInvaders.length){
            //killed all invaders
            resultsDisplay.innerHTML = "YOU WON!"
            clearInterval(invadersId)
        }
    }
    
    invadersId = setInterval(moveInvaders, 600)

    function shoot(e){
        let laserId
        let currentLaserIndex = currentShooterIndex
        function moveLaser(){
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
            if (squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')
                setTimeout(() => 
                        squares[currentLaserIndex].classList.remove('boom'), 300)
                clearInterval(laserId)
                const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                aliensRemoved.push(alienRemoved)
                results ++
                resultsDisplay.innerHTML = results
                console.log(aliensRemoved)     
            }
        }
        switch(e.key){
            case 'ArrowUp':
                laserId = setInterval(moveLaser, 100)
        }
    }

    document.addEventListener('keydown', shoot)
})