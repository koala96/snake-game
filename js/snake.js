//=============================================================//
//Constant variables: groundImage - image for canvas background//
//                    foodImage - image for food object        //
//                    unit - one piece of ground               //
//                    snakeMoving - audio for moving snake     //
//                    snakeHit - audio when snake hits border  //
//                    eatCow - audio when snake eats cow       //
//=============================================================//
const snakeCanvas = document.getElementById("snake");
const gameContext = snakeCanvas.getContext('2d');

const groundImage = new Image();
groundImage.src = "img/ground.jpeg";

const foodImage = new Image();
foodImage.src = "img/cow.png"

const snakeMoving = new Audio();
snakeMoving.src = "audio/keyboardclick.wav";

const snakeHit = new Audio();
snakeHit.src = "audio/punch.wav";

const eatCow = new Audio();
eatCow.src = "audio/eatCow.wav";

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
 let eventListener = () => {
    document.addEventListener("keydown", function (e) {
        let key = e.keyCode;

        if (key == "37" && direction != "RIGHT") {
            snakeMoving.play();
            direction = "LEFT";
            console.log("LEFT");
        }
        else if (key == "38" && direction != "DOWN") {
            snakeMoving.play();
            direction = "UP";
            console.log("UP");

        } else if (key == "39" && direction != "LEFT") {
            snakeMoving.play();
            console.log("RIGHT");
            direction = "RIGHT";
        } else if (key == "40" && direction != "UP") {
            snakeMoving.play();
            console.log("DOWN");
            direction = "DOWN";
        }
    })
}

//======================================================//
// Function for drawing backgorund image for game       //
//======================================================//
let drawBackground = () => {
    gameContext.drawImage(groundImage, 0, 0);
}


//======================================================//
// Function for drawing score of the game               //
//======================================================//
let drawScore = () => {
    gameContext.fillStyle = "white";
    gameContext.font = '45px sans-serif';
    gameContext.fillText(score, 0.5 * unit, 1.5 * unit);
}


//======================================================//
// Function for drawing food object for game            //
//======================================================//
let drawFood = () => {
    gameContext.drawImage(foodImage, food.x, food.y);
}


//======================================================//
// Function for drawing snake object for game           //
//======================================================//
let drawSnake = () => {
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            gameContext.fillStyle = 'blue';
        }
        else {
            gameContext.fillStyle = 'yellow';
        }

        gameContext.fillRect(snake[i].x, snake[i].y, unit, unit);
    }
}


//======================================================//
// Function for drawing objects on canvas               //
//======================================================//
let drawOnCanvas = () => {

    //Invoking methods for drawing game objects on canvas
    eventListener();
    drawBackground();
    drawSnake();
    drawFood();
    drawScore();

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
        eatCow.play();
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
    if (snakeXp < 0 || snakeXp > 19 * unit || snakeYp < 0 || snakeYp > 19 * unit || isDead(snakeHead, snake)) {
        snakeHit.play();
        clearInterval(game);
        setTimeout(location.reload.bind(location), 800);
        
    }

    //When snake hits her body
    function isDead(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                snakeHit.play();
                return true;
            }
        }
        return false;
    }
    snake.unshift(snakeHead);
}
let game = setInterval(drawOnCanvas, 80);