import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { Environment } from '@constants';

import { epic, reducer, State } from './ducks';

const makeStore: MakeStore<State> = () => {
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

// eslint-disable-next-line import/prefer-default-export
export const reduxNextAppWrapper = createWrapper<State>(
  makeStore,
  {
    debug: process.env.NODE_ENV === Environment.development,
  },
);
