//=============================================================//
//Constant variables: groundImage - image for canvas background//
//                    foodImage - image for food object        //
//                    unit - one piece of ground               //
//=============================================================//
const snakeCanvas = document.getElementById("snake");
const gameContext = snakeCanvas.getContext('2d');

const groundImage = new Image();
groundImage.src = "img/ground.jpeg";

const foodImage = new Image();
foodImage.src = "img/apple.png"

const unit = 30;

//=============================================================//
//Variables: snake - snake object of the game                  //
//           food - food object of the game                    //
//           score - score of the game                         //
//           direction - direction of snake                    //
//=============================================================//
let snake = [];

snake[0] = {
    x: 10 * unit,
    y: 13 * unit
}

let food = {
    x: Math.floor(Math.random() * 20) * unit,
    y: Math.floor(Math.random() * 20) * unit,
}

let score = 0;

let direction;

//======================================================//
// Function for adding event listener on Keyboard Arrays//
//======================================================//
function eventListener() {
    document.addEventListener("keydown", function (e) {
        let key = e.keyCode;

        if (key == "37" && direction != "RIGHT") {
            direction = "LEFT";
            console.log("LEFT");
        }
        else if (key == "38" && direction != "DOWN") {
            direction = "UP";
            console.log("UP");

        } else if (key == "39" && direction != "LEFT") {
            console.log("RIGHT");
            direction = "RIGHT";
        } else if (key == "40" && direction != "UP") {
            console.log("DOWN");
            direction = "DOWN";
        }
    })
}


//======================================================//
// Function for drawing objects on canvas               //
//======================================================//
function drawOnCanvas() {

    //Background Image
    gameContext.drawImage(groundImage, 0, 0);

    //Snake object
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            gameContext.fillStyle = 'blue';
        }
        else {
            gameContext.fillStyle = 'yellow';
        }

        gameContext.fillRect(snake[i].x, snake[i].y, unit, unit);
    }

    //Food object
    gameContext.drawImage(foodImage, food.x, food.y);

    //Score
    gameContext.fillStyle = "white";
    gameContext.font = '45px sans-serif';
    gameContext.fillText(score, 0.5 * unit, 1.5 * unit);

    let snakeXp = snake[0].x;
    let snakeYp = snake[0].y;

    //Snake direction
    if (direction == "LEFT") {
        snakeXp -= unit;
    }

    if (direction == "UP") {
        snakeYp -= unit;
    }
    if (direction == "RIGHT") {
        snakeXp += unit;
    }
    if (direction == "DOWN") {
        snakeYp += unit;
    }

    //Snake grow
    if (snakeXp == food.x && snakeYp == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * unit,
            y: Math.floor(Math.random() * 20) * unit,
        }
    }
    else {
        snake.pop();
    }

    let snakeHead = {
        x: snakeXp,
        y: snakeYp
    }

    //When snake hits border of ground 
    if (snakeXp < -unit + 1 || snakeXp > 19 * unit || snakeYp < -unit + 1 || snakeYp > 19 * unit || isDead(snakeHead, snake)) {
        clearInterval(game);
        location.reload();
    }

    //When snake hits her body
    function isDead(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }
    snake.unshift(snakeHead);
}
let game = setInterval(drawOnCanvas, 100);
eventListener();