// creates custom errors to provide specific codes instead of the generic 500 error

class ExpressError extends Error {
    status: number;

    constructor (message: string, status: number) {
        super(message),
        this.status = status
    }   
}

class NotFoundError extends ExpressError {
    constructor (message = 'Not Found') {
        super(message, 404);
    }
}

class UnauthorizedError extends ExpressError {
    constructor (message = 'Unauthorized') {
        super(message, 401);
    }
}

class BadRequestError extends ExpressError {
    constructor (message = 'Bad Request') {
        super(message, 400);
    }
}

class ForbiddenError extends ExpressError {
    constructor (message = 'Forbidden') {
        super(message, 403);
    }
}

export {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError
}