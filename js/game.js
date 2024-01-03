'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const HERO = '♆'
const ALIEN = '👽'
const LASER = '⤊'
const LaserSuperMode = '^'
const SKY = ''
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN} 
var gBoard
var gAlianBoard
var gMoveAliansRight = true
var gGame = {
  isOn: false,
  alienCount: 0
}
//create matrix
function createMat(ROWS, COLS) {
  const mat = []
  for (var i = 0; i < ROWS; i++) {
    const row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}
// Called when game loads 
function init() {
  gGame.isOn = true
  gGame.alienCount = 0
  gBoard = createBoard()
  //
  renderBoard(gBoard)
  const elRestart = document.querySelector('.restart')
  elRestart.style.display = 'none'
  gAlianHitCounter = 0
  const elScore = document.querySelector('.score')
  elScore.innerText = `Your score is ${gAlianHitCounter}`
  const elVictory = document.querySelector('.victory')
  elVictory.innerText = ''
  moveAliens()
  renderBoard(gBoard)
  gCounterSuperMode = 3
  // var allAliensInterval = setInterval(() => {

  //   gStartRowIdxRight++
  //   gEndRowIdxRight++
  //   gStartRowIdxLeft++
  //   gEndRowIdxLeft++
  //   gStartRowIdxDown++
  //   gEndRowIdxDown++
  // }, 10000)
  // gAlianBoard = createAlienArea(gBoard, 0, ALIEN_ROW_COUNT, 0, ALIEN_ROW_LENGTH)
  // var allAliensInterval = setInterval(() => {

  //   moveAliens()

  // }, 10000)
  // if (gBoard[BOARD_SIZE] === BOARD_SIZE) {
  //   clearInterval(allAliensInterval)
  // }
  //console.log('gBoard', gBoard)

}


//console.log('gAlianBoard2', gAlianBoard)
// Create and returns the board with aliens on top, ground at bottom 
// use the functions: createCell, createHero, createAliens 

function createBoard() {
  const board = []
  for (var i = 0; i < BOARD_SIZE; i++) {
    const row = []
    for (var j = 0; j < BOARD_SIZE; j++) {
      row.push(createCell())
    }
    board.push(row)
  }
  for (var i = 0; i < ALIEN_ROW_COUNT; i++) {
    for (var j = 0; j < ALIEN_ROW_LENGTH; j++) {
      board[i][j] = createCell(ALIEN)
    }
  }
  createHero(board)
  return board

}

// Render the board as a <table> to the page 
function renderBoard(board) {
  // DONE: Render the board
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {

    strHTML += '<tr>\n'
    for (var j = 0; j < board[i].length; j++) {
      const cell = board[i][j]
      strHTML += `<td class="cell" data-i="${i}" data-j="${j}" > `
      if (cell.gameObject === ALIEN) {
        strHTML += ALIEN
      } else if (cell.gameObject === HERO) {
        strHTML += HERO
      }
      strHTML += `</td >`
    }
    strHTML += '</tr>\n'


  }



  const elTable = document.querySelector('.board')
  elTable.innerHTML = strHTML
}
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject
  }
}
// position such as: {i: 2, j: 7} 
function updateCell(pos, gameObject = null) {
  // update model 
  gBoard[pos.i][pos.j].gameObject = gameObject
  // update DOM
  var elCell = getElCell(pos)
  elCell.innerHTML = gameObject || ''
}