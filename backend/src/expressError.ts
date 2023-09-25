// creates custom errors to provide specific codes instead of the generic 500 error

class ExpressError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

class NotFoundError extends Error {
  constructor(errors: string | string[]) {
    if (typeof errors === "string") {
      super(errors);
    } else {
      super(errors.join("\n"));
    }
    this.name = "Not Found";
  }
}

class UnauthorizedError extends Error {
  constructor(errors: string | string[]) {
    if (typeof errors === "string") {
      super(errors);
    } else {
      super(errors.join("\n"));
    }
    this.name = "Unauthorized";
  }
}

class BadRequestError extends Error {
  constructor(errors: string | string[]) {
    if (typeof errors === "string") {
      super(errors);
    } else {
      super(errors.join("\n"));
    }
    this.name = "BadRequestError";
  }
}

class ForbiddenError extends Error {
  constructor(errors: string | string[]) {
    if (typeof errors === "string") {
      super(errors);
    } else {
      super(errors.join("\n"));
    }
    this.name = "Forbidden";
  }
}

// class ExpressError extends Error {
//   status: number;
//   constructor(message: string, status: number) {
//     super();
//     this.message = message;
//     this.status = status;
//   }
// }

// /** 404 NOT FOUND error. */

// class NotFoundError extends ExpressError {
//   constructor(message = "Not Found", status = 404) {
//     super(message, status);
//   }
// }

// /** 401 UNAUTHORIZED error. */

// class UnauthorizedError extends ExpressError {
//   constructor(message = "Unauthorized", status = 401) {
//     super(message, status);
//   }
// }

// /** 400 BAD REQUEST error. */

// class BadRequestError extends ExpressError {
//   constructor(message = "Bad Request", status = 400) {
//     super(message, status);
//   }
// }

// /** 403 BAD REQUEST error. */

// class ForbiddenError extends ExpressError {
//   constructor(message = "Bad Request", status = 403) {
//     super(message, status);
//   }
// }

export {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
};
