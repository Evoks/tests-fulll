/**
 * Custom error class for handling errors in the application
 */
export default class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}
