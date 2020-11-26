import { HttpResponse } from '../../protocols/http'

export const badRequest = (errors: Error[]): HttpResponse => ({
    body: errors,
    statusCode: 400 
})