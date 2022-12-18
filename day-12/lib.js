import {compose, trim, split, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const charToNumber = x => {
  if(x === 'S' || x === 'E') return x

  const code = x.charCodeAt(0)
  return code - 96
}

const itemToObj = (elevation) => {
  return {
    elevation,
    visited: false,
    direction: null,
  }
}

export const readInput = filename => then(compose(
  map(map(itemToObj)),
  map(map(charToNumber)),
  map(split('')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
