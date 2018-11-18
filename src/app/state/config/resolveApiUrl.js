/**
 * Returns string of full api URL
 * @return {string} api url
 */
const resolveApiUrl = () => {
  const host = window.location.hostname.split(`www.`).pop();
  const urls = {
    localhost: process.env.INVOKE_URL,
    [process.env.BASE_URL]: process.env.INVOKE_URL
  };

  return urls[host];
};

export default resolveApiUrl;
