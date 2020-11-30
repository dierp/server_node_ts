import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Should return false if invalid email is provided', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email')
    expect(isValid).toBe(false)
  }),
  test('Should return true if valid email is provided', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email')
    expect(isValid).toBe(true)
  })
})