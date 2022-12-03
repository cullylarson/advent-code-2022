import {compose, report, map, head, curry} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, getPriority} from './lib.js'
import {rel, sum} from '../lib.js'

const findCommon = ([a, b, c]) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const cSet = new Set(c)
  return [...aSet].filter(x => bSet.has(x) && cSet.has(x))
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
