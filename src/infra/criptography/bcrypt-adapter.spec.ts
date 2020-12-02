import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

export interface SutTypes {
  sut: BcryptAdapter
}
const salt = 12
const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter(salt)
  return {
    sut
  }
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hashed_value'))
  }
}))

describe('BcryptAdapter', () => {
  test('Ensure integration between bcryptAdatper and Encrypter', async () => {
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  }),

  test('Should return hashed string on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  }),

  test('Should throw error if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    await expect(sut.encrypt('any_value')).rejects.toThrow()
  })
})
