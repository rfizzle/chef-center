import { apiGet } from '../utils/ApiUtils';
import _ from 'lodash';

class NodesApi {
  static async index() {
    return apiGet('/nodes');
  }

  static async get(id) {
    return apiGet('/nodes/' + _.escape(id))
  }
}

export default NodesApi;