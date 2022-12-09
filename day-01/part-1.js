import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, max} from '../lib.js'

then(compose(
  report,
  max,
), readInput(rel(import.meta.url, 'input.txt')))
