import { apiGet } from '../utils/ApiUtils';

class CookbooksApi {
  static async index() {
    return apiGet('/cookbooks');
  }
}

export default CookbooksApi;