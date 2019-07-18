import { apiGet, apiPut } from '../utils/ApiUtils';

class RolesApi {
  static async index() {
    return apiGet('/roles');
  }

  static async get(id) {
    return apiGet('/roles/' + id);
  }

  static async update(id, data) {
    return apiPut('/roles/' + id, { role: data });
  }
}

export default RolesApi;