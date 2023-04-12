class AppError extends Error {
  public status: string;
  public isOperational: boolean;
  public statusCode?: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = `${status}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;