import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

// any distance larger than this, the knots aren't close enough
const MAX_D = 1.99

const translations = [
  // down
  [0, 1],
  // up
  [0, -1],
  // right
  [1, 0],
  // left
  [-1, 0],
  // down, right
  [1, 1],
  // down, left
  [1, -1],
  // up, right
  [-1, 1],
  // up, left
  [-1, -1],
]

const applyTranslation = ([ax, ay], [tx, ty]) => ([ax + tx, ay + ty])

const updateTail = positions => {
  const headPos = positions.H
  const tailPos = positions.T
  const distance = getDistance(headPos, tailPos)

  // already close enough
  if(distance < MAX_D) {
    return tailPos
  }

  const [newTailPos] = translations.reduce(([closestPos, closestDistance], translation) => {
    const newTailPos = applyTranslation(tailPos, translation)
    const newDistance = getDistance(headPos, newTailPos)

    if(newDistance < closestDistance) {
      return [newTailPos, newDistance]
    }
    else {
      return [closestPos, closestDistance]
    }
  }, [tailPos, distance])

  return newTailPos
}

export const getDistance = ([ax, ay], [bx, by]) => {
  const xD = ax - bx
  const yD = ay - by

  return Math.sqrt((xD * xD) + (yD * yD))
}

const updateHead = ([x, y], [direction, value]) => {
  switch(direction) {
    case 'U': return [x, y - value]
    case 'D': return [x, y + value]
    case 'L': return [x - value, y]
    case 'R': return [x + value, y]
  }
}

const positionToString = ([x, y]) => `${x}-${y}`

const doStep = ([positions, tailVisited], [direction, value]) => {
  let headPos = positions.H
  let tailPos = positions.T

  tailVisited.add(positionToString(tailPos))

  for(let i = value; i > 0; i--) {
    headPos = updateHead(headPos, [direction, 1])
    tailPos = updateTail({H: headPos, T: tailPos})
    tailVisited.add(positionToString(tailPos))
  }

  return [{
    H: headPos,
    T: tailPos,
  }, tailVisited]
}

const isJest = Boolean(import.meta.jest)

if(!isJest) {
  then(compose(
    report,
    ([, tailVisited]) => tailVisited.size,
    xs => xs.reduce(doStep, [{H: [0, 0], T: [0, 0]}, new Set()]),
  ), readInput(rel(import.meta.url, 'input.txt')))
}
