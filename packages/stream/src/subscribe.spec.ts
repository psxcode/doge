import { expect } from 'chai'
import * as sinon from 'sinon'
import { iterate } from '@doge/iterable'
import { makeReadable } from './helpers/readable'
import { subscribe } from './subscribe'
import { makeDataSpy, makeSmallRange, wait, waitForEndOrError } from './helpers/helpers'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}

describe('[ subscribe ]', function () {
  describe('[ subscribe ]', function () {
    xit('should work with single stream', async function () {
      const d1 = makeSmallRange(2)
      const s1 = makeReadable({})({ objectMode: true })(iterate(d1))
      const spy = makeDataSpy()

      await wait(100)
      subscribe({ next: spy })(s1)

      await waitForEndOrError(s1, 10)
      expect(spy.data()).deep.eq(Array.from(d1))
    })

    xit('should work with multiple streams', async function () {
      const d1 = [0, 1, 2, 3, 4]
      const d2 = gen(5)
      const s1 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(d1))
      const s2 = makeReadable({ delayMs: 15 })({ objectMode: true })(iterate(d2))
      const spy = makeDataSpy()

      await wait(100)
      subscribe({ next: spy })(s1, s2)

      await waitForEndOrError(s2, 10)
      expect(spy.data().length).eq(10)
    })

    xit('should work with complete', async function () {
      const d1 = [0, 1, 2, 3, 4]
      const d2 = gen(5)
      const s1 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(d1))
      const s2 = makeReadable({ delayMs: 15 })({ objectMode: true })(iterate(d2))
      const spy = makeDataSpy()
      const completeSpy = sinon.spy()

      await wait(100)
      subscribe({ next: spy, complete: completeSpy })(s1, s2)

      await waitForEndOrError(s2, 10)
      expect(spy.data().length).eq(10)
      sinon.assert.calledOnce(completeSpy)
    })

    xit('should work with unsubscribe', async function () {
      const d1 = makeSmallRange(2)
      const s1 = makeReadable({ delayMs: 10 })({ objectMode: true })(iterate(d1))
      const spy = makeDataSpy()
      const completeSpy = sinon.spy()

      await wait(100)
      const unsub = subscribe({ next: spy, complete: completeSpy })(s1)

      await wait(30)
      unsub()

      await waitForEndOrError(s1, 10)
      expect(spy.data().length).not.eq(Array.from(d1).length)
      sinon.assert.notCalled(completeSpy)
    })
  })
})
