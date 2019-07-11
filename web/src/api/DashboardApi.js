import { apiGet } from '../utils/ApiUtils';

class DashboardApi {
  static async index() {
    return apiGet('/dashboard');
  }
}

export default DashboardApi;