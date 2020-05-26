const axios = require('axios').default;

export const getApi = (url) => {
  return axios.get(url);
}
