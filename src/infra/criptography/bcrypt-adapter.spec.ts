import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

export interface SutTypes {
    sut: BcryptAdapter
}

const makeSut = (): SutTypes => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    return {
        sut
    }
}

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hashed_value'))
    }
}))

describe('BcryptAdapter', () => {
  test('Ensure integration between bcryptAdatper and Encrypter', async () => {
    const salt = 12
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  }),

  test('Should return hashed string on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

})