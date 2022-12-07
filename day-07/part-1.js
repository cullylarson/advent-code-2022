import {compose, report, curry, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, sum} from '../lib.js'

const sumAtMost = curry((atMost, currentDir) => {
  const dirsTotal = compose(
    xs => xs.length ? sum(xs) : 0,
    map(sumAtMost(atMost)),
  )(currentDir.dirs)

  return currentDir.size <= atMost
    ? dirsTotal + currentDir.size
    : dirsTotal
})

then(compose(
  report,
  sumAtMost(100000),
), readInput(rel(import.meta.url, 'input.txt')))
