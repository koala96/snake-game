const snakeCanvas = document.getElementById("snake");
const gameContext = snakeCanvas.getContext('2d');

const groundImage = new Image();
groundImage.src = "img/ground.jpeg";

const foodImage = new Image();
foodImage.src = "img/apple.png"

let score = 0;

let unit = 30;

let food = {
    x: Math.floor(Math.random() * 14 + 1) * unit,
    y: Math.floor(Math.random() * 20 + 1) * unit,
}

let snake = [];

snake[0] = {
    x: 10 * unit,
    y: 13 * unit
}

function draw() {
    gameContext.drawImage(groundImage, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            gameContext.fillStyle = 'black';
        }
        else {
            gameContext.fillStyle = 'white';
        }

        gameContext.fillRect(snake[i].x, snake[i].y, unit, unit);
    }

    gameContext.drawImage(foodImage, food.x, food.y);
}

let game = setInterval(draw, 100);