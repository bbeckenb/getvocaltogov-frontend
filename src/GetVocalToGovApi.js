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
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
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
    return res;
  }

  // static async getPosts() {
  //   const res = await this.request(`posts`);
  //   return res;
  // }

  static async getTemplates(filters = {}) {
    const res = await this.request('templates', filters);
    return res;
  }

}

export default GetVocalToGovApi;