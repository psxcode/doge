import { expect } from 'chai'
import reduce from './reduce'
import { makeNumbers, readable, transformTest, writable } from '@psxcode/node-streams-test'

const addAll = (acc = 0, value: number) => acc + value

xdescribe('[ reduce ]', () => {
  transformTest<number>(makeNumbers(8),
    (data) => readable({})({ objectMode: true })(data),
    (spy) => writable({})({ objectMode: true })(spy),
    () => reduce(addAll),
    (data, spy) => {
      expect(spy.data()).deep.eq([Array.from(data).reduce(addAll)])
    })
})
