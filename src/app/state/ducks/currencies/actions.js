import * as types from './types';

export const getCurrencies = (jwt) => ({
  type: types.GET_CURRENCIES,
  meta: {
    async: true,
    blocking: true,
    url: `/currencies`,
    method: 'GET',
    jwt,
  }
});
