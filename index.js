const canvas =  document.getElementById("main")
const ctx = canvas.getContext("2d")
const hero = new Image()
hero.src="/images/hero.png"
const backImg = new Image();
backImg.src = '/images/calle.png'
const shotImg = new Image()
shotImg.src = "/images/shot.png"
const backgroundImage = {
    backImg: backImg,
    x: 0,
    speed: -1,
    move: function(){
        this.x += this.speed
        this.x %= canvas.width;
    },
    draw: function(){
        ctx.drawImage(this.backImg, this.x, 0);
        if (this.speed < 0) {
            ctx.drawImage(this.backImg, this.x + canvas.width, 0);
          } else {
            ctx.drawImage(this.backImg, this.x - this.img.width, 0);
          }
    }
}
const player = {
    width: 50,
    height: 70,
    x: 20,
    y: canvas.height/2,
    speed: 10,
    dx: 0, // DIFERENCIAL DE CAMBIO
    dy: 0
}
function drawPlayer(){
        ctx.drawImage(hero, player.x, player.y, player.width, player.height)
}
function newPos(){
    player.x += player.dx
    player.y += player.dy
}

const enemy = {
    width: 50,
    height: 70,
    x: 20,
    y: 200,
    speed: 10,
    dx: 0, // DIFERENCIAL DE CAMBIO
    dy: 0
}
function drawPlayer(){
        ctx.drawImage(hero, player.x, player.y, player.width, player.height)
}
function newPos(){
    player.x += player.dx
    player.y += player.dy
}

function clear(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
}
// FUNCIONES DE VELOCIDAD
function moveRight(){
    player.dx = player.speed
}
function moveUp(){
    player.dy = -player.speed
}
function moveLeft(){
    player.dx = -player.speed
}
function moveDown(){
    player.dy = player.speed
}
function drawShot(){
    ctx.drawImage(shotImg, gun.x+player.width, gun.y+player.height/2)
    gun.x += gun.dx
gun.y += gun.dy
gun.dx = gun.speed
}
function posShot(){

}
function keyDown(e){
    console.log(e.key)
    switch(e.key){
        case "ArrowRight":
            
            moveRight()
            break;
        case "ArrowUp":
            moveUp()
            break
        case "ArrowDown":
            moveDown()
            break
        case "ArrowLeft":
            moveLeft()
            break
        case "a":
            drawShot()
            break
        default:
            return
    }
}
function detectWalls(){
    if(player.x < 0){
        player.x = 0
    }
    if(player.x + player.width > canvas.width){
        player.x = canvas.width - player.width
    }
    if(player.y < 0){
        player.y = 0
    }
    if(player.y + player.height > canvas.height){
        player.y = canvas.height - player.height
    }
}
function keyUp(){
    player.dx = 0
    player.dy = 0
}
const gun = {
    x: player.x,
    y: player.y,
    speed:5,
    dx: player.dx, // DIFERENCIAL DE CAMBIO
    dy: player.dy
}

function update(){ // MOTOR DE ANIMACIÓN
    clear()
    backgroundImage.move()
    backgroundImage.draw()
    detectWalls()
    drawPlayer()
    newPos()
    posShot()
    drawShot()
    requestAnimationFrame(update)
}
update()
// EVENTOS
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)
