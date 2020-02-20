import { apiGet } from '../utils/ApiUtils';

class ClientsApi {
  static async index() {
    return apiGet('/clients');
  }

  static async get(id) {
    return apiGet('/clients/' + id);
  }
}

export default ClientsApi;