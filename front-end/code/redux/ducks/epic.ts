import { combineEpics, Epic } from 'redux-observable';
import { catchError } from 'rxjs/operators';

import { epic as gameEpic } from './game';

const epic: Epic = (
  action$, store$, dependencies,
) => combineEpics(
  gameEpic,
)(action$, store$, dependencies).pipe(
  catchError((error, source) => {
    // eslint-disable-next-line no-console
    console.error(error);

    return source;
  }),
);

export default epic;
