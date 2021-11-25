//fix bug on win
// Board whith score // Called 2 times because of ai //stopchecking if win
// Input with names that changes apearence on turn
// win animation

let grid = document.querySelector('.grid');
let turn = document.querySelector('.player');
const refresh = document.querySelector('.refresh');
const playerOne = document.querySelector('#playerone');
const playerTwo = document.querySelector('#playertwo');
let player = true; //player one = true
let gamemode = true; //one player = true
 
document.addEventListener('click', changePage)
grid.addEventListener('click', makeMove);
refresh.addEventListener('click', refreshBoard);

/**
 * Changes the diaplay of the page adding or removing classes
 * @param {event} e fired if specifics buttons are clicked
 */
function changePage(e){
  let classes = e.target.classList;
  if(e.target.tagName == 'BUTTON'){
    let main = document.querySelector('.main-page');
    let board = document.querySelector('.board-page');

    if(classes.contains('go-back')){
      main.classList.remove('hidden');
      board.classList.add('hidden');
      document.querySelector('.scoreone').innerText = 0;
      document.querySelector('.scoretwo').innerText = 0;
      refreshBoard();
    } else if (e.target.classList.contains('play')){
      main.classList.add('hidden');
      board.classList.remove('hidden');
      classes.contains('pvc') ? gamemode = true : gamemode = false;
      
    }
  }
}

/**
 * Cleans the board removing classes
 */
function refreshBoard(){
  let cells = document.querySelectorAll('.cell');
  [...cells].map((cell)=>{
    cell.classList.remove('one');
    cell.classList.remove('two');
    cell.classList.remove('full');
    cell.innerText = '';
  })
  turn = document.querySelector('.player');
  turn.innerText = '';
  player = true;
  playerOne.classList.remove('highlight');
  playerTwo.classList.remove('highlight');
}

/**
 * Paints the cell, changes player and checks for win
 * @param {event} e fired if a cell is clicked
 */
function makeMove(e) {
  let play;
  let classes = e.target.classList;
  
  if (!classes.contains('full') && classes.contains('cell')) {
    player ? (e.target.innerText = 'X') : (e.target.innerText = 'O');
    player ? (play = 'one') : (play = 'two');
    e.target.classList.add(play);

    if(!player) {
      playerOne.classList.add('highlight');
      playerTwo.classList.remove('highlight');
    }else{
      playerTwo.classList.add('highlight');
      playerOne.classList.remove('highlight');
    }

    e.target.classList.add('full');
    player = !player;
    checkWin();
    gamemode && aiMove()
  }
}

/**
 * Checks every possible win combination for each player
 */
function checkWin() {
  let cells = document.querySelectorAll('.cell');
  for (let i = 0; i < winArray.length; i++) {
    let one = 0;
    let two = 0;

    for (let j = 0; j < 3; j++) {
      cells[winArray[i][j]].classList.contains('one') && one++;
      cells[winArray[i][j]].classList.contains('two') && two++;
      
     if( one == 3 && turn) {
       turn.innerText = `Player  ${document.forms[0].playerone.value}  Wins!`;
       let scoreone = document.querySelector('.scoreone');
       scoreone.innerText = parseInt(scoreone.innerText) + 1;
      }
      if( two == 3 && turn) {
        turn.innerText = `Player  ${document.forms[0].playertwo.value}  Wins!`;
        let scoretwo = document.querySelector('.scoretwo');
        scoretwo.innerText = parseInt(scoretwo.innerText)+1;
      }
      (one == 3 || two == 3) && (turn = false);
    }
  }
}

/**
 * Random AI move
 */
function aiMove(){
  let cells = document.querySelectorAll('.cell');
  let empty = [...cells].filter((cell)=>cell.classList.contains('full'));

  while (empty.length < 9) {
    let number = Math.floor(Math.random() * 9);
    if(!cells[number].classList.contains('full')){
      cells[number].innerText = 'O';
  
      playerOne.classList.add('highlight');
      playerTwo.classList.remove('highlight');

      cells[number].classList.add('full');
      cells[number].classList.add('two'); 
      player = true;
      checkWin();
      break;
    }
    
  }
}