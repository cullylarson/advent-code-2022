import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, getCol} from './lib.js'
import {rel, max} from '../lib.js'

const isVisibleSubList = (list, tree) => {
  // is visible if no trees taller
  return max(list) < tree
}

const isVisibleList = (list, tree, treeIdx) => {
  return isVisibleSubList(list.slice(0, treeIdx), tree)
    || isVisibleSubList(list.slice(treeIdx + 1), tree)
}

const isVisibleRow = (board, x, y) => {
  return isVisibleList(board[y], board[y][x], x)
}

const isVisibleCol = (board, x, y) => {
  return isVisibleList(getCol(board, x), board[y][x], y)
}

const isVisible = (board, x, y) => {
  // edge
  if(x === 0 || y === 0) return true
  // edge
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
