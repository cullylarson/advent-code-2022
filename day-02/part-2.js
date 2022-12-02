import {compose, report, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {sum} from '../lib.js'

const resultTable = {
  // lose
  X: -1,
  // draw
  Y: 0,
  // win
  Z: 1,
}

const toolScore = {
  R: 1,
  P: 2,
  S: 3,
}

const playedToolScore = {
  // rock / lose (scissor)
  'A X': toolScore.S,
  // rock / draw (rock)
  'A Y': toolScore.R,
  // rock / win (paper)
  'A Z': toolScore.P,
  // paper / lose (rock)
  'B X': toolScore.R,
  // paper / draw (paper)
  'B Y': toolScore.P,
  // paper / win (scissor)
  'B Z': toolScore.S,
  // scissor / lose (paper)
  'C X': toolScore.P,
  // scissor / draw (scissor)
  'C Y': toolScore.S,
  // scissor / win (rock)
  'C Z': toolScore.R,
}

const roundScore = {
  [-1]: 0,
  0: 3,
  1: 6,
}

const playRound = ([you, me]) => {
  const result = resultTable[me]
  return playedToolScore[`${you} ${me}`] + roundScore[result]
}

then(compose(
  report,
  sum,
  map(playRound),
), readInput('input.txt'))
