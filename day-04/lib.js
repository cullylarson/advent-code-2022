import {compose, split, trim, map, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const readInput = filename => then(compose(
  map(map(map(toInt(0)))),
  map(map(split('-'))),
  map(split(',')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
