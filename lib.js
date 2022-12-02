import fs from 'fs'
import {promisify} from 'util'

export const readFile = promisify(fs.readFile)

export const add = (a, b) => a + b

export const sum = xs => xs.reduce(add, 0)
