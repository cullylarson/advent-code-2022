import {compose, report, map, head, split} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, getPriority} from './lib.js'
import {rel, sum} from '../lib.js'

const intersect = ([a, b]) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  return [...aSet].filter(x => bSet.has(x))
}

const twain = x => {
  const halfway = x.length / 2
  return [x.substring(0, halfway), x.substring(halfway)]
}

then(compose(
  report,
  sum,
  map(getPriority),
  map(head),
  map(intersect),
  map(map(split(''))),
  map(twain),
), readInput(rel(import.meta.url, 'input.txt')))
