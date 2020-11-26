import { SignUpController } from './signupController'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../../protocols/http'

describe('SingUpController', () => {
  test('Should return 400 if validaton don\'t pass', () => {
    const sut = new SignUpController()
    const httpRequest: HttpRequest = {
        body: {
            email: 'my_email@email.com',
            password: 'my_password',
            passwordConfirmation: 'my_password',
        }
    }

    const httpResponse: HttpResponse = sut.handle(httpRequest)
    expect (httpResponse.statusCode).toBe(400)
    expect (httpResponse.body).toEqual( [ new MissingParamError('name') ] )
  })
})