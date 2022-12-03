import {compose, report, map, head, curry, tail} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, getPriority} from './lib.js'
import {rel, sum} from '../lib.js'

const findCommon = (arrs) => {
  const sets = arrs.map(x => new Set(x))
  const headSet = head(sets)
  const tailSets = tail(sets)
  return [...headSet].filter(x => tailSets.every(y => y.has(x)))
}

const group = curry((n, xs) => xs.reduce((acc, x, i) => {
  const groupNum = Math.floor(i / n)

  if(!acc[groupNum]) {
    acc[groupNum] = []
  }

  acc[groupNum].push(x)

  return acc
}, []))

then(compose(
  report,
  sum,
  map(getPriority),
  map(head),
  map(findCommon),
  group(3),
), readInput(rel(import.meta.url, 'input.txt')))
