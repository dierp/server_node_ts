import { SignUpController } from './signupController'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'

const makeSut = () => {
    return new SignUpController()
}

describe('SingUpController', () => {
  test('Should return 400 if validaton don\'t pass', () => {
    const sut = makeSut()
    const httpRequest: HttpRequest = {
        body: {
        }
    }

    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(400)
    expect (httpResponse.body).toEqual( [
         new MissingParamError('name'),
         new MissingParamError('email'),
         new MissingParamError('password'),
         new MissingParamError('passwordConfirmation')
        ] )
  })
})