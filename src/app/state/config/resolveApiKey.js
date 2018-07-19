import { parse as parseURL } from 'url';
import resolveApiEnv, {
  DEV
} from './resolveApiEnv';

/**
 * Returns api key for API env
 * @param {string} apiUrl url for target api env
 * @return {string} apiKey;
 */
const resolveApiKey = apiUrl => {
  const host = parseURL(apiUrl).hostname;
  const env = resolveApiEnv(host);
  const keys = {
    [DEV]: process.env.API_KEY
  };
  return keys[env];
};

export default resolveApiKey;
