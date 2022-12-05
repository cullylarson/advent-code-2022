import {compose, report, head, map, join} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const runInstruction = (stacks, instruction) => {
  const items = []

  for(let i = 0; i < instruction.move; i++) {
    const item = stacks[instruction.from].shift()
    items.push(item)
  }

  for(let i = 0; i < instruction.move; i++) {
    stacks[instruction.to].unshift(items.pop())
  }

  return stacks
}

const runInstructions = ({instructions, stacks}) => {
  return instructions.reduce(runInstruction, stacks)
}

then(compose(
  report,
  join(''),
  map(head),
  runInstructions,
), readInput(rel(import.meta.url, 'input.txt')))
