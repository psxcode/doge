import { expect } from 'chai'
import { iterate } from '@doge/iterable'
import { makeWritable } from './helpers/writable'
import { makeReadable } from './helpers/readable'
import { makeSmallRange, xmakeTransformTest } from './helpers/helpers'
import { take } from './take'

describe('[ take ]', function () {
  xmakeTransformTest<number>(makeSmallRange(4),
    (data) => makeReadable({})({ objectMode: true })(iterate(data)),
    (spy) => makeWritable({})({ objectMode: true })(spy),
    () => take(5),
    (data, spy) => {
      expect(spy.data()).deep.eq(Array.from(data).slice(0, 5))
    })
})
