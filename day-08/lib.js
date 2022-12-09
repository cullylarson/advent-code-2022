import {compose, trim, split, map, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const getCol = (board, x) => {
  const row = []

  for(let y = 0; y < board.length; y++) {
    row.push(board[y][x])
  }

  return row
}

export const readInput = filename => then(compose(
  map(map(toInt(0))),
  map(split('')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
