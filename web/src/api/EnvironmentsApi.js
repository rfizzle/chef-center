import { apiGet } from '../utils/ApiUtils';

class EnvironmentsApi {
  static async index() {
    return apiGet('/environments');
  }
}

export default EnvironmentsApi;