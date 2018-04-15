import { expect } from 'chai'
import { pipe } from '@doge/compose'
import map from './map'
import slice from './slice'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ slice ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(1, 3)(data)]
    expect(result).deep.eq([2, 3, 4])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), slice(2, 2))(data)]
    expect(result).deep.eq([6, 8])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...slice(2, 1)(data)]
    expect(result).deep.eq([2])
  })
})
