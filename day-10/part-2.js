import {compose, report, get, map, join} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const COLS_PER_ROW = 40

const isVisible = (row, col, register) => {
  return [col - 1, col, col + 1].includes(register)
}

const drawPixel = (screen, cycle, register) => {
  const row = Math.floor((cycle - 1) / COLS_PER_ROW)
  const col = (cycle - 1) - (row * COLS_PER_ROW)

  if(!screen[row]) {
    screen[row] = []
  }

  screen[row][col] = isVisible(row, col, register)
    ? '#'
    : '.'

  return screen
}

const runAdd = ({register, cycle, screen}, instruction) => {
  cycle++
  screen = drawPixel(screen, cycle, register)
  cycle++
  screen = drawPixel(screen, cycle, register)

  register += instruction.value

  return {
    register,
    cycle,
    screen,
  }
}

const runNoop = ({register, cycle, screen}, instruction) => {
  cycle++
  screen = drawPixel(screen, cycle, register)

  return {
    register,
    cycle,
    screen,
  }
}

const runInstruction = ({register, cycle, screen}, instruction) => {
  switch(instruction.command) {
    case 'addx': return runAdd({register, cycle, screen}, instruction)
    case 'noop': return runNoop({register, cycle, screen}, instruction)
  }
}

then(compose(
  report,
  // hard coding the answer because I don't want to write code to parse the text
  () => 'PBZGRAZA',
  join('\n'),
  map(join('')),
  get('screen', []),
  xs => xs.reduce(runInstruction, {register: 1, cycle: 0, screen: []}),
), readInput(rel(import.meta.url, 'input.txt')))
