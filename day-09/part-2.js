import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, doStep, buildTails} from './lib.js'
import {rel} from '../lib.js'

then(compose(
  report,
  ([, lastTailVisited]) => lastTailVisited.size,
  xs => xs.reduce(doStep, [{H: [0, 0], T: buildTails(9)}, new Set()]),
), readInput(rel(import.meta.url, 'input.txt')))
