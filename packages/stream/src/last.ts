import { Transform, TransformOptions } from 'stream'

export const lastRaw = (opts: TransformOptions) => () => {
  let value: any
  return new Transform({
    ...opts,
    transform (chunk, encoding, callback) {
      value = chunk
      callback()
    },
    flush (callback) {
      callback(null, value)
    }
  })
}

export const last = lastRaw({ objectMode: true })