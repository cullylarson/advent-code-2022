import {compose, report, map, curry} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel} from '../lib.js'

const DISK_SIZE = 70000000
const SPACE_NEEDED = 30000000

const min = xs => Math.min(...xs)

const canFree = (freeSpace, size) => freeSpace + size >= SPACE_NEEDED

const findSmallestToFree = curry((freeSpace, currentDir) => {
  const dirsSmallestToFree = compose(
    min,
    map(findSmallestToFree(freeSpace)),
  )(currentDir.dirs) || Math.Infinity

  return canFree(freeSpace, currentDir.size)
    ? min([currentDir.size, dirsSmallestToFree])
    : dirsSmallestToFree
})

then(compose(
  report,
  rootDir => {
    const freeSpace = DISK_SIZE - rootDir.size
    return findSmallestToFree(freeSpace, rootDir)
  },
), readInput(rel(import.meta.url, 'input.txt')))
