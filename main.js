var board=[];
var boardWidth =30;
var boardHeight=20;
var snakeX;
var snakeY;
var snakeDirection;
var snakeLength =5;
var lives=3;

function enterKey(event) {
   
    switch (event.key) {
        case 'ArrowUp': snakeDirection = 'Up'; break;
        case 'ArrowDown': snakeDirection = 'Down'; break;
        case 'ArrowLeft': snakeDirection = 'Left'; break;
        case 'ArrowRight': snakeDirection = 'Right'; break;
        default: return;
    }

    
    event.preventDefault();
}

function score(){
    var scoreX=Math.floor(Math.random()*boardWidth);
    var scoreY = Math.floor(Math.random()* boardHeight);
    board[scoreY][scoreX].score=1;
}
function gameLoop() {

    switch (snakeDirection) {
        case 'Up':    snakeY--; break;
        case 'Down':  snakeY++; break;
        case 'Left':  snakeX--; break;
        case 'Right': snakeX++; break;
    }
    
    if (snakeX < 0) {
        snakeX=boardWidth-1;
    }
    else if (snakeX+1 > boardWidth) {
        snakeX=0;
    }
    if (snakeY < 0) {
        snakeY=boardHeight-1;
    }
    else if (snakeY+1 > boardHeight) {
        snakeY=0;
    }
    if(board[snakeY][snakeX].snake>0){
        
        if(lives>0){
            alert("Ooooops! "+lives+" more lives");
            lives--;
            
        }
        else{
            alert("Game Over!");
            snakeLength=5;
            lives=3;
        }
        startGame();
    }
    if(board[snakeY][snakeX].score===1){
        snakeLength++;
        board[snakeY][snakeX].score=0;
        score();
    }
   
    board[snakeY][snakeX].snake = snakeLength;
    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            var cell = board[i][j];

            if (cell.snake>0) {
                cell.element.className = 'snake';
                cell.snake-=1;
            }
            else if(cell.score===1)
            {
                cell.element.className='score';
            }
            else {
                cell.element.className = '';
            }
        }
    }
    
    setTimeout(gameLoop, 1000/snakeLength);
}

function startGame() {
    //Clean Up
    for (var i = 0; i < boardHeight; i++) {
        for (var j = 0; j < boardWidth; j++) {
            board[i][j].snake = 0;
            board[i][j].score=0;
        }
    }
    
    snakeX = Math.floor(boardWidth / 2);
    snakeY = Math.floor(boardHeight / 2);
    
    snakeDirection = 'Up';

    board[snakeY][snakeX].snake = snakeLength;

    score();
    
}


function initGame(){
    var boardElement = document.getElementById('board');
    var cell={
        snake: 0
    };
    for(var i=0;i<boardHeight;i++){
        var row=[];
        for(var j=0;j<boardWidth;j++)
        {
            var cell={};
            cell.element = document.createElement('div');
            boardElement.appendChild(cell.element);
            row.push(cell);

        }
        board.push(row);
    }
    startGame();
    gameLoop();
}