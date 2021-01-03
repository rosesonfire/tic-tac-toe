import { Epic, ofType } from 'redux-observable';
import { mapTo } from 'rxjs/operators';

const epic: Epic = $action => $action.pipe(
  ofType('hello_action'),
  mapTo({
    type: 'SomeAction',
  }),
);

export default epic;
