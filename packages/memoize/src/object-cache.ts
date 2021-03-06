import { IMemoizeCache } from './types'

class ObjectCache<V> implements IMemoizeCache<string, V> {
  cache: { [k: string]: V }

  constructor (cache: { [k: string]: V } = Object.create(null)) {
    this.cache = cache
  }

  get (key: string): V | undefined {
    return this.cache[key]
  }

  set (key: string, value: V): this {
    this.cache[key] = value
    return this
  }

  has (key: string): boolean {
    return Reflect.has(this.cache, key)
  }
}

export default ObjectCache
