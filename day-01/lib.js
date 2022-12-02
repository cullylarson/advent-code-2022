import {compose, map, split, trim, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const add = (a, b) => a + b

export const sum = xs => xs.reduce(add, 0)

export const readInput = filename => then(compose(
  map(sum),
  map(map(toInt(0))),
  map(split('\n')),
  map(trim),
  split('\n\n'),
), readFile(filename, {encoding: 'utf8'}))
