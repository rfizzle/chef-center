const defaultState = { environments: [], isRefreshing: false };

export default function environmentsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'ENVIRONMENTS_LOADED':
      return {
        ...state,
        environments: action.data.environments,
        isRefreshing: false,
      };
    case 'ENVIRONMENTS_REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case 'ENVIRONMENTS_REFRESHED':
      return {
        ...state,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
