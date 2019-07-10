import * as _ from 'lodash';

class UserUtils {
  static searchUsers = (users, search) => {
    if (search) {
      const emailSearch = _.filter(users, (o) => o.email.includes(search));
      const nameSearch = _.filter(users, (o) => o.name.includes(search));
      return _.union(emailSearch, nameSearch);
    } else {
      return users;
    }
  };
}

export default UserUtils;