import {getDistance} from '../part-1.js'

test('left distance is 1', () => {
  expect(getDistance([3, 4], [3, 5])).toBe(1)
  expect(getDistance([3, 5], [3, 4])).toBe(1)
})

test('right distance is 1', () => {
  expect(getDistance([3, 4], [3, 3])).toBe(1)
  expect(getDistance([3, 3], [3, 4])).toBe(1)
})

test('up distance is 1', () => {
  expect(getDistance([3, 4], [2, 4])).toBe(1)
  expect(getDistance([2, 4], [3, 4])).toBe(1)
})

test('down distance is 1', () => {
  expect(getDistance([3, 4], [4, 4])).toBe(1)
  expect(getDistance([4, 4], [3, 4])).toBe(1)
})

test('up, left distance is 1.41', () => {
  expect(getDistance([3, 4], [2, 3])).toBe(1.4142135623730951)
})

test('up, right distance is 1.41', () => {
  expect(getDistance([3, 4], [2, 5])).toBe(1.4142135623730951)
})

test('down, right distance is 1.41', () => {
  expect(getDistance([3, 4], [4, 5])).toBe(1.4142135623730951)
})

test('down, left distance is 1.41', () => {
  expect(getDistance([3, 4], [4, 3])).toBe(1.4142135623730951)
})

test('two down, one left distance is 2.23', () => {
  expect(getDistance([3, 4], [5, 3])).toBe(2.23606797749979)
})
