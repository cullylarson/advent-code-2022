import {compose, map, split, trim} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const LOSE = -1
export const DRAW = 0
export const WIN = 1

export const readInput = filename => then(compose(
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
