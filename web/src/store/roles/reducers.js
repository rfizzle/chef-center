const defaultState = { roles: [], roleId: null, roleData: null, isRefreshing: false };

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
    // TODO: Break this out into own store
    case 'ROLE_SELECTED':
      return {
        ...state,
        roleId: action.id,
      };
    case 'ROLE_LOADED':
      return {
        ...state,
        roleData: action.data,
      };
    default:
      return state;
  }
}
