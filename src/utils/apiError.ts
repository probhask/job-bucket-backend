export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  errorMessage?: string; // Renamed from 'message' to 'errorMessage'
  data?: unknown;

  constructor(
    statusCode: number,
    errorMessage: string,
    data?: unknown,
    isOperational = true,
    stack = '',
  ) {
    super(errorMessage); // Still set the message in the parent Error class
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorMessage = errorMessage; // Use 'errorMessage' for the custom message
    this.data = data;

    // attach the stack trace only if it exists
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;
