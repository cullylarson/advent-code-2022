import {report, compose, trim, split, map, toInt, curry, headN, get} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile} from '../lib.js'

const getMonkeyNumber = str => {
  const results = /^Monkey (.*?):$/.exec(str)
  return toInt(0, results[1])
}

const getStartingItems = str => {
  const parts = str.split(':')

  return compose(
    map(x => BigInt(x)),
    map(toInt(0)),
    split(', '),
    trim,
  )(parts[1])
}

const operandToValue = operand => {
  return operand === 'old'
    ? 'old'
    : BigInt(toInt(0, operand))
}

const getOperation = str => {
  const parts = str.split(' = ')

  const operationParts = compose(
    split(' '),
    trim,
  )(parts[1])

  return {
    operation: operationParts[1],
    operands: [operandToValue(operationParts[0]), operandToValue(operationParts[2])],
  }
}

const getTest = str => {
  const parts = str.split(' by ')

  return compose(
    toInt(0),
    trim,
  )(parts[1])
}

const getConditionMonkey = str => {
  const parts = str.split(' monkey ')

  return compose(
    toInt(0),
    trim,
  )(parts[1])
}

const indexByMonkey = monkeyObjs => {
  const monkies = []

  for(const monkey of monkeyObjs) {
    monkies[monkey.num] = monkey
  }

  return monkies
}

const monkeyLinesToObj = lines => {
  const num = getMonkeyNumber(lines[0])
  const items = getStartingItems(lines[1])
  const operation = getOperation(lines[2])
  const test = getTest(lines[3])
  const trueMonkey = getConditionMonkey(lines[4])
  const falseMonkey = getConditionMonkey(lines[5])
  return {num, items, operation, test, trueMonkey, falseMonkey, inspections: 0}
}

const runOperation = (item, operation) => {
  const a = operation.operands[0] === 'old' ? item : operation.operands[0]
  const b = operation.operands[1] === 'old' ? item : operation.operands[1]

  switch(operation.operation) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return a / b
  }
}

const transferItem = (monkies, sourceMonkey, itemIdx, itemValue, destMonkeyIdx) => {
  const destMonkey = monkies[destMonkeyIdx]
  sourceMonkey.items[itemIdx] = null
  destMonkey.items.push(itemValue)
  // console.log('transfer', {source: sourceMonkey.num, dest: destMonkeyIdx, itemValue})
  // console.log(monkies)

  return monkies
}

const runItem = (worryDivisor, monkies, monkey, itemIdx) => {
  monkey.inspections++
  const item = monkey.items[itemIdx]
  const newItem = runOperation(item, monkey.operation) / BigInt(worryDivisor)
  // console.log({n: monkey.num, item, newItem, op: monkey.operation, worryDivisor})

  /*
  if(Number(newItem) === 2080) {
    console.log({newItem, test: monkey.test, result: newItem % BigInt(monkey.test)})
  }
  */

  const destMonkeyIdx = newItem % BigInt(monkey.test) === 0n
    ? monkey.trueMonkey
    : monkey.falseMonkey

  /*
  if(destMonkeyIdx === 2) {
    console.log('  ', {source: monkey.num, dest: destMonkeyIdx, item, newItem, test: monkey.test})
  }
  */

  return transferItem(monkies, monkey, itemIdx, newItem, destMonkeyIdx)
}

const runMonkey = curry((worryDivisor, monkies, monkey) => {
  // console.log(`  #${monkey.num} -- ${monkey.inspections} -- ${monkey.items.length}`)
  /*
  if(monkey.num === 2) {
    console.log('  ', monkey.items)
  }
  */
  for(let i = 0; i < monkey.items.length; i++) {
    monkies = runItem(worryDivisor, monkies, monkey, i)
  }

  return monkies
})

const removeEmptyItems = monkies => {
  return monkies.map(monkey => ({
    ...monkey,
    items: monkey.items.filter(x => x !== null),
  }))
}

const runRound = (worryDivisor, monkies) => {
  return removeEmptyItems(monkies.reduce(runMonkey(worryDivisor), monkies))
}

const reportMonkies = monkies => {
  for(const monkey of monkies) {
    console.log(`#${monkey.num} -- ${monkey.inspections} -- ${monkey.items.length}`)
  }
}

const runRounds = curry((worryDivisor, numRounds, monkies) => {
  // console.log('START')
  // reportMonkies(monkies)
  for(let i = 0; i < numRounds; i++) {
    console.log(`RUN ROUND #${i + 1}`)
    monkies = runRound(worryDivisor, monkies)
    // reportMonkies(monkies)
  }

  return monkies
})

const compareNum = (a, b) => b - a

export const run = curry((worryDivisor, numRounds) => compose(
  ([a, b]) => a * b,
  headN(2),
  xs => xs.sort(compareNum),
  map(get('inspections', 0)),
  // report,
  runRounds(worryDivisor, numRounds),
))

export const readInput = filename => then(compose(
  indexByMonkey,
  map(monkeyLinesToObj),
  map(map(trim)),
  map(split('\n')),
  split('\n\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
