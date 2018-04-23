import { expect } from 'chai'
import startWith from './start-with'
import { dataConsumer, readable, readableTest } from '@psxcode/node-streams-test'

xdescribe('[ concat ]', () => {
  readableTest([5, 6, 7, 8, 9],
    (data) => {
      const s1 = readable({ delayMs: 50 })({ objectMode: true })(data)
      return startWith(0, 1, 2, 3, 4)(s1)
    },
    dataConsumer,
    (data, spy) => {
      expect(spy.data()).deep.eq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})
