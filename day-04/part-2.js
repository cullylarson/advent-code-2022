import {compose, report, filter} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, length} from '../lib.js'

const within = (val, range) => {
  return (val >= range[0] && val <= range[1])
}

const overlaps = (a, b) => {
  return within(a[0], b) || within(a[1], b)
}

const isOverlapping = ([a, b]) => {
  return overlaps(a, b) || overlaps(b, a)
}

then(compose(
  report,
  length,
  filter(isOverlapping),
), readInput(rel(import.meta.url, 'input.txt')))
