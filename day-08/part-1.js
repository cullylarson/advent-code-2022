import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput} from './lib.js'
import {rel, max} from '../lib.js'

const isVisibleList = (list, tree, treeIdx) => {
  const treesBeforeThis = list.slice(0, treeIdx)
  const treesAfterThis = list.slice(treeIdx + 1)
  const talltestTreeBeforeThis = max(treesBeforeThis)
  const talltestTreeAfterThis = max(treesAfterThis)

  // visible if there aren't any trees before this one that are taller or after
  // this one that are taller
  return talltestTreeBeforeThis < tree
    || talltestTreeAfterThis < tree
}

const isVisibleRow = (board, x, y) => {
  return isVisibleList(board[y], board[y][x], x)
}

const getCol = (board, x) => {
  const row = []

  for(let y = 0; y < board.length; y++) {
    row.push(board[y][x])
  }

  return row
}

const isVisibleCol = (board, x, y) => {
  return isVisibleList(getCol(board, x), board[y][x], y)
}

const isVisible = (board, x, y) => {
  if(x === 0 || y === 0) return true
  if(x === board[y].length - 1 || y === board.length - 1) return true

  return isVisibleRow(board, x, y) || isVisibleCol(board, x, y)
}

const numVisible = board => {
  let num = 0

  for(let y = 0; y < board.length; y++) {
    for(let x = 0; x < board[y].length; x++) {
      if(isVisible(board, x, y)) {
        num++
      }
    }
  }

  return num
}

then(compose(
  report,
  numVisible,
), readInput(rel(import.meta.url, 'input.txt')))
