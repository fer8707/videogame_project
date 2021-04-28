const canvas = document.getElementById("main")
const ctx = canvas.getContext("2d")
//images charger
const backImg = new Image()
backImg.src = "/images/calle.png"
const hero = new Image()
hero.src = "/images/bart1.png"
const shotImg = new Image()
shotImg.src = "/images/shot.png"
const homerImg = new Image()
homerImg.src = "/images/homero1.png"
const homerImg2= new Image()
homerImg2.src = "/images/homero2.png"
//sounds charger
const shotSnd = new Audio()
shotSnd.src = "/sounds/bart_shot.mp3"
const dohSnd = new Audio()
dohSnd.src = "/sounds/doh_homer.wav"
const gameoverSnd = new Audio()
gameoverSnd.src = "/sounds/palomita.wav"

const state = {
    current : 0, // ESTADO ACTUAL, PUEDE TENER COMO OPCIONES 0,1,2, BASADAS EN LAS SIGUIENTES PROPIEDADES
    getReady : 0, // ESTADO DE INICIO DEL JUEGO
    game : 1, // ESTADO DE "JUGANDO"
    over : 2 // ESTADO DE COLISIÓN Y PÉRDIDA DEL JUEGO
}
const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}

// CONTROL DEL JUEGO


//bacground 
const backgroundImage = {
    backImg: backImg,
    x: 0,
    speed: -1,
    move: function () {
        this.x += this.speed
        this.x %= canvas.width;
    },
    draw: function () {
        ctx.drawImage(this.backImg, this.x, 0);
        if (this.speed < 0) {
            ctx.drawImage(this.backImg, this.x + canvas.width, 0);
        } else {
            ctx.drawImage(this.backImg, this.x - this.img.width, 0);
        }
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// CANVAS AREA
const myGameArea = {
    frames: 0,
    score: function () {
        const points = Math.floor(this.frames / 5);
        ctx.font = '18px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(`Score: ${points}`, 350, 50);
        return points
    },
}

// components constructor
class Component {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.yRandom = canvas.height / 2 - 100;
        this.frame = 0;
    }
    left() {
        return this.x;
    }
    right() {
        return this.x + this.width;
    }
    top() {
        return this.y;
    }
    bottom() {
        return this.y + this.height;
    }
    crashHomero(obstacle) {
        return !(
            this.bottom() - 20 < obstacle.top() ||
            this.top() + 10 > obstacle.bottom() ||
            this.right() - 20 < obstacle.left() ||
            this.left() + 30 > obstacle.right());
    }

    crash(obstacle) {
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right());
    }

    updateBartP() { // hero draw
        ctx.drawImage(hero, this.x, this.y, this.width = 50, this.height = 100)
    }
    updateMissile() { // missile draw
        ctx.drawImage(shotImg, this.x, this.y)
    }

    updatehomero() { // enemy draw
        ctx.drawImage(homerImg, this.x, this.y, this.width, this.height)
        
        /*
        const open = ctx.drawImage(homerImg, this.x, this.y, this.width, this.height)
        const close = ctx.drawImage(homerImg2,this.x, this.y, this.width, this.height)
        */
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    detectBorders() { //border detector for bart
        let borderLeft = 10
        let borderRight = 10
        let borderUp = 10
        let borderDown = 10
        if (this.x < borderLeft) {
            this.x = borderLeft
        }
        if (this.x + this.width > canvas.width - borderRight) {
            this.x = canvas.width - bart.width - borderRight
        }
        if (this.y < borderUp + 90) {
            this.y = borderUp + 90
        }
        if (this.y + this.height > canvas.height - borderDown) {
            this.y = canvas.height - bart.height - borderDown
        }
    }


}
/*  iniciar los estados del juego
    - pantalla inicial
    - juego
    - pantalla gameover
*/
const bart = new Component(10, canvas.height / 2 - 100, 166, 190)
const homers = []
const missiles = []

// homero UPDATE
function updatehomero() {
    for (let i = 0; i < homers.length; i++) {
        homers[i].x -= 1
        homers[i].updatehomero();
    }
    myGameArea.frames += 1
    if (myGameArea.frames % 150 === 0) {
        let widthhomero = 70
        let heighthomero = 100
        let yRandom = Math.floor(Math.random() * 510);
        // PUSH homero
        homers.push(new Component(800, yRandom, widthhomero, heighthomero))
    }
}

function shot() { //missile generator
    let widthMissile = 20
    let heightMissile = 20
    missiles.push(new Component(bart.x + 50, bart.y + 30, widthMissile, heightMissile))
    shotSnd.play()
}

function updateMissiles() {
    for (let i = 0; i < missiles.length; i++) {
        missiles[i].x += 5
        missiles[i].updateMissile()
    }
}

//crash bart whit homer
function checkCrashedbart() {
    for (let i = 0; i < homers.length; i++) {
        if (bart.crashHomero(homers[i]) === true) {
            homers.splice(i, 1)
            checkGameOver()
            break
        }
    }
}

//crash missil with homer
function checkCrashedhomero() {
    for (let i = 0; i < homers.length; i++) {
        for (let j = 0; j < missiles.length; j++) {
            if (homers[i].crash(missiles[j]) === true) {
                homers.splice(i, 1)
                missiles.splice(j, 1)
                dohSnd.play()
                break
            }
        }
    }
}

// GAME OVER
function checkGameOver(id) {
    
    cancelAnimationFrame()
    
}

// MOTOR
function updateGameArea() {
    clear()
    backgroundImage.draw()
    backgroundImage.move()
    bart.newPos()
    bart.detectBorders()
    bart.updateBartP()
    myGameArea.score()

    updateMissiles()
    updatehomero()
    checkCrashedbart()

    checkCrashedhomero()
    let frameId = requestAnimationFrame(updateGameArea)
    checkGameOver(frameId);
}

//GAME'S INVOKE
window.onload = () => {
    updateGameArea()
}

// EVENTS
document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37: // left arrow
            bart.speedX -= 10
            break;
        case 39: // right arrow
            bart.speedX += 10
            break;
        case 38: // up arrow
            bart.speedY -= 10
            break;
        case 40: // right arrow
            bart.speedY += 10
            break;
        case 32: // letter A
            shot()
            break;
    }
})
document.addEventListener('keyup', (e) => {
    bart.speedX = 0
    bart.speedY = 0
})