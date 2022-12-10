import {compose, report, get} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const START_TRACK = 20
// will track every nth instruction after START_TRACK
const TRACK_MOD = 40

const strength = (register, cycle) => register * cycle

const updateTrackTotal = (cycle, trackTotal, register) => {
  return (cycle - START_TRACK) % TRACK_MOD === 0
    ? trackTotal + strength(register, cycle)
    : trackTotal
}

const runAdd = ({register, cycle, trackTotal}, instruction) => {
  cycle++
  trackTotal = updateTrackTotal(cycle, trackTotal, register)
  cycle++
  trackTotal = updateTrackTotal(cycle, trackTotal, register)

  register += instruction.value

  return {
    register,
    cycle,
    trackTotal,
  }
}

const runNoop = ({register, cycle, trackTotal}, instruction) => {
  cycle++
  trackTotal = updateTrackTotal(cycle, trackTotal, register)

  return {
    register,
    cycle,
    trackTotal,
  }
}

const runInstruction = ({register, cycle, trackTotal}, instruction) => {
  switch(instruction.command) {
    case 'addx': return runAdd({register, cycle, trackTotal}, instruction)
    case 'noop': return runNoop({register, cycle, trackTotal}, instruction)
  }
}

then(compose(
  report,
  get('trackTotal', 0),
  xs => xs.reduce(runInstruction, {register: 1, cycle: 0, trackTotal: 0}),
), readInput(rel(import.meta.url, 'input.txt')))
