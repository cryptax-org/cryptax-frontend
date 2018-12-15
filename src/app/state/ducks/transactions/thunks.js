import {
  addTransaction,
  addTransactionsFile,
  deleteTransaction,
  resetAddTransactionStatus,
  getTransactions,
} from './actions';
import { withAuthentication } from 'state/ducks/session'

export default {
  addTransaction: withAuthentication(addTransaction),
  addTransactionsFile: withAuthentication(addTransactionsFile),
  deleteTransaction: withAuthentication(deleteTransaction),
  resetAddTransactionStatus,
  getTransactions: withAuthentication(getTransactions),
};
