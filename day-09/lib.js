import {compose, trim, split, map, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const readInput = filename => then(compose(
  map(([a, b]) => ([a, toInt(0, b)])),
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
