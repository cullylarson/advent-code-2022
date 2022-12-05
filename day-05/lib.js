import {compose, split, map, toInt, last, filter, headN, curry} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const getStackCount = compose(
  last,
  filter(Boolean),
  split(' '),
)

const mergeStacks = stackLines => {
  const stacks = []

  for(let i = 0; i < stackLines.length; i++) {
    for(let j = 0; j < stackLines[i].length; j++) {
      if(!stacks[j]) {
        stacks[j] = []
      }

      stacks[j].push(stackLines[i][j])
    }
  }

  return stacks
}

const getStacks = curry((numStacks, stackLine) => {
  const stacks = []

  for(let i = 0; i < numStacks; i++) {
    const startIdx = i * 4 + 1
    const endIdx = startIdx + 1
    const item = stackLine.substring(startIdx, endIdx).trim()
    stacks.push(item)
  }

  return stacks
})

const stackChunkToStacks = stackChunk => {
  const lines = stackChunk.split('\n')
  const numLine = last(lines)
  const stackLines = headN(lines.length - 1, lines)
  const numStacks = getStackCount(numLine)

  return compose(
    map(filter(Boolean)),
    mergeStacks,
    map(getStacks(numStacks)),
  )(stackLines)
}

const instructionArrToInstruction = ([, numMove, , fromStack, , toStack]) => {
  return {
    move: toInt(0, numMove),
    // -1 to make the number zero-based
    from: toInt(0, fromStack) - 1,
    // -1 to make the number zero-based
    to: toInt(0, toStack) - 1,
  }
}

const instructionChunkToInstructions = compose(
  map(instructionArrToInstruction),
  map(split(' ')),
  split('\n'),
)

const chunksToInput = ([stackChunk, instructionChunk]) => {
  return {
    stacks: stackChunkToStacks(stackChunk),
    instructions: instructionChunkToInstructions(instructionChunk),
  }
}

export const readInput = filename => then(compose(
  chunksToInput,
  split('\n\n'),
), readFile(filename, {encoding: 'utf8'}))
