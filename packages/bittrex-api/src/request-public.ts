import { Request, RequestInit, Response } from 'node-fetch'
import { compose } from '@doge/compose'
import { fetchGet } from '@doge/fetch'

export const request = compose(fetchGet)
