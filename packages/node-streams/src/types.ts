import EventEmitter = NodeJS.EventEmitter

export type WaitFn = (cb: () => void) => () => void
export type WaitPromiseFn = (ms: number) => Promise<any>
export type UnsubFn = (() => void) | undefined

export interface IEEValue {
  value: any
  index: number
  ee: EventEmitter
}

export interface IObserver {
  next: (chunk: any) => void
  error?: (err: Error) => void,
  complete?: () => void
}

export interface IObserverEx {
  next: (chunk: IEEValue) => void
  error?: (err: IEEValue) => void,
  complete?: () => void
}
