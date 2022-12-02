import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {sum} from '../lib.js'

// -1: left side wins
// 0: draw
// 1: right side wins
const winTable = {
  // rock / rock
  'A X': 0,
  // rock / paper
  'A Y': 1,
  // rock / scissor
  'A Z': -1,
  // paper / rock
  'B X': -1,
  // paper / paper
  'B Y': 0,
  // paper / scissor
  'B Z': 1,
  // scissor / rock
  'C X': 1,
  // scissor / paper
  'C Y': -1,
  // scissor / scissor
  'C Z': 0,
}

const toolScore = {
  X: 1,
  Y: 2,
  Z: 3,
}

const roundScore = {
  [-1]: 0,
  0: 3,
  1: 6,
}

const playRound = ([you, me]) => {
  const result = winTable[`${you} ${me}`]
  return toolScore[me] + roundScore[result]
}

then(compose(
  report,
  sum,
  map(playRound),
), readInput('input.txt'))
