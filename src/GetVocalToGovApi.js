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
      console.error('API Error:', err);
      throw err.response.statusText;
      // throw Array.isArray(message) ? message : [message];
    }
  }

  static async registerUser(userData) {
    const res = await this.request('auth/register', userData, 'post');
    return res;
  }

  static async loginUser(userCreds) {
    const res = await this.request('auth/token', userCreds, 'post');
    return res;
  }

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res
  }
}

export default GetVocalToGovApi;
