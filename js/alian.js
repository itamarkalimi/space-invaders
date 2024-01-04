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
// globel variable for moveAliens
var fromJRight = 0
var toJRight = 8
var fromI = 0
var toI = 3
var fromJLeft = 13
var toJleft = 5
var isMoveDown = false
// var gAlianPos = {
//   i: ,
//   j: gBoard[j]
// }

function createAliens(board) {

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

function shiftBoardRight(board, fromJRight, toJRight) {
  // clear first col
  if (toJRight > 13) return
  for (var i = fromI; i < toI; i++) {
    if (board[i][fromJRight].gameObject === ALIEN) {
      board[i][fromJRight] = createCell()
      //console.log('fromJRight:', fromJRight)
    }
  }
  // create another col
  for (var i = fromI; i < toI; i++) {
    if (board[i][toJRight].gameObject === null) {
      if (!board[i][toJRight].isHit) {
        board[i][toJRight] = createCell(ALIEN)
      }
      // console.log('board[i][j] null', board[i][j])
      //console.log('toJRight:', toJRight)
    }
  }

  renderBoard(board)

}

function shiftBoardLeft(board, fromJLeft, toJleft) {
  // delete alian update dom
  if (toJleft < 0) return
  console.log('enter shiftlieft')
  gIsDirectionIdxRight = false
  for (var i = fromI; i < toI; i++) {
    if (board[i][fromJLeft].gameObject === ALIEN) {
      board[i][fromJLeft] = createCell()
      //console.log('fromJLeft:', fromJLeft)
    }
  }
  // create another col
  for (var i = fromI; i < toI; i++) {
    if (board[i][toJleft].gameObject === null) {
      if (!board[i][toJleft].isHit) {
        board[i][toJleft] = createCell(ALIEN)
      }
      //console.log('toJleft:', toJleft)
    }
  }


  renderBoard(board)
}





function shiftBoardDown(board, fromI, toI) {
  if (toI > 13) clearInterval(allAliensInterval)

  for (var j = 0; j < 8; j++) {
    if (board[fromI][j].gameObject === ALIEN) {
      board[fromI][j] = createCell()
      // console.log('board[i][j] null', board[i][j])
    }
  }

  for (var j = 0; j < 8; j++) {
    if (board[toI][j].gameObject === null) {
      if (!board[toI][j].isHit) {
        board[toI][j] = createCell(ALIEN)
      }
      // console.log('board[i][j] null', board[i][j])
    }
  }

  renderBoard(board)

}

/////////// tyota
function moveAliens() {
  allAliensInterval = setInterval(() => {
    if (gIsDirectionIdxRight) {
      shiftBoardRight(gBoard, fromJRight, toJRight)
      fromJRight++
      toJRight++
      if (toJRight > 14) {
        gIsDirectionIdxRight = false
        fromJRight = 0
        toJRight = 8
        isMoveDown = false
      }

    }

    if (!gIsDirectionIdxRight) {
      shiftBoardLeft(gBoard, fromJLeft, toJleft)

      fromJLeft--
      toJleft--
      if (fromJLeft === 0) {
        gIsDirectionIdxRight = true
        fromJLeft = 13
        toJleft = 5
        isMoveDown = true
      }
    }
    // fromJLeft = 13
    // toJleft = 5
    if (isMoveDown && gIsDirectionIdxRight) {
      shiftBoardDown(gBoard, fromI, toI)
      // fromJLeft = 13
      // toJleft = 5
      if (gIsDirectionIdxRight) {
        fromI++
        toI++
        isMoveDown = false
      }

    }
  }, ALIEN_SPEED)
  //console.table(gBoard)
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