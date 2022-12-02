import {compose, report, headN} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {sum} from '../lib.js'

const sort = xs => [...xs].sort((a, b) => b - a)

then(compose(
  report,
  sum,
  headN(3),
  sort,
), readInput('input.txt'))
