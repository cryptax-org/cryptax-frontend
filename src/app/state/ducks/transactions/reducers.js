import { combineReducers } from 'redux';
import { PostTransactionEnum } from './enums';
import * as types from './types';
import { createReducer } from 'state/utils';

/* State shape
{
  all: array,
  addTransactionStatus: PostTransactionEnum,
}
*/

const allReducer = createReducer([])({
  [types.GET_TRANSACTIONS]: () => [], // See how i can return what exists currently
  [types.GET_TRANSACTIONS_COMPLETED]: (state, action) => action.payload.data,
  [types.GET_TRANSACTIONS_FAILED]: () => [],
  [types.POST_TRANSACTION_COMPLETED]: (state, action) => [...state, action.payload.data],
  [types.DELETE_TRANSACTION_COMPLETED]: (state, action) => state.filter(transaction => transaction.id != action.meta.transactionId),
  [types.LOGOUT]: () => [],
});

const addTransactionStatusReducer = createReducer(PostTransactionEnum.INIT)({
  [types.POST_TRANSACTION]: () => PostTransactionEnum.INIT,
  [types.POST_TRANSACTION_COMPLETED]: () => PostTransactionEnum.SUCCESS,
  [types.POST_TRANSACTION_FAILED]: () => PostTransactionEnum.ERROR,
})

export default combineReducers({
  all: allReducer,
  addTransactionStatus: addTransactionStatusReducer,
});
