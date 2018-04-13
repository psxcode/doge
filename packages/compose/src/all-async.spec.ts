import { expect } from 'chai'
import allAsync from './all-async'
import pipe from './pipe'

const add = (arg0: number) => (arg1: number): number => arg0 + arg1
const addAsync = (arg0: number) => (arg1: number): Promise<number> => Promise.resolve(arg0 + arg1)
const multAsync = (arg0: number) => (arg1: number): Promise<number> => Promise.resolve(arg0 * arg1)
const constant = <T> (arg: T) => () => arg
const toString = (arg: any): string => `${arg}`
const toNumber = (arg: string): number => Number(arg)

describe('[ allAsync ]', function () {
  it('should return the identity function', async function () {
    const piped = allAsync()
    expect(await piped(1)).deep.eq([1])
  })

  it('should work with a constant function', async function () {
    const piped = allAsync(constant(10))
    expect(await piped(4)).deep.eq([10])
  })

  it('should work with one function', async function () {
    const piped = allAsync(add(2))
    expect(await piped(2)).deep.eq([4])
  })

  it('should work with multiple functions', async function () {
    const piped = allAsync(constant(10), addAsync(2), toString)
    expect(await piped(4)).deep.eq([10, 6, '4'])
  })

  it('should work with functions returning different type', async function () {
    const piped = allAsync(toNumber, pipe(toNumber, multAsync(10)))
    expect(await piped('10')).deep.eq([10, 100])
  })
})