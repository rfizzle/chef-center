import { apiGet } from '../utils/ApiUtils';

class UsersApi {
  static async index() {
    return apiGet('/users');
  }
}

export default UsersApi;