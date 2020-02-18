import * as _ from 'lodash';

class ClientUtils {
  static searchClients = (clients, search) => {
    if (search) {
      const lowerSearch = search.toLowerCase();
      return _.filter(clients, (o) => o.id.toLowerCase().includes(lowerSearch));
    } else {
      return clients;
    }
  };
}

export default ClientUtils;