// creates custom errors to provide specific codes instead of the generic 500 error

class ExpressError extends Error {
    status: number;

    constructor (message: string, status: number) {
        super(message),
        this.status = status
    }   
}

class NotFoundError extends Error {
    constructor(errors: string | string[]) {
        if (typeof errors === 'string') {
            super(errors);
        } else {
            super(errors.join('\n'));
        }
        this.name = 'Not Found';
    }
}

class UnauthorizedError extends Error {
    constructor(errors: string | string[]) {
      if (typeof errors === 'string') {
        super(errors);
      } else {
        super(errors.join('\n'));
      }
      this.name = 'Unauthorized';
    }
}

class BadRequestError extends Error {
    constructor(errors: string | string[]) {
      if (typeof errors === 'string') {
        super(errors);
      } else {
        super(errors.join('\n'));
      }
      this.name = 'BadRequestError';
    }
}

class ForbiddenError extends Error {
    constructor(errors: string | string[]) {
      if (typeof errors === 'string') {
        super(errors);
      } else {
        super(errors.join('\n'));
      }
      this.name = 'Forbidden';
    }
}

export {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError
}