import {compose, split, curry, headN} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const allDifferent = xs => new Set(xs).size === xs.length

export const findStart = curry((markerLength, input) => {
  let maybeMarker = []

  for(let i = 0; i < input.length; i++) {
    maybeMarker.unshift(input[i])
    maybeMarker = headN(markerLength, maybeMarker)

    if(allDifferent(maybeMarker) && maybeMarker.length === markerLength) {
      return i + 1
    }
  }
})

export const readInput = filename => then(compose(
  split(''),
), readFile(filename, {encoding: 'utf8'}))
