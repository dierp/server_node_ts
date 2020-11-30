import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if invalid email is provided', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email')
    expect(isValid).toBe(false)
  }),
  test('Should return true if valid email is provided', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email')
    expect(isValid).toBe(true)
  })
})