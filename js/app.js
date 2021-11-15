let grid = document.querySelector('.grid');
let turn = document.querySelector('.player');
const refresh = document.querySelector('.refresh');
let player = true; //player one = true
 
document.addEventListener('click', changePage)
grid.addEventListener('click', makeMove);
refresh.addEventListener('click', refreshBoard);

/**
 * Changes the diaplay of the page adding or removing classes
 * @param {*} event fired if specifics buttons are clicked
 */
function changePage(e){
  console.log(e);
  if(e.target.tagName == 'BUTTON'){
    let main = document.querySelector('.main-page');
    let board = document.querySelector('.board-page');
    if(e.target.classList.contains('go-back')){
      main.classList.remove('hidden');
      board.classList.add('hidden');
    } else if (e.target.classList.contains('play')){
      main.classList.add('hidden');
      board.classList.remove('hidden');
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
}

/**
 * Paints the cell, changes player and checks for win
 * @param {*} event fired if a cell is clicked
 */
function makeMove(e) {
  let play;
  let cls = e.target.classList;

  if (!cls.contains('full') && cls.contains('cell')) {
    player ? (e.target.innerText = 'X') : (e.target.innerText = 'O');
    player ? (play = 'two') : (play = 'one');

    turn.innerText = `Turn: Player ${play}`;
    e.target.classList.add('full');
    e.target.classList.add(play);
    player = !player;
    checkWin();
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
      cells[winArray[i][j]].classList.contains('one') ? one++ : '';
      cells[winArray[i][j]].classList.contains('two') ? two++ : '';

      one == 3 ? (turn.innerText = 'Player two Wins!') : ''; //the order is messed up
      two == 3 ? (turn.innerText = 'Player one Wins!') : '';
      one == 3 || two == 3 ? (turn = '') : '';
    }
  }
}
