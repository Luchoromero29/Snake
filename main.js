const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d");

canvas.height = 600
canvas.width = 600

/* VARIABLES DE LA SERPIENTE */
let velocityX = 0
let velocityY = 0
const size = 30
let positionX = canvas.width / 2 - size / 2
let positionY = canvas.height / 2 - size / 2
let right = false
let left = false
let up = false
let down = false

//forma vectorizada
snakeBox = {
    positionX: canvas.width / 2 - size / 2,
    positionY: canvas.height / 2 - size / 2,
    right: false,
    left: false,
    up: false,
    down: false
}
let snake = [snakeBox]


/* VARIABLES DEL TABLERO */
const sizeBox = 30;

/* VARIABLES DE LA MANZANA */
let appleX = 285
let appleY = 195
const radius = 12



function initEvents() {
    document.addEventListener('keydown', keyDownHandler)


    function keyDownHandler(event) {
        //forma sin vetores
        /*
        const { key } = event

        if ((key == "Down" || key == "ArrowDown") && up == false) {
            resetDirecction();
            down = true;
        } else if ((key == "Up" || key == "ArrowUp") && down == false) {
            resetDirecction();
            up = true
        } else if ((key == "Left" || key == "ArrowLeft") && right == false) {
            resetDirecction();
            left = true
        } else if ((key == "Right" || key == "ArrowRight") && left == false) {
            resetDirecction();
            right = true
        }
        console.log('PPRESS down:' + down +
            '; up:' + up +
            '; left:' + left +
            '; right:' + right +
            '; VelY: ' + velocityY +
            '; VelX: ' + velocityX);

        function resetDirecction() {
        right = false
        left = false
        up = false
        down = false
    }
        */

        //vectorizada
        const { key } = event

        if ((key == "Down" || key == "ArrowDown") && snake[0].up == false) {
            resetDirecction();
            snake[0].down = true;
        } else if ((key == "Up" || key == "ArrowUp") && snake[0].down == false) {
            resetDirecction();
            snake[0].up = true
        } else if ((key == "Left" || key == "ArrowLeft") && snake[0].right == false) {
            resetDirecction();
            snake[0].left = true
        } else if ((key == "Right" || key == "ArrowRight") && snake[0].left == false) {
            resetDirecction();
            snake[0].right = true
        }

        console.log('PPRESS down:' + snake[0].down +
            '; up:' + snake[0].up +
            '; left:' + snake[0].left +
            '; right:' + snake[0].right +
            '; VelY: ' + velocityY +
            '; VelX: ' + velocityX);
    }
    //sin vectores
    function resetDirecction() {
        snake[0].right = false
        snake[0].left = false
        snake[0].up = false
        snake[0].down = false
    }

}

function drawSnake() {
    //vectorizada
    for(let i = 0; i < snake.length ; i++){
        snake[i].positionX = snake[i].positionX + velocityX
        snake[i].positionY = snake[i].positionY + velocityY
        
        ctx.fillStyle = "red"
        ctx.fillRect(snake[i].positionX - size / 2, snake[i].positionY - size / 2, size, size)
    }

    /* sin vectores
    positionX += velocityX
    positionY += velocityY
    ctx.fillStyle = "red"
    ctx.fillRect(positionX - size / 2, positionY - size / 2, size, size)
    */

}

function handleSnake() {
    //sin vectores
    /*
    if (right && checkPosition()) {
        resetVelocity();
        velocityX = 1.5
    } else if (left && checkPosition()) {
        resetVelocity();
        velocityX = -1.5
    } else if (up && checkPosition()) {
        resetVelocity();
        velocityY = -1.5
    } else if (down && checkPosition()) {
        resetVelocity();
        velocityY = 1.5
    }
    function checkPosition() {
        if ((positionX - size / 2) % 30 == 0
            && (positionY - size / 2) % 30 == 0)
            return true
    }
    */
    if (snake[0].right && checkPosition()) {
        resetVelocity();
        velocityX = 1.5
    } else if (snake[0].left && checkPosition()) {
        resetVelocity();
        velocityX = -1.5
    } else if (snake[0].up && checkPosition()) {
        resetVelocity();
        velocityY = -1.5
    } else if (snake[0].down && checkPosition()) {
        resetVelocity();
        velocityY = 1.5
    }
    function checkPosition() {
        if ((snake[0].positionX - size / 2) % 30 == 0
            && (snake[0].positionY - size / 2) % 30 == 0)
            return true
    }

    function resetVelocity() {
        velocityX = 0
        velocityY = 0
    }


}

function drawApple() {
    ctx.beginPath();
    ctx.arc(appleX, appleY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'green'
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    //forma vectorizada
    snakeSameApple = (snake[0].positionX == appleX && snake[0].positionY == appleY)

    if (snakeSameApple) {
        snakeBox = {...snake[snake.length - 1]} 
        
        if(snakeBox.left){
            snakeBox.positionX+= 30
        }else if(snakeBox.right){
            snakeBox.positionX -= 30
        }else if(snakeBox.up){
            snakeBox.positionY += 30
        }else if(snakeBox.down){
            snakeBox.positionY -= 30
        }
        
        snake.push(snakeBox);
        appleX = Math.floor(Math.random() * 20) * 30 + 15
        appleY = Math.floor(Math.random() * 20) * 30 + 15
        
        /* sin vectores
        snakeSameApple = (positionX == appleX && positionY == appleY)
        if(snakeSameApple){
            lenght++;
            appleX = Math.floor(Math.random() * 20) * 30 + 15
            appleY = Math.floor(Math.random() * 20) * 30 + 15
        }
        */
    }
    //sin vectores
    /*
    if (positionX > canvas.width - size / 2
        || positionX < 0 + size / 2
        || positionY > canvas.height - size / 2
        || positionY < 0 + size / 2) {
        location.reload();
    }
    */
    if (snake[0].positionX > canvas.width - size / 2
    || snake[0].positionX < 0 + size / 2
    || snake[0].positionY > canvas.height - size / 2
    || snake[0].positionY < 0 + size / 2) {
    location.reload();
}



}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (i % 2 == 0) {
                j % 2 == 0 ? ctx.fillStyle = 'blue' : ctx.fillStyle = 'white'
            } else {
                j % 2 == 0 ? ctx.fillStyle = 'white' : ctx.fillStyle = 'blue'
            }
            ctx.fillRect(i * sizeBox, j * sizeBox, sizeBox, sizeBox)
        }
    }

}


/* FUNCION PRINCIPAL DEL JUEGO */
function draw() {
    window.requestAnimationFrame(draw);
    cleanCanvas();
    //FUNCIONES DE RENDERIZADO
    drawApple()
    drawSnake()


    //FUNCIONES DE MOVIMIENTO
    handleSnake();
    collisionDetection();


}

draw();
initEvents();