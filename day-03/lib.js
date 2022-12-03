import {compose, split, trim} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

export const getPriority = x => {
  const code = x.charCodeAt(0)
  return code <= 90
    // A - Z
    ? code - 38
    // a - z
    : code - 96
}

export const readInput = filename => then(compose(
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
