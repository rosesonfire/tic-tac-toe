/* eslint-disable max-classes-per-file */
import 'reflect-metadata';
import { ValidationError } from 'apollo-server-express';

import { Offset } from '@api-types';

export class PositionValueError extends ValidationError {
  constructor(positionName: string, value: Number) {
    super(`'${positionName}' must be one of (0, 1, 2), but received: ${value}`);
  }
}

export class GameNotInitializedError extends ValidationError {
  constructor() {
    super('Game is not initialized yet!');
  }
}

export class NonEmptyCellError extends ValidationError {
  constructor(row: Offset, col: Offset) {
    super(`Cell is not empty! row: ${row}, col: ${col}`);
  }
}
