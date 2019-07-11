import * as _ from 'lodash';

class CookbookUtils {
  static searchCookbooks = (cookbooks, search) => {
    if (search) {
      const lowerSearch = search.toLowerCase();
      const nameSearch = _.filter(cookbooks, (o) => o.name.toLowerCase().includes(lowerSearch));
      const versionSearch = _.filter(cookbooks, (o) => o.version.toLowerCase().includes(lowerSearch));
      return _.union(nameSearch, versionSearch);
    } else {
      return cookbooks;
    }
  };
}

export default CookbookUtils;