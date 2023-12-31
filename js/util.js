'use strict'
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
// function createCell(gameObject = null) {
//   return { type: SKY, gameObject: gameObject }
// }
function getElCell(location) {
  return document.querySelector(`[data-i='${location.i}'][data-j='${location.j}']`)
}