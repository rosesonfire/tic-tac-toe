/* eslint-disable max-classes-per-file */
import 'reflect-metadata';
import { ValidationError } from 'apollo-server-express';

// eslint-disable-next-line import/prefer-default-export
export class PositionValueError extends ValidationError {
  constructor(positionName: string, value: Number) {
    super(`'${positionName}' must be one of (0, 1, 2), but received: ${value}`);
  }
}
