export class CustomError extends Error {
  isError: boolean;
  errors: string;

  constructor({ isError, message, errors }: { isError: boolean; message: string; errors: string }) {
    super(message);
    this.name = "CustomError";
    this.isError = isError;
    this.errors = errors;
  }
}
