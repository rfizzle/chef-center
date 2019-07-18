const defaultState = { roles: [], isRefreshing: false };

export default function rolesReducer(state = defaultState, action) {
  switch (action.type) {
    case 'ROLES_LOADED':
      return {
        ...state,
        roles: action.roles,
        isRefreshing: false,
      };
    case 'ROLES_REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case 'ROLES_REFRESHED':
      return {
        ...state,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
