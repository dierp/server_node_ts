import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

describe('BcryptAdapter', () => {
  test('Ensure integration between bcryptAdatper and Encrypter', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})