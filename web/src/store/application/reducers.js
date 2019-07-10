const defaultState = { contentIsLoading: false, notifications: [] };

export default function applicationReducer(state = defaultState, action) {
  switch (action.type) {
    case 'CONTENT_LOADING':
      return {
        ...state,
        contentIsLoading: true,
      };
    case 'CONTENT_LOADED':
      return {
        ...state,
        contentIsLoading: false,
      };
    case 'ENQUEUE_SNACKBAR':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
          },
        ],
      };

    case 'REMOVE_SNACKBAR':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key,
        ),
      };
    default:
      return state;
  }
}
