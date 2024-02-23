const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d");

canvas.height = 600
canvas.width = 600

/* VARIABLES DE LA SERPIENTE */
let lenght = 1
let velocityX = 0
let velocityY = 0
const size = 30
let positionX = canvas.width / 2 - size/2
let positionY = canvas.height / 2 - size/2
let right = false
let left = false
let up = false
let down = false


/* VARIABLES DEL TABLERO */
const sizeBox = 30;

/* VARIABLES DE LA MANZANA */
let appleX = 285
let appleY = 195
const radius = 12



function initEvents() {
    document.addEventListener('keydown', keyDownHandler)


    function keyDownHandler(event) {
        const { key } = event
        
        if ((key == "Down" || key == "ArrowDown") && up == false) {
            resetDirecction();
            down = true; 
        } else if ((key == "Up" || key == "ArrowUp") && down == false ) { 
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
    }

    function resetDirecction() {
        right = false
        left = false
        up = false
        down = false
    }

}

function drawSnake() {
    positionX = positionX + velocityX
    positionY = positionY + velocityY
    ctx.fillStyle = "red"
    ctx.fillRect(positionX - size / 2, positionY - size / 2, size, size)
    
}

function handleSnake() {
    if (right && checkPosition()) {
        resetVelocity();
        velocityX = 1.5
    } else if (left && checkPosition() ) {
        resetVelocity();
        velocityX = -1.5
    } else if (up && checkPosition()) {
        resetVelocity();
        velocityY = -1.5
    } else if (down && checkPosition()) {
        resetVelocity();
        velocityY = 1.5
    }

    function resetVelocity(){
        velocityX = 0
        velocityY = 0
    }

    function checkPosition(){
        if ((positionX - size/2)%30 == 0 
        && (positionY - size/2)%30 == 0) 
        return true 
    }

}

function drawApple() {
    ctx.beginPath();
    ctx.arc(appleX, appleY,radius,0,Math.PI * 2);
    ctx.fillStyle = 'green'
    ctx.fill();
    ctx.closePath();
}

function collisionDetection(){
    snakeSameApple = (positionX == appleX && positionY == appleY)

    if(snakeSameApple){
        console.log("lo atrapaste");
        appleX = Math.floor(Math.random() * 20) * 30 + 15
        appleY = Math.floor(Math.random() * 20) * 30 + 15
    }
    
    if (positionX > canvas.width - size/2  
    || positionX < 0 + size/2 
    || positionY > canvas.height - size/2 
    || positionY < 0 + size/2) {
        location.reload();
    }

    

}

function cleanCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    for (let i = 0; i<20 ; i++){
        for (let j = 0; j < 20; j++) {
            if(i%2==0){
                j%2 == 0? ctx.fillStyle = 'blue' : ctx.fillStyle = 'white'
            }else{
                j%2 == 0? ctx.fillStyle = 'white' : ctx.fillStyle = 'blue'
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