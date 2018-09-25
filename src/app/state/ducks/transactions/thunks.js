import {
  addTransaction,
  addTransactionsFile,
  resetAddTransactionStatus,
  getTransactions,
} from './actions';
import { withAuthentication } from 'state/ducks/session'

export default {
  addTransaction: withAuthentication(addTransaction),
  addTransactionsFile: withAuthentication(addTransactionsFile),
  resetAddTransactionStatus,
  getTransactions: withAuthentication(getTransactions),
};
