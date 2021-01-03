/* eslint-disable max-classes-per-file */
import { Environment } from '@constants';

export class FEError extends Error {
  constructor(code: number, message?: string, debugMessage?: string) {
    super(`Error code: ${code}. ${message}. ${process.env.NODE_ENV === Environment.development ? debugMessage : ''}`);
  }
}

export enum ErrorType {
  OBJECT_NOT_INITIALIZED = 1,
  OBJECT_NOT_FOUND = 2,
  ARRAY_IS_EMPTY = 3,
  SHOULD_NOT_REACH_CODE = 4,
  OBJECT_ALREADY_EXISTS = 5,
}

export class ErrorFactory {
  static createError = (type: ErrorType, message?: string, debugMessage?: string): FEError => {
    const error = new FEError(type, message, debugMessage);

    return error;
  };

  static throwError = (type: ErrorType, message?: string, debugMessage?: string) => {
    const error = new FEError(type, message, debugMessage);

    throw error;
  };
}
