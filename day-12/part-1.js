import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

// [y, x]
const movements = [
  // down
  [1, 0, 'v'],
  // up
  [-1, 0, '^'],
  // right
  [0, 1, '>'],
  // left
  [0, -1, '<'],
]

const findStart = board => {
  for(let y = 0; y < board.length; y++) {
    for(let x = 0; x < board[y].length; x++) {
      const location = getLocation(board, {x, y})

      if(location.elevation === 'S') {
        return {x, y}
      }
    }
  }
}

const getLocation = (board, position) => board[position.y][position.x]

const getElevation = location => {
  if(location.elevation === 'S') return 1
  else if(location.elevation === 'E') return 26
  else return location.elevation
}

const canMove = (board, currentPos, destinationPos) => {
  // off board
  if(destinationPos.x < 0 || destinationPos.x === board[0].length) return false
  if(destinationPos.y < 0 || destinationPos.y === board.length) return false

  const current = getLocation(board, currentPos)
  const destination = getLocation(board, destinationPos)

  if(destination.visited) return false

  if(Math.abs(getElevation(destination) - getElevation(current)) > 1) {
    return false
  }
  else {
    return true
  }
}

const move = (position, movement) => {
  return {
    x: position.x + movement[1],
    y: position.y + movement[0],
  }
}

const printBoard = (board, position) => {
  let numVisited = 0
  console.info('----------------------')
  for(let y = 0; y < board.length; y++) {
    let line = ''
    for(let x = 0; x < board[y].length; x++) {
      const current = getLocation(board, {x, y})

      if(current.elevation === 'E') {
        numVisited++
        line += current.elevation
      }
      else if(position && position.x === x && position.y === y) {
        numVisited++
        line += '*'
      }
      else if(current.visited) {
        numVisited++
        line += current.direction
      }
      else {
        line += '.'
      }
    }
    console.info(line)
  }
  console.info('VISITED:', numVisited)
}

const findPath = (board, position) => {
  let shortestPath = Infinity

  const current = getLocation(board, position)

  // this is the end
  if(current.elevation === 'E') {
    printBoard(board, position)
    return 0
  }

  // don't mark the end as visited because multiple paths might lead there
  current.visited = true

  for(const movement of movements) {
    const nextPosition = move(position, movement)
    if(!canMove(board, position, nextPosition)) continue

    current.direction = movement[2]
    const distance = 1 + findPath(board, nextPosition)

    if(distance < shortestPath) {
      shortestPath = distance
    }
  }

  current.direction = null
  current.visited = false

  return shortestPath
}

const run = board => {
  const currentPosition = findStart(board)

  return findPath(board, currentPosition)
}

then(compose(
  report,
  run,
), readInput(rel(import.meta.url, 'input.txt')))
