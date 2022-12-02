import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const max = xs => Math.max(...xs)

then(compose(
  report,
  max,
), readInput(rel(import.meta.url, 'input.txt')))
