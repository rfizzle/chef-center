import { apiGet, apiPut } from '../utils/ApiUtils';

class NodesApi {
  static async index() {
    return apiGet('/nodes');
  }

  static async get(id) {
    return apiGet('/nodes/' + id);
  }

  static async update(id, data) {
    return apiPut('/nodes/' + id, { node: data });
  }
}

export default NodesApi;