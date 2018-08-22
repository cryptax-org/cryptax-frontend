import {
  addTransaction,
  resetAddTransactionStatus,
  getTransactions,
} from './actions';
import { withAuthentication } from 'state/ducks/session'

export default {
  addTransaction: withAuthentication(addTransaction),
  resetAddTransactionStatus,
  getTransactions: withAuthentication(getTransactions),
};
