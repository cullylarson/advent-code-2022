import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, findStart} from './lib.js'
import {rel} from '../lib.js'

const MARKER_LENGTH = 14

then(compose(
  report,
  findStart(MARKER_LENGTH),
), readInput(rel(import.meta.url, 'input.txt')))
