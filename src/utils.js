const isAlpha = (str) => /^[a-zA-Z]*$/.test(str);
const isNumeric = (str) => /^\d*$/.test(str);
const API_KEY = '095d5387-cca8-40cd-bdac-e568d5437dfa';
const WEB_URL = 'https://www.wordplay-api.stream/';
const DEFAULT_TIMEOUT = 15000;

export { isAlpha, isNumeric, API_KEY, DEFAULT_TIMEOUT, WEB_URL };
export default { isAlpha, isNumeric, API_KEY, DEFAULT_TIMEOUT, WEB_URL };
