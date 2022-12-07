import {compose, trim, split, curry, toInt, get, map} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readFile, sum} from '../lib.js'

const types = {
  DIR: 0,
  FILE: 1,
}

const parseCommand = compose(
  ([, program, input]) => ({program, input}),
  split(' '),
)

const parseOutput = compose(
  ([sizeOrDir, name]) => ({
    name,
    type: sizeOrDir === 'dir' ? types.DIR : types.FILE,
    size: sizeOrDir === 'dir' ? 0 : toInt(0, sizeOrDir),
  }),
  split(' '),
)

const getOutput = lines => {
  const output = []

  let outputLine
  while((outputLine = lines.shift())) {
    if(outputLine[0] === '$') {
      lines.unshift(outputLine)
      return output
    }

    output.push(parseOutput(outputLine))
  }

  return output
}

const groupCommands = lines => {
  const commands = []
  let commandLine

  while((commandLine = lines.shift())) {
    const {program, input} = parseCommand(commandLine)
    const output = getOutput(lines)

    commands.push({program, input, output})
  }

  return commands
}

const dir = (name, parent = null) => ({name, dirs: [], files: [], parent, size: 0})

const getRootDir = currentDir => {
  while(currentDir.parent !== null) {
    currentDir = currentDir.parent
  }

  return currentDir
}

const runCd = (currentDir, command) => {
  if(command.input === '/') {
    return getRootDir(currentDir)
  }
  else if(command.input === '..') {
    return currentDir.parent === null
      ? currentDir
      : currentDir.parent
  }
  else {
    const foundDir = currentDir.dirs.find(x => x.name === command.input)

    if(foundDir) {
      return foundDir
    }
    else {
      const newDir = dir(command.input, currentDir)

      currentDir.dirs.push(newDir)

      return newDir
    }
  }
}

const runLs = (currentDir, command) => {
  currentDir.files = command.output.filter(x => x.type === types.FILE)
  return currentDir
}

const runCommand = (currentDir, command) => {
  switch(command.program) {
    case 'cd': return runCd(currentDir, command)
    case 'ls': return runLs(currentDir, command)
  }
}

const runCommands = commands => {
  const rootDir = dir('/')
  commands.reduce((runCommand), rootDir)
  return rootDir
}

const printDir = curry((indent, currentDir) => {
  console.info(indent, '->', currentDir.name, `(${currentDir.size})`)

  const nextIndent = indent + '  '

  for(const thisDir of currentDir.dirs) {
    printDir(nextIndent, thisDir)
  }
  for(const thisFile of currentDir.files) {
    console.info(nextIndent, '--', thisFile.name, `(${thisFile.size})`)
  }

  return currentDir
})

const setSize = currentDir => {
  const dirsSize = compose(
    sum,
    map(get('size', 0)),
    map(setSize),
  )(currentDir.dirs)

  const filesSize = compose(
    sum,
    map(get('size', 0)),
  )(currentDir.files)

  currentDir.size = dirsSize + filesSize

  return currentDir
}

export const readInput = filename => then(compose(
  setSize,
  runCommands,
  groupCommands,
  split('\n'),
  trim,
), readFile(filename, {encoding: 'utf8'}))
