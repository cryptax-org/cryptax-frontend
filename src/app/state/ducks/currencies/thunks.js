import {
  getCurrencies,
} from './actions';
import { withAuthentication } from 'state/ducks/session'

export default {
  getCurrencies: withAuthentication(getCurrencies),
};
