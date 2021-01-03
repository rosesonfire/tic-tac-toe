import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { createWrapper, Context, MakeStore } from 'next-redux-wrapper';
import { Environment } from '@constants';

import { epic, reducer, State } from './ducks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeStore: MakeStore<State> = (_context: Context) => {
  const epicMiddleware = createEpicMiddleware();

  const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
      epicMiddleware,
    ]),

    reducer,
  });

  epicMiddleware.run(epic);

  return store;
};

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/no-unused-vars
export const reduxNextAppWrapper = createWrapper<State>(
  makeStore,
  {
    debug: process.env.NODE_ENV === Environment.development,
  },
);
