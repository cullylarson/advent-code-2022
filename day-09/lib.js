import {compose, trim, split, map, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

// if knots are this distance or larger, they aren't close enough
const MAX_D = 2

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

export const doStep = ([positions, lastTailVisited], [direction, value]) => {
  let headPos = positions.H
  const tailPoses = positions.T

  lastTailVisited.add(positionToString(tailPoses[tailPoses.length - 1]))

  for(let i = value; i > 0; i--) {
    headPos = updateHead(headPos, [direction, 1])

    for(let j = 0; j < tailPoses.length; j++) {
      if(j === 0) {
        tailPoses[j] = updateTail({H: headPos, T: tailPoses[j]})
      }
      else {
        tailPoses[j] = updateTail({H: tailPoses[j - 1], T: tailPoses[j]})
      }
    }

    lastTailVisited.add(positionToString(tailPoses[tailPoses.length - 1]))
  }

  return [{
    H: headPos,
    T: tailPoses,
  }, lastTailVisited]
}

export const buildTails = n => {
  const tails = []

  for(let i = 0; i < n; i++) {
    tails.push([0, 0])
  }

  return tails
}

export const readInput = filename => then(compose(
  map(([a, b]) => ([a, toInt(0, b)])),
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
