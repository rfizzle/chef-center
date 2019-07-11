import { apiGet } from '../utils/ApiUtils';

class NodesApi {
  static async index() {
    return apiGet('/nodes');
  }
}

export default NodesApi;