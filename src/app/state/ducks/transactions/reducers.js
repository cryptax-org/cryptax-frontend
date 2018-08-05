import { combineReducers } from 'redux';
import * as types from './types';
import { createReducer } from 'state/utils';

/* State shape
{
  all: array,
}
*/

const allReducer = createReducer([])({
  [types.GET_TRANSACTIONS]: () => [], // See how i can return what exists currently
  [types.GET_TRANSACTIONS_COMPLETED]: () => action.payload.data,
  [types.GET_TRANSACTIONS_FAILED]: () => [],
  [types.LOGOUT]: () => [],
});

export default combineReducers({
  all: allReducer,
});
