import { apiGet, apiPost } from '../utils/ApiUtils';

class AuthenticationApi {
  static async checkAuth() {
    return apiGet('/authentication/check');
  }

  static async loginData(data) {
    return apiPost('/authentication/login-data', data);
  }

  static async challenge(data) {
    return apiPost('/authentication/challenge', data);
  }

  static async authenticate(data) {
    return apiPost('/authentication/authenticate', data);
  }

  static async logout() {
    return apiPost('/authentication/logout', {});
  }

  static async register(data) {
    return apiPost('/authentication/register', data);
  }

  static async refresh_token() {
    return apiPost('/authentication/refresh', {}, true);
  }

}

export default AuthenticationApi;