import { apiGet } from '../utils/ApiUtils';

class CookbooksApi {
  static async index() {
    return apiGet('/cookbooks');
  }

  static async recipes() {
    return apiGet('/cookbooks/recipes');
  }
}

export default CookbooksApi;