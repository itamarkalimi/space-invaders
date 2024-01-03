'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens
var gIntervalAliensLeft
var gIntervalAliensDown
var gAlienIntervalDown = 3
var gStartRowIdxRight = 0
var gEndRowIdxRight = 3
var gStartRowIdxLeft = 0
var gEndRowIdxLeft = 3
var gStartRowIdxDown = 0
var gEndRowIdxDown = 3
// The following two variables represent the part of the matrix (some rows) 
// that we should shift (left, right, and bottom) 
// We need to update those when: 
// (1) shifting down and (2) last alien was cleared from row 
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze = true
var gAlienIntervalCounter = 6
var gIsDirectionIdxRight = true
var gCellsDownj
var gCellsDownLength
var gNum = 1
// var gAlianPos = {
//   i: ,
//   j: gBoard[j]
// }

function createAliens(board) {
  board[i][j] = createCell(ALIEN)
  return board[i][j]
}



// function handleAlienHit(alianPos) {
//   if (gHero.isShoot) {
//     console.log('enter hit')
//     if (alianPos.i === gLaserPos.i &&
//       alianPos.j === gLaserPos.j) return true
//     else return false
//   }
// }
//gBoard = createBoard()
//create matrix of aliens
function createAlienArea(mat, rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
  var newMat = []
  for (var i = rowIdxStart; i < rowIdxEnd; i++) {
    const row = []
    for (var j = colIdxStart; j < colIdxEnd; j++) {
      row.push(mat[i][j])
    }
    newMat.push(row)
  }
  return newMat
}

function shiftBoardRight(board, fromI = 0, toI = 3) {
  gIsDirectionIdxRight = true
  for (var i = fromI; i < toI; i++) {
    console.log('shiftBoardRight fromI:', fromI)
    console.log('shiftBoardRight toI:', toI)
    for (var j = 8; j < board[i].length; j++) {
      if (board[i][j].gameObject === null) {
        board[i][j] = createCell(ALIEN)
        break
      }
    }
  }
  // delete alian update dom
  for (var i = fromI; i < toI; i++) {
    for (var j = 0; j < 8; j++) {
      if (board[i][j].gameObject === ALIEN) {
        board[i][j] = createCell()
        break
        // console.log('board[i][j] null', board[i][j])
      }
    }
  }
  renderBoard(board)
  console.table(board)
}

function shiftBoardLeft(board, fromI = 0, toI = 3) {
  // delete alian update dom
  gIsDirectionIdxRight = false
  for (var i = fromI; i < toI; i++) {
    console.log('enter left create null')
    for (var j = 13; j > 6; j--) {
      if (board[i][j].gameObject === ALIEN) {
        board[i][j] = createCell()
        break
        // console.log('board[i][j] null', board[i][j])
      }
    }
  }

  for (var i = fromI; i < toI; i++) {
    console.log('enter left create alien')
    for (var j = 6; j >= 0; j--) {
      if (board[i][j].gameObject === null) {
        board[i][j] = createCell(ALIEN)
        break
      }
    }
  }

  renderBoard(board)
  console.table(board)
}


function shiftBoardDown(board, fromI = 0, toI = 3) {
  // get first line
  for (var i = fromI; i < fromI + 1; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j].gameObject === ALIEN) {
        board[i][j] = createCell()

      }
    }
  }
  gCellsDownj = (gIsDirectionIdxRight) ? 6 : 0
  gCellsDownLength = (gIsDirectionIdxRight) ? board[i].length : 8
  for (var i = toI; i < toI + 1; i++) {
    for (var j = gCellsDownj; j < gCellsDownLength; j++) {
      if (board[i][j].gameObject === null) {
        board[i][j] = createCell(ALIEN)

      }
    }
  }
  // update DOM
  renderBoard(board)
}
// runs the interval for moving aliens side to side and down 
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops 
// function moveAliens() {
//   moveAlien1()
//   setTimeout(() => {
//     moveAlien2()
//   }, 5000)
//   setTimeout(() => {
//     moveAlien3()
//   }, 10000)
// }

// function moveAlien1() {
//   gIntervalAliens = setInterval(() => {
//     shiftBoardRight(gBoard, gStartRowIdx, gEndRowIdx)
//     console.log('startRowIdx:', gStartRowIdx)
//     console.log('endRowIdx:', gEndRowIdx)
//     gAlienIntervalCounter--

//     if (gAlienIntervalCounter === 0) {
//       clearInterval(gIntervalAliens)
//       gAlienIntervalCounter = 6
//       gNum = 2
//     }
//   }, ALIEN_SPEED);
// }

// function moveAlien3() {
//   gIntervalAliensDown = setInterval(() => {
//     shiftBoardDown(gBoard, gStartRowIdxDown, gEndRowIdxDown)
//     console.log('gStartRowIdxDown:', gStartRowIdxDown)
//     console.log('gEndRowIdxDown:', gEndRowIdxDown)
//     gAlienIntervalDown--

//     if (gAlienIntervalDown === 0) {
//       clearInterval(gIntervalAliensDown)
//       gAlienIntervalDown = 3
//     }
//   }, ALIEN_SPEED)
// }
// function moveAlien2() {
//   gIntervalAliensLeft = setInterval(() => {
//     shiftBoardLeft(gBoard, gStartRowIdxLeft, gEndRowIdxLeft)
//     console.log('gStartRowIdxLeft:', gStartRowIdxLeft)
//     console.log('gEndRowIdxLeft:', gEndRowIdxLeft)
//     gAlienIntervalCounter--

//     if (gAlienIntervalCounter === 0) {
//       clearInterval(gIntervalAliensLeft)
//       gAlienIntervalCounter = 6
//       gNum = 3
//     }
//   }, ALIEN_SPEED)
// }

/////////// tyota
function moveAliens() {
  gIntervalAliens = setInterval(() => {

    shiftBoardRight(gBoard, gStartRowIdxRight, gEndRowIdxRight)

    console.log('startRowIdx:', gStartRowIdxRight)
    console.log('endRowIdx:', gEndRowIdxRight)

    //change the counter
    gAlienIntervalCounter--;

    // Print the updated board
    //console.table(gBoard);

    // Check if the shift is complete
    if (gAlienIntervalCounter === 0) {
      clearInterval(gIntervalAliens);
      gAlienIntervalCounter = 6

      gIntervalAliensLeft = setInterval(() => {
        shiftBoardLeft(gBoard, gStartRowIdxLeft, gEndRowIdxLeft)

        console.log('gStartRowIdxLeft:', gStartRowIdxLeft)
        console.log('gEndRowIdxLeft:', gEndRowIdxLeft)
        //shiftBoardLeft(gBoard, startRowIdx, endRowIdx)
        //Increment the counter
        gAlienIntervalCounter--;

        // Print the updated board
        //console.table(gBoard);

        // Check if the shift is complete
        if (gAlienIntervalCounter === 0) {
          clearInterval(gIntervalAliensLeft);

          gIntervalAliensDown = setInterval(() => {
            shiftBoardDown(gBoard, gStartRowIdxDown, gEndRowIdxDown)

            console.log('gStartRowIdxDown:', gStartRowIdxDown)
            console.log('gEndRowIdxDown:', gEndRowIdxDown)

            gAlienIntervalDown--
            if (gAlienIntervalDown === 0)
              clearInterval(gIntervalAliensDown)
          })
        }
      }, ALIEN_SPEED)

    }
  }, ALIEN_SPEED)
}