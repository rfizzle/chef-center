const defaultState = { users: [], isRefreshing: false };

export default function usersReducer(state = defaultState, action) {
  switch (action.type) {
    case 'USERS_LOADED':
      return {
        ...state,
        users: action.users,
        isRefreshing: false,
      };
    case 'USERS_REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case 'USERS_REFRESHED':
      return {
        ...state,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
