const snakeCanvas = document.getElementById("snake");
const gameContext = snakeCanvas.getContext('2d');

const groundImage = new Image();
groundImage.src = "img/ground.jpeg";

const foodImage = new Image();
foodImage.src = "img/apple.png"

const unit = 30;

let snake = [];

snake[0] = {
    x: 10 * unit,
    y: 13 * unit
}

let food = {
    x: Math.floor(Math.random() * 14 + 1) * unit,
    y: Math.floor(Math.random() * 20 + 1) * unit,
}

let score = 0;

let direction;

document.addEventListener("keydown", function (e) {
    let key = e.keyCode;

    if (key == "37" && direction != "RIGHT") {
        direction = "LEFT";
        console.log("LIJEVO");
    }
    else if (key == "38" &&  direction != "DOWN") {
        direction = "UP";
        console.log("GORE");
        
    } else if (key == "39" && direction != "LEFT") {
        console.log("DESNO");
        direction = "RIGHT";
    } else if (key == "40" && direction != "UP") {
        console.log("DOLE");
        direction = "DOWN";
    }
})

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
    
      
    let snakeXp = snake[0].x;
    let snakeYp = snake[0].y;



    if(direction == "LEFT")
    {
        snakeXp-=unit;
    } 

    if(direction == "UP")
    {
        snakeYp-=unit;
    } 
    if(direction == "RIGHT")
    {
        snakeXp+=unit;
    } 
    if(direction == "DOWN")
    {
        snakeYp+= unit;
    } 

    if(snakeXp == food.x && snakeYp == food.y)
    {
        score ++;
        food = {
            x: Math.floor(Math.random() * 14 + 1) * unit,
            y: Math.floor(Math.random() * 20 + 1) * unit,
        }        
    }
    else
    {
        snake.pop();
    }

    let snakeHead = {
        x : snakeXp,
        y : snakeYp
    }

    snake.unshift(snakeHead);

    gameContext.fillStyle = "white";
    gameContext.font = '45px sans-serif';
    gameContext.fillText(score, 0.5 * unit, 1.5 * unit);
}

let game = setInterval(draw, 100);