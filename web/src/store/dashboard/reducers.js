const defaultDashboard = { nodes: 0, cookbooks: 0, roles: 0, clients: 0 }
const defaultState = { dashboard: defaultDashboard, isRefreshing: false };

export default function dashboardReducer(state = defaultState, action) {
  switch (action.type) {
    case 'DASHBOARD_LOADED':
      return {
        ...state,
        dashboard: action.dashboard,
        isRefreshing: false,
      };
    case 'DASHBOARD_REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case 'DASHBOARD_REFRESHED':
      return {
        ...state,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
