const defaultState = { nodes: [], isRefreshing: false };

export default function nodesReducer(state = defaultState, action) {
  switch (action.type) {
    case 'NODES_LOADED':
      return {
        ...state,
        nodes: action.nodes,
        isRefreshing: false,
      };
    case 'NODES_REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case 'NODES_REFRESHED':
      return {
        ...state,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
