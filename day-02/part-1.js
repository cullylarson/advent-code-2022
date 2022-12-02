import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, LOSE, DRAW, WIN} from './lib.js'
import {sum} from '../lib.js'

// -1: left side wins
// 0: draw
// 1: right side wins
const winTable = {
  // rock / rock
  'A X': DRAW,
  // rock / paper
  'A Y': WIN,
  // rock / scissor
  'A Z': LOSE,
  // paper / rock
  'B X': LOSE,
  // paper / paper
  'B Y': DRAW,
  // paper / scissor
  'B Z': WIN,
  // scissor / rock
  'C X': WIN,
  // scissor / paper
  'C Y': LOSE,
  // scissor / scissor
  'C Z': DRAW,
}

const toolScore = {
  X: 1,
  Y: 2,
  Z: 3,
}

const roundScore = {
  [LOSE]: 0,
  [DRAW]: 3,
  [WIN]: 6,
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
