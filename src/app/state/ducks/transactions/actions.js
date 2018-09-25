import * as types from './types';

export const addTransaction = (userId, transaction) => ({
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
      quantity: transaction.quantity,
      currency1: transaction.currency1,
      currency2: transaction.currency2,
    },
  }
});

export const addTransactionsFile = (userId, transactionsFile, source) => {
  const form = new FormData();
  form.append('file', transactionsFile)

  return ({
    type: types.POST_TRANSACTIONS_FILE,
    meta: {
      async: true,
      blocking: true,
      isForm: true,
      url: `/users/${userId}/transactions/upload?source=${source}`,
      method: 'POST',
      body: form,
    }
  });
};

export const resetAddTransactionStatus = () => ({
  type: types.POST_TRANSACTION_RESET_STATUS,
});

export const getTransactions = (userId) => ({
  type: types.GET_TRANSACTIONS,
  meta: {
    async: true,
    blocking: true,
    url: `/users/${userId}/transactions`,
    method: 'GET',
  }
});
