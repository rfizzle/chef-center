import { apiGet } from '../utils/ApiUtils';

class RolesApi {
  static async index() {
    return apiGet('/roles');
  }
}

export default RolesApi;