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
    // TODO: Break this out into own store
    case 'NODE_LOADED':
      return {
        ...state,
        nodeData: action.data,
      };
    case 'NODE_CLEARED':
      return {
        ...state,
        nodeId: null,
        nodeData: null,
      };
    default:
      return state;
  }
}
