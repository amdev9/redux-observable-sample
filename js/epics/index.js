import 'rxjs';
import { of } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { delay, mapTo, concatMap, merge } from 'rxjs/operators';


import { START_COUNTDOWN, INCREMENT_ASYNC, INCREMENT, CANCEL_INCREMENT_ASYNC } from '../actionTypes';

// const startCountdownEpic = (action$) => {
//   /*
//    * This action does not exist in the corresponding redux saga example: it's used to isolate
//    * better a single countdown worflow.
//    */
//   return action$.ofType(START_COUNTDOWN).switchMap(q => {

//     const start = 4;

//     /*
//      * A countdown generates a 5,4,3,2,1,0,-1 series of events,
//      * where all are separated by 1 second but the last one (-1), that is only
//      * 10 milliseconds away from 0.
//      * This way, when the counter hit 0 the "INCREMENT_ASYNC" is dispatched,
//      * so the counter becomes 0 again and, when it dispatches -1
//      * (10 milliseconds later), the actual increment is dispatched at last.
//      */
//     return Observable
//       .timer(0, 1000)
//       .mergeMap(tick => {
//         //when we reach 5 we schedule 5 and 6.
//         if (tick === start) {
//           return Observable.timer(0, 10).mergeMap(y => Observable.of(start, start + 1))
//         }
//         else {
//           return Observable.of(tick)
//         }
//       })
//       .map(i => start - i)
//       .take(start + 2)
//       // supports cancellation
//       .takeUntil(action$.ofType(CANCEL_INCREMENT_ASYNC))
//       .map(seconds => {
//         // actual increment action
//         if (seconds === -1) {
//           return { type: INCREMENT }
//         }
//         // increment async action
//         else {
//           return { type: INCREMENT_ASYNC, value: seconds }
//         }
//       });
//   });
// };


const increment = () => ({ type: INCREMENT });

const startCountdownEpic = action$ => action$.pipe(
  ofType(START_COUNTDOWN),
  concatMap(action => of({ type: INCREMENT, payload: action.type }).pipe(merge(of({ type: INCREMENT }))) )
    
 
  
  // delay(1000), // Asynchronously wait 1000ms then continue
  // mapTo(increment())
);



export const rootEpic = combineEpics(
  startCountdownEpic
);
