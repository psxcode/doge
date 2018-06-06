import { expect } from 'chai'
import {
  makeNumbers,
  makeStrings,
  readable,
  transformTest,
  writable
} from '@psxcode/node-streams-test'
import map from './map'

const multiply = (multiplier: number) => (value: number) => value * multiplier
const identity = <T> (x: T) => x

xdescribe('[ map ]', () => {
  transformTest(
    makeStrings(6),
    (data) => readable({})({ encoding: 'utf8' })(data),
    (spy) => writable({})({ decodeStrings: false })(spy),
    () => map({ objectMode: true })(identity),
    (data, spy) => {
      expect(spy.callCount()).eq(Array.from(data).length)
    })

  transformTest(
    makeNumbers(4),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => map({ objectMode: true })(multiply(2)),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).map(multiply(2)))
    })
})