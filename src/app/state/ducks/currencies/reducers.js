import { combineReducers } from 'redux';
import * as types from './types';
import { createReducer } from 'state/utils';

/* State shape
{
  all: array,
  timestamp: date,
}
*/

const allReducer = createReducer([])({
  [types.GET_CURRENCIES_COMPLETED]: (state, action) => action.payload.data.map(currency => {
    const { code, name, symbol, type } = currency;
    return {
      title: name,
      description: code,
      value: code, //Can I change it?
      symbol,
      type,
    }
  }),
});

const timestampReducer = createReducer(new Date())({
  [types.GET_CURRENCIES_COMPLETED]: () => new Date(),
})

export default combineReducers({
  all: allReducer,
  timestamp: timestampReducer,
});
