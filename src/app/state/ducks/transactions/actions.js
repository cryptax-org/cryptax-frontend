import * as types from './types';

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
