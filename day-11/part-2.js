import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, run} from './lib.js'
import {rel} from '../lib.js'

const NUM_ROUNDS = 10000
const WORRY_DIVISOR = 1

then(compose(
  report,
  run(WORRY_DIVISOR, NUM_ROUNDS),
), readInput(rel(import.meta.url, 'input.txt')))
