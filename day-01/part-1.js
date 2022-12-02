import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'

const max = xs => Math.max(...xs)

then(compose(
  report,
  max,
), readInput('input.txt'))
