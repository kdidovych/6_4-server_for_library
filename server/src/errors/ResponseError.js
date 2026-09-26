/**
 * Just a note to remind params.
 * class Error
 * message: String - The string description passed into the constructor.
 * name: String - The type of error. Defaults to "Error". (Subclasses like TypeError or SyntaxError overwrite this).
 * cause: Any - The value provided via the options.
 * stack: String - A trace of which functions were called, in what order, from which line, and from which file the error was thrown.
 * fileName: String - The file path where the error originated.
 * lineNumber: Number - The line number where the error originated.
 * columnNumber: Number - The exact character column where the error originated.
 */
class ResponseError extends Error {
    shouldBeLogged;
    code;

    constructor(message = "", options = {}) {
        super(message, options);
        if (options.shouldBeLogged) {
            this.shouldBeLogged = true;
            Error.captureStackTrace(this, this.constructor);
        }
        this.code = options.code || 500;
    }
}

module.exports = ResponseError;
