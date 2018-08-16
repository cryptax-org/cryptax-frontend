import * as types from './types';

export const addTransaction = (userId, transaction, jwt) => ({
  type: types.POST_TRANSACTION,
  meta: {
    async: true,
    blocking: true,
    url: `/users/${userId}/transactions`,
    method: 'POST',
    body: {
      source: 'manual',
      date: transaction.date.format('YYYY-MM-DDTHH:mm:ssZ'),
      type: 'buy',
      price: transaction.price,
      amount: transaction.amount,
      currency1: transaction.currency1,
      currency2: transaction.currency2,
    },
    jwt
  }
});

export const resetAddTransactionStatus = () => ({
  type: types.POST_TRANSACTION_RESET_STATUS,
});

export const getTransactions = (userId, jwt) => ({
  type: types.GET_TRANSACTIONS,
  meta: {
    async: true,
    blocking: true,
    url: `/users/${userId}/transactions`,
    method: 'GET',
    jwt
  }
});
