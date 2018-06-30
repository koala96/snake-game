const snakeCanvas = document.getElementById("snake");
const gameContext = snakeCanvas.getContext('2d');

const groundImage = new Image();
groundImage.src = "img/ground.jpeg";

const foodImage = new Image();
foodImage.src = "img/apple.png"

let score = 0;

let unit = 30;

let food = {
    x: Math.floor(Math.random()*20+1) * unit,
    y: Math.floor(Math.random()*20+1) * unit,
}

let snake = [];

snake[0] = {
    x: 15*unit,
    y: 13* unit
}

function draw()
{
    gameContext.drawImage(groundImage,0,0);
    gameContext.drawImage(foodImage,0,0);

    
    
}

let game = setInterval(draw,100);