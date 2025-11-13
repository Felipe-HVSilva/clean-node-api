import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hashPassword') })
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should be  call Bcrypt with correct values', async () => {
    const SALT = 12
    const sut = new BcryptAdapter(SALT)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('Should return a hash on succeess', async () => {
    const SALT = 12
    const sut = new BcryptAdapter(SALT)

    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hashPassword')
  })
})
