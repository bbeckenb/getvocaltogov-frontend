import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class GetVocalToGovApi {
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${GetVocalToGovApi.token}` };
    const params = (method === 'get')
      ? data
      : {};
    try {
      return (await axios({
        url, method, data, params, headers,
      })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      const { message } = err.response.data.error;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async registerUser(userInfo) {
    const res = await this.request('auth/register', userInfo, 'post');
    return res;
  }
}

export default GetVocalToGovApi;
