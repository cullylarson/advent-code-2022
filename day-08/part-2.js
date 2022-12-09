import {compose, report} from '@cullylarson/f'
import {then} from '@cullylarson/p'
import {readInput, getCol} from './lib.js'
import {rel, max} from '../lib.js'

// assumes the tree comes just before the list
const scoreSubList = (list, tree) => {
  let count = 0

  for(let i = 0; i < list.length; i++) {
    count++
    if(list[i] >= tree) {
      return count
    }
  }

  return count
}

const scoreList = (list, tree, treeIdx) => {
  // left or up
  // reverse because scoreSubList assumes the tree comes *before* the list
  return scoreSubList(list.slice(0, treeIdx).reverse(), tree)
  // right or down
    * scoreSubList(list.slice(treeIdx + 1), tree)
}

const scoreRow = (board, x, y) => {
  return scoreList(board[y], board[y][x], x)
}

const scoreCol = (board, x, y) => {
  return scoreList(getCol(board, x), board[y][x], y)
}

const scoreTree = (board, x, y) => {
  return scoreRow(board, x, y) * scoreCol(board, x, y)
}

const scoreTrees = board => {
  const scores = []

  for(let y = 0; y < board.length; y++) {
    for(let x = 0; x < board[y].length; x++) {
      scores.push(scoreTree(board, x, y))
    }
  }

  return scores
}

then(compose(
  report,
  max,
  scoreTrees,
), readInput(rel(import.meta.url, 'input.txt')))
