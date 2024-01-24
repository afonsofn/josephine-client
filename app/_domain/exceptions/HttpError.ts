export type HttpStatusCode = 200 | 201 | 400 | 404 | 409 | 500

export class HttpError extends Error {
  statusCode: HttpStatusCode
  errorCodes: string[]

  constructor(data: {
    statusCode: HttpStatusCode
    errorCodes: string[]
    message: string
  }) {
    super(data.message)
    this.statusCode = data.statusCode
    this.errorCodes = data.errorCodes
  }
}
