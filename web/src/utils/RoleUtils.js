import * as _ from 'lodash';

class RoleUtils {
  static searchRoles = (cookbooks, search) => {
    if (search) {
      const lowerSearch = search.toLowerCase();
      const nameSearch = _.filter(cookbooks, (o) => o.name.toLowerCase().includes(lowerSearch));
      const descriptionSearch = _.filter(cookbooks, (o) => o.description.toLowerCase().includes(lowerSearch));
      return _.union(nameSearch, descriptionSearch);
    } else {
      return cookbooks;
    }
  };
}

export default RoleUtils;