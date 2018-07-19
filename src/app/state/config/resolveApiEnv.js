import { parse as parseURL } from 'url';
import resolveApiUrl from './resolveApiUrl';

export const DEV = 'dev';

const envs = {
  localhost: DEV,
  [process.env.INVOKE_URL_HOST]: DEV
};

const resolveApiEnv = () => {
  const apiHostname = parseURL(resolveApiUrl()).hostname;
  return envs[apiHostname];
};

export default resolveApiEnv;
