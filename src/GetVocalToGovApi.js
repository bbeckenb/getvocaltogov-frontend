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
    return res.user;
  }

  static async updateUser(username, userData) {
    const res = await this.request(`users/${username}`, userData, 'patch');
    return res.user;
  }

  static async deleteUser(username) {
    const res = await this.request(`users/${username}`, {}, 'delete');
    return res.deleted;
  }

  static async createPost(postData) {
    const res = await this.request('posts', postData, 'post');
    return res.post;
  }

  static async getPost(postId) {
    const res = await this.request(`posts/${postId}`);
    return res.post;
  }

  static async getPosts(filters = {}) {
    const res = await this.request('posts', filters);
    return res.posts;
  }

  static async updatePost(postId, postData) {
    const res = await this.request(`posts/${postId}`, postData, 'patch');
    return res.post;
  }

  static async deletePost(postId) {
    const res = await this.request(`posts/${postId}`, {}, 'delete');
    return res.deleted;
  }

  static async createTemplate(templateData) {
    const res = await this.request('templates', templateData, 'post');
    return res.template;
  }

  static async getTemplate(templateId) {
    const res = await this.request(`templates/${templateId}`);
    return res.template;
  }

  static async getTemplates(filters = {}) {
    const res = await this.request('templates', filters);
    return res.templates;
  }

  static async updateTemplate(templateId, templateData) {
    const res = await this.request(`templates/${templateId}`, templateData, 'patch');
    return res.template;
  }

  static async deleteTemplate(templateId) {
    const res = await this.request(`templates/${templateId}`, {}, 'delete');
    return res.deleted;
  }

  static async favoriteTemplate(username, templateId) {
    const res = await this.request(`users/${username}/templates/${templateId}`, {}, 'post');
    return res.favorited;
  }

  static async unfavoriteTemplate(username, templateId) {
    const res = await this.request(`users/${username}/templates/${templateId}`, {}, 'delete');
    return res.unfavorited;
  }

  static async bookmarkPost(username, postId) {
    const res = await this.request(`users/${username}/posts/${postId}`, {}, 'post');
    return res.bookmarked;
  }

  static async unbookmarkPost(username, postId) {
    const res = await this.request(`users/${username}/posts/${postId}`, {}, 'delete');
    return res.unbookmarked;
  }

  static async getRepresentatives(username) {
    const res = await this.request(`representatives/${username}`);
    return res.representatives;
  }

}

export default GetVocalToGovApi;
