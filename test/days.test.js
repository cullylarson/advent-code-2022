import {spawn} from 'child_process'
import cases from 'jest-in-case'

const parts = {
  'day 1, part 1':
  {
    part: 'day-01/part-1.js',
    answer: '67622',
  },
  'day 1, part 2': {
    part: 'day-01/part-2.js',
    answer: '201491',
  },
  'day 2, part 1':
  {
    part: 'day-02/part-1.js',
    answer: '15572',
  },
  'day 2, part 2': {
    part: 'day-02/part-2.js',
    answer: '16098',
  },
  'day 3, part 1': {
    part: 'day-03/part-1.js',
    answer: '7568',
  },
  'day 3, part 2': {
    part: 'day-03/part-2.js',
    answer: '2780',
  },
  'day 4, part 1': {
    part: 'day-04/part-1.js',
    answer: '550',
  },
  'day 4, part 2': {
    part: 'day-04/part-2.js',
    answer: '931',
  },
  'day 5, part 1': {
    part: 'day-05/part-1.js',
    answer: 'TGWSMRBPN',
  },
  'day 5, part 2': {
    part: 'day-05/part-2.js',
    answer: 'TZLTLWRNF',
  },
}

const run = async (scriptPath) => {
  return new Promise((resolve, reject) => {
    let result = ''

    const prc = spawn('node', [scriptPath], {
      env: process.env,
    })

    prc.stdout.setEncoding('utf8')

    prc.stdout.on('data', data => {
      result += data.toString()
    })

    prc.on('error', err => {
      reject(err)
    })

    prc.on('exit', () => {
      resolve(result)
    })
  })
}

cases('days', async ({part, answer}) => {
  const result = (await run(part)).trim()

  expect(result).toBe(answer)
}, parts)
