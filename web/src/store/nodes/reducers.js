const defaultState = { nodes: [], nodeId: null, nodeData: null, isRefreshing: false };

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
    case 'NODE_SELECTED':
      return {
        ...state,
        nodeId: action.id,
      };
    case 'NODE_RETRIEVED':
      return {
        ...state,
        nodeData: action.data,
      };
    default:
      return state;
  }
}
