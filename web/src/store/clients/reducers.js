const defaultState = { clients: [], clientId: null, clientData: null, isRefreshing: false };

export default function clientsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'CLIENTS_LOADED':
      return {
        ...state,
        clients: action.clients,
        isRefreshing: false,
      };
    case 'CLIENTS_REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case 'CLIENTS_REFRESHED':
      return {
        ...state,
        isRefreshing: false,
      };
    // TODO: Break this out into own store
    case 'CLIENT_SELECTED':
      return {
        ...state,
        clientId: action.id,
      };
    case 'CLIENT_LOADED':
      return {
        ...state,
        clientData: action.data,
      };
    default:
      return state;
  }
}
