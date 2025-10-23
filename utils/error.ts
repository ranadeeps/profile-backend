export class apiError extends Error {
  code: string | number;
  constructor(code: number | string, message: string) {
    super(message);
    this.code = code;
  }
}

export class authenticationError extends apiError {
  constructor(message: string) {
    super(401, message);
  }
}
