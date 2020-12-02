import { ServerError } from '../errors'
import { HttpResponse } from '../protocols/http'

export const badRequest = (errors: Error[]): HttpResponse => ({
  body: errors,
  statusCode: 400
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: [new ServerError()]
})

export const ok = <T>(data: T): HttpResponse => ({
  statusCode: 200,
  body: data
})
