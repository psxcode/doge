import { expect } from 'chai'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'
import filter from './filter'
import last from './last'
import map from './map'

const isEqual = (value: number) => (arg: number) => value === arg
const multiply = (multiplier: number) => (value: number) => value * multiplier

xdescribe('[ last ]', () => {
  transformTest(
    makeNumbers(4),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => [
      filter({ objectMode: true })(isEqual(10)),
      last({ objectMode: true })(),
      map({ objectMode: true })(multiply(2))
    ],
    (data, spy) => {
      expect(spy.data()).deep.eq([20])
    })
})