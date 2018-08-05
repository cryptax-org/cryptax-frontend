import * as types from './types';

export const getTransactions = (userId, jwt) => ({
  type: types.LOGIN,
  meta: {
    async: true,
    blocking: true,
    url: `/${userId}/transactions`,
    method: 'POST',
    jwt
  }
});
