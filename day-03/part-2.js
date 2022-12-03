import {compose, report, map, head} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, getPriority} from './lib.js'
import {rel, sum} from '../lib.js'

const findCommon = ([a, b, c]) => {
  const aSet = new Set(a)
  const bSet = new Set(b)
  const cSet = new Set(c)
  return [...aSet].filter(x => bSet.has(x) && cSet.has(x))
}

const groupThree = xs => {
  const groups = []

  for(let i = 0; i < xs.length; i += 3) {
    groups.push([xs[i], xs[i + 1], xs[i + 2]])
  }

  return groups
}

then(compose(
  report,
  sum,
  map(getPriority),
  map(head),
  map(findCommon),
  groupThree,
), readInput(rel(import.meta.url, 'input.txt')))
