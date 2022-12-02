import {compose, map, split, trim, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile, sum} from '../lib.js'

export const readInput = filename => then(compose(
  map(sum),
  map(map(toInt(0))),
  map(split('\n')),
  split('\n\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
