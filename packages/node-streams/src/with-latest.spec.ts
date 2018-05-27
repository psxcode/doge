import { expect } from 'chai'
import {
  dataConsumer,
  makeNumbers,
  readable,
  readableTest
} from '@psxcode/node-streams-test'
import withLatest from './with-latest'

xdescribe('[ withLatest ]', () => {
  readableTest(makeNumbers(8),
    (data) => {
      const s1 = readable({ delayMs: 5 })({ objectMode: true })(data)
      const s2 = readable({ delayMs: 10 })({ objectMode: true })(data)
      const s3 = readable({ delayMs: 50, eager: true })({ objectMode: true })(data)
      return withLatest({ objectMode: true })(s2, s3)(s1)
    },
    dataConsumer,
    (data, spy) => {
      expect(spy.data().length).eq(Array.from(data).length)
    })
})
