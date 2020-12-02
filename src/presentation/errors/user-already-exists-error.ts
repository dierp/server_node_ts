export class UserAlreadyExistsError extends Error {
  constructor (paramName: string) {
    super(`This user already exists: ${paramName}`)
    this.name = 'UserAlreadyExistsError'
  }
}
