import {compose, trim, split, map, toInt} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const lineToInstruction = ([command, value]) => {
  return {command, value: value === undefined ? undefined : toInt(0, value)}
}

export const readInput = filename => then(compose(
  map(lineToInstruction),
  map(split(' ')),
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
