import { expect } from 'chai'
import { dataConsumer, readable, readableTest } from '@psxcode/node-streams-test'
import combine from './combine'

xdescribe('[ combine ]', () => {
  readableTest([0, 1, 2, 3, 4],
    (data) => {
      const s1 = readable({ delayMs: 12 })({ objectMode: true })(data)
      const s2 = readable({ delayMs: 10 })({ objectMode: true })(data)
      const s3 = readable({ delayMs: 8 })({ objectMode: true })(data)
      return combine(s1, s2, s3)
    },
    dataConsumer,
    (data, spy) => {
      expect(spy.data().length).eq(15)
    })
})
