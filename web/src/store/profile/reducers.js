const defaultState = { name: '', email: '', isRefreshing: false };

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case 'PROFILE_LOADED':
      return {
        ...state,
        name: action.name,
        email: action.email,
        isRefreshing: false,
      };
    case 'PROFILE_REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case 'PROFILE_REFRESHED':
      return {
        ...state,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
