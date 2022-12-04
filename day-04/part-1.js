import {compose, report, filter} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, length} from '../lib.js'

const contains = (a, b) => {
  return a[0] <= b[0] && a[1] >= b[1]
}

const isContained = ([a, b]) => {
  return contains(a, b) || contains(b, a)
}

then(compose(
  report,
  length,
  filter(isContained),
), readInput(rel(import.meta.url, 'input.txt')))
