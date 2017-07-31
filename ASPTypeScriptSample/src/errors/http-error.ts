class HttpError implements Error {
    name: string;

    constructor(public code: number, public message: string) {
        this.name = 'HttpError';
        this.message = this.code + ' ' + this.message;
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

class NotFoundError extends HttpError {
    constructor() {
        super(404, 'Not Found');
        this.name = 'NotFoundError';
    }
}

class MethodNotAllowedError extends HttpError {
    constructor() {
        super(405, 'Method Not Allowed');
        this.name = 'MethodNotAllowedError';
    }
}

class BadRequestError extends HttpError {
    constructor() {
        super(400, 'Bad Request');
        this.name = 'BadRequestError';
    }
}