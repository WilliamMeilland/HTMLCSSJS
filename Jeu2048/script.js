const array = Array(16).fill(0);
let score = 0;
let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
const gridCellsArray = Array.from(document.querySelectorAll('.grid-cell'));
const retryButton = document.querySelector('.retry-button');
const gameMessageRetryButton = document.getElementById('retry-button');
const gameMessage = document.querySelector('.game-message');
const scoreDisplay = document.querySelector('.score-container .score');
const bestScoreDisplay = document.querySelector('.best-container .score');

function displayMessage() {
    if(testEndGame()){
        gameMessage.style.display = 'flex';
    }
    else{
        gameMessage.style.display = 'none';
    }
}

function displayGrid() {
    clearGrid();
    gridCellsArray.map((cell,index) => {
        if(array[index] !==0) {
            cell.classList.add('cell'+array[index]);
            cell.innerHTML = array[index];
        }
    });
}

function clearGrid() {
    gridCellsArray.map((cell)=>{
        clearCell(cell);
    });
}

function clearCell(cell) {
    cell.classList = 'grid-cell';
    cell.innerHTML = '';
}

function displayScore() {
    scoreDisplay.innerHTML = score;
}

function displayBestScore() {
    if (score > bestScore) {
        bestScore = score;
        bestScoreDisplay.innerHTML = bestScore;
        localStorage.setItem('bestScore', bestScore); 
    } else {
        bestScoreDisplay.innerHTML = bestScore;
    }
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get2or4(){
    return getRandomInt(0, 3) === 0 ? 4 : 2;
}

function setUpGame(){
    array.fill(0);
    do{
        array[getRandomInt(0, 15)] = get2or4();
    }
    while(array.filter(num => num !== 0).length < 2);
    score = 0;
    displayMessage();
    displayGrid();
    displayScore();
    displayBestScore();
};

function pushTop(){
    for(let i=0; i<4; i++){
        for(let j=0; j<3; j++){
            h=j+1;
            k=j;
            while(k>=0){
                if(array[k*4+i] === 0) {
                    array[k*4+i]=array[h*4+i];
                    array[h*4+i]=0;
                }
                k--;
                h--;
            }
        }
    }
}

function addTop(){
    for(let i=0; i<4; i++){
        for(let j=0; j<3; j++){
            addArray(j*4+i, (j+1)*4+i);
        }
    }
}

function pushDown(){
    for(let i=0; i<4; i++){
        for(let j=3; j>0; j--){
            h=j-1;
            k=j;
            while(k<=3){
                if(array[k*4+i] === 0) {
                    array[k*4+i]=array[h*4+i];
                    array[h*4+i]=0;
                }
                k++;
                h++;
            }
        }
    }
}

function addDown(){
    for(let i=0; i<4; i++){
        for(let j=3; j>0; j--){
            addArray(j*4+i, (j-1)*4+i);
        }
    }
}

function pushLeft(){
    for(let i=0; i<4; i++){
        for(let j=0; j<3; j++){
            h=j+1;
            k=j;
            while(k>=0){
                if(array[i*4+k] === 0) {
                    array[i*4+k]=array[i*4+h];
                    array[i*4+h]=0;
                }
                k--;
                h--;
            }
        }
    }
}

function addLeft(){
    for(let i=0; i<4; i++){
        for(let j=0; j<3; j++){
            addArray(i*4+j, i*4+(j+1));
        }
    }
}

function pushRight(){
    for(let i=0; i<4; i++){
        for(let j=3; j>0; j--){
            h=j-1;
            k=j;
            while(k<=3){
                if(array[i*4+k] === 0) {
                    array[i*4+k]=array[i*4+h];
                    array[i*4+h]=0;
                }
                k++;
                h++;
            }
        }
    }
}

function addRight(){
    for(let i=0; i<4; i++){
       for(let j=3; j>0; j--){
            addArray(i*4+j, i*4+(j-1));
        }
    }
}

function addArray(index1, index2){
    if(array[index1] === array[index2]){
        score += array[index1] * 2;
        array[index1] += array[index2];
        array[index2] = 0;
    }
}

function moveRight(){
    pushRight();
    addRight();
    pushRight();
}

function moveLeft(){
    pushLeft();
    addLeft();
    pushLeft();
}

function moveTop(){
    pushTop();
    addTop();
    pushTop();
}

function moveDown(){
    pushDown();
    addDown();
    pushDown();
}

function testEndGame(){
    for(let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            if(array[i*4+j] === 0){
                return false;
            }
            else{
                if(j<3 && array[i*4+j] === array[i*4+j+1]){
                    return false;
                }
                if(i<3 && array[i*4+j] === array[(i+1)*4+j]){
                    return false;
                }
            }
        }
    }
    return true;
}

function setRandomNumber(){
    let emptyCells = array.map((num, index) => num === 0 ? index : null).filter(num => num !== null);
    if(emptyCells.length > 0){
        array[emptyCells[getRandomInt(0, emptyCells.length-1)]] = get2or4();
    }
}

function displayAfterMoove(){
    setRandomNumber();
    displayMessage();
    displayGrid();
    displayScore();
    displayBestScore();
}

document.addEventListener('DOMContentLoaded', () =>{
    setUpGame();
});

retryButton.addEventListener('click', () => {
    setUpGame();
});

gameMessageRetryButton.addEventListener('click', () => {
    setUpGame();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        moveTop();
        displayAfterMoove();
    }
    else if (event.key === 'ArrowDown') {
        moveDown();
        displayAfterMoove();
    }
    else if (event.key === 'ArrowLeft') {
        moveLeft();
        displayAfterMoove();
    }
    else if (event.key === 'ArrowRight') {
        moveRight();
        displayAfterMoove();
    }
});