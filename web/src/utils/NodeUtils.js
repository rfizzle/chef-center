import * as _ from 'lodash';

class NodeUtils {
  static searchNodes = (nodes, search) => {
    if (search) {
      const lowerSearch = search.toLowerCase();
      const fqdnSearch = _.filter(nodes, (o) => o.fqdn.toLowerCase().includes(lowerSearch));
      const hostnameSearch = _.filter(nodes, (o) => o.hostname.toLowerCase().includes(lowerSearch));
      const idSearch = _.filter(nodes, (o) => o.id.toLowerCase().includes(lowerSearch));
      const platformSearch = _.filter(nodes, (o) => o.platform.toLowerCase().includes(lowerSearch));
      return _.union(fqdnSearch, hostnameSearch, idSearch, platformSearch);
    } else {
      return nodes;
    }
  };
}

export default NodeUtils;