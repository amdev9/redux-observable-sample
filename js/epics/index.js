import 'rxjs';
import { of } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { delay, mapTo, concatMap, merge, switchMap, take, map, takeUntil } from 'rxjs/operators';


import { START_COUNTDOWN, INCREMENT_ASYNC, INCREMENT, CANCEL_INCREMENT_ASYNC, FETCH_SUCCESS, DECREMENT } from '../actionTypes';

const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

const startCountdownEpic = action$ => action$.pipe(
  ofType(FETCH_SUCCESS), //START_COUNTDOWN
  take(1),  
  switchMap(() => 
    action$.pipe(   
      ofType(FETCH_SUCCESS),
      take(1),  
      map(() => increment()),   
    )
  ),
);


// delay(2000),

  // concatMap(action => of({ type: INCREMENT, payload: action.type }).pipe(merge(of({ type: INCREMENT }))) )
  // delay(1000), // Asynchronously wait 1000ms then continue
  // mapTo(increment())
 
export const rootEpic = combineEpics(
  startCountdownEpic
);
