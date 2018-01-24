import {
  expectSameCallCount,
  makeMediumStrings,
  makeSmallStrings,
  makeWritableProducer,
  makeWritableTest,
  xmakeWritableTest
} from './test-helpers'
import { makeWritable } from './writable'
import { iterate } from '@doge/helpers'

describe('[ writable ]', function () {
  this.slow(1000)

  xmakeWritableTest(makeMediumStrings(),
    (spy) => makeWritable({ delayMs: 10 })({ highWaterMark: 256, decodeStrings: false })(spy),
    (stream, data) => makeWritableProducer<string>({ eager: true })(iterate(data))(stream),
    expectSameCallCount)
})
