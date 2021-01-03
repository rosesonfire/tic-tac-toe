import {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';

type RequiredPropNames<Props> = {
  [K in keyof Props]: undefined extends Props[K] ? undefined : K;
}[keyof Props];

type OptionalPropNames<Props> = Exclude<keyof Props, RequiredPropNames<Props>>;

export type DefaultProps<Props> = Required<Pick<Props, OptionalPropNames<Props>>>;

export type Children = Exclude<ReactNode, undefined>;

export class ChangeHandler {
  static getClickHandler = (
    cb: () => void,
  ): MouseEventHandler => (event) => {
    event.stopPropagation();

    cb();
  };

  static getKeyDownHandler = (
    cb: (key: string) => void,
  ): KeyboardEventHandler<HTMLElement> => (
    event: KeyboardEvent<HTMLElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    cb(event.key);
  };

  static getKeyPressHandler = (
    cb: (value: string) => void,
  ): ChangeEventHandler<HTMLInputElement> => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    cb(event.target.value);
  };
}
