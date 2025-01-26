class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Add a "message" property to instance of the Error class
    this.code = errorCode; // Add a "code" property to instance of the Error class
  }
}

module.exports = HttpError;
