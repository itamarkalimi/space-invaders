'use strict'
var laserInterval
const LASER_SPEED = 80
var gLaserPos = {
  i: --gHero.pos.i,
  j: gHero.pos.j
}
// Handle game keys 
function onKeyActive(eventKeyboard) {
  var i = gHero.pos.i
  var j = gHero.pos.j
  // const nextLaserLocation = {
  //   i: gHero.pos.i--,
  //   j: gHero.pos.j
  // }
  switch (eventKeyboard.key) {
    case 'ArrowUp':
      shoot(--i, j)
      gHero.isShoot = true
      //console.log('i:', i, 'j:', j)
      break;
    default:
      return null
  }
  //return nextLaserLocation
}

function shoot(i, j) {
  //console.log('enter shoot')
  if (!gGame.isOn) return
  // // DONE: use getNextLocation(), nextCell
  // const nextLaserLocation = onKeyActive(eventKeyboard)
  // const nextLaserCell = gBoard[nextLaserLocation.i][nextLaserLocation.j]
  // const fromCell = gBoard[gLaserPos.i][gLaserPos.j]
  // const toCell = gBoard[i][j]

  laserInterval = setInterval(() => {
    blinkLaser(i--, j)

  }, LASER_SPEED)

}


function blinkLaser(i, j) {
  console.log('entermovelaser')

  if (gHero.isShoot) {

    //nextLaserLocation.j = gHero.pos.j
    // DONE: moving from current location:
    // DONE: update the model
    if (gBoard[i][j].gameObject !== ALIEN) {
      gBoard[gLaserPos.i][gLaserPos.j] = createCell(EMPTY)
      console.log('gLaserPos', gLaserPos)
      // DONE: update the DOM
      updateCell(gLaserPos, EMPTY)
      // DONE: Move the hero to new location:
      // DONE: update the model
      gBoard[i][j] = createCell(LASER)
      //console.log(' pos after:', pos)
      gLaserPos = { i, j }
      // DONE: update the DOM
      updateCell(gLaserPos, LASER)
      // if laser hit alian return and stop the game
      console.log('gBoard[i][j].gameObject', gBoard[i][j].gameObject)
      if (gLaserPos === gBoard[0][BOARD_SIZE]) {
        clearInterval(laserInterval)
      }
      return
    } else {

      var gLaserPosAfterHit = { i: i++, j }
      clearInterval(laserInterval)
      updateCell(gLaserPos, EMPTY)
      updateCell(gLaserPosAfterHit, EMPTY)
      gAlianCounter += 10
      const elScore = document.querySelector('.score')
      elScore.innerText = `Your score is ${gAlianCounter}`
      gGame.alienCount++
      if (gGame.alienCount === 24) {
        const elVicory = document.querySelector('.victory')
        elVicory.innerText = 'You Won'
        const elRestart = document.querySelector('.restart')
        elRestart.style.display = 'block'
      }
      return

    }
  }

  // if (!gGame.isOn) return
  // if (!nextLaserLocation) return

  // // update model
  // const nextLaserLocation = {
  //   i: gLaserPos.i,
  //   j: gLaserPos.j
  // }

  //   laserPos.i++
  //   console.log('pos.i', laserPos.i)
  //   const nextCell = gBoard[laserPos.i][laserPos.j]
  //   console.log('nextCell', nextCell)
  //   if (nextCell === createCell(ALIEN)) {
  //     // DONE: moving from current location:
  //     // DONE: update the model
  //     gBoard[laserPos.i][laserPos.j] = createCell()
  //     // DONE: update the DOM
  //     updateCell(gAlianPos, EMPTY)
  //     // DONE: Move the hero to new location:
  //     // DONE: update the model
  //     gBoard[nextLaserLocation.i][nextLaserLocation.j] = createCell(HERO)
  //     //console.log(' pos after:', pos)
  //     laserPos = nextLaserLocation
  //     // DONE: update the DOM
  //     updateCell(laserPos, LASER)
}


///////////


// Sets an interval for shutting (blinking) the laser up towards aliens 
function shoot1() {
  // gHero.isShoot = true

  // if (!gGame.isOn) return
  // // DONE: use getNextLocation(), nextCell
  // const nextLocation = onKeyDown(eventKeyboard)
  // if (!nextLocation) return
  // const nextCell = gBoard[nextLocation.i][nextLocation.j]


  // gBoard[gLaserPos.i][gLaserPos.j] = createCell(LASER)
  // console.log('gLaserPos', gLaserPos)
  // // update DOM
  // updateCell(gLaserPos, LASER)

  //   console.log('shoot')
  // laserInterval = setInterval(() => { blinkLaser() }, LASER_SPEED)
  //   // create laser object
  //   // change location with interval
  // }
  // // renders a LASER at specific cell for short time and removes it 
}

