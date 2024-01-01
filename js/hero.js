'use strict'
const EMPTY = ''
var gHero = {
  pos: { i: 12, j: 5 },
  isShoot: false
}

// creates the hero and place it on board 
function createHero(board) {
  board[gHero.pos.i][gHero.pos.j] = createCell(HERO)
}
// Handle game keys 
function onKeyDown(eventKeyboard) {
  console.log('enter hero move')
  const nextLocation = {
    i: gHero.pos.i,
    j: gHero.pos.j
  }

  switch (eventKeyboard.key) {
    case 'ArrowLeft':
      nextLocation.j--
      break;
    case 'ArrowRight':
      nextLocation.j++
      break;
    // case 'ArrowUp':
    //   nextLaserLocation.i--
    //   shoot(nextLaserLocation);
    //   break;
    default:
      return null
  }
  return nextLocation
}
// Move the hero right (1) or left (-1) 
function moveHero(eventKeyboard) {
  if (!gGame.isOn) return
  // DONE: use getNextLocation(), nextCell
  const nextLocation = onKeyDown(eventKeyboard)
  if (!nextLocation) return
  const nextCell = gBoard[nextLocation.i][nextLocation.j]


  // DONE: moving from current location:
  // DONE: update the model
  gBoard[gHero.pos.i][gHero.pos.j] = createCell()
  // DONE: update the DOM
  updateCell(gHero.pos, EMPTY)
  // DONE: Move the hero to new location:
  // DONE: update the model
  gBoard[nextLocation.i][nextLocation.j] = createCell(HERO)
  //console.log(' pos after:', pos)
  gHero.pos = nextLocation
  // DONE: update the DOM
  updateCell(gHero.pos, HERO)


}



// Sets an interval for shutting (blinking) the laser up towards aliens 
