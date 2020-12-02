export class ServerError extends Error {
  constructor () {
    super('Something went wrong in server side')
    this.name = 'ServerError'
  }
}
