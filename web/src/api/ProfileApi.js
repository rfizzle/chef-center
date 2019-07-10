import { apiGet, apiPost } from '../utils/ApiUtils';

class ProfileApi {
  static async index() {
    return apiGet('/profile');
  }

  static async update(name) {
    return apiPost('/profile', { name });
  }
}

export default ProfileApi;