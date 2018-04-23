import { makeDataSpy, SpyFn } from './spy'
import ReadableStream = NodeJS.ReadableStream
import wait from './wait'
import waitForEvents from './wait-for-events'

const readableTest = <T> (
  data: Iterable<T>,
  makeReadable: (data: Iterable<T>) => ReadableStream,
  makeConsumer: (stream: ReadableStream, sink: (data: T) => void) => () => void,
  expectFn?: (data: Iterable<T>, spy: SpyFn<T>) => void) =>
  it('should work', async () => {
    const spy = makeDataSpy<T>()
    const stream = makeReadable(data)
    const consumer = makeConsumer(stream, spy)
    await wait(100)
    consumer()
    await waitForEvents('end', 'error')(stream)
    await wait(20)
    expectFn && expectFn(data, spy)
  })

export default readableTest
