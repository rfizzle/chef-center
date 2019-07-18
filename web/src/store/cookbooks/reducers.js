const defaultState = { cookbooks: [], isRefreshing: false };

export default function cookbooksReducer(state = defaultState, action) {
  switch (action.type) {
    case 'COOKBOOKS_LOADED':
      return {
        ...state,
        cookbooks: action.cookbooks,
        isRefreshing: false,
      };
    case 'COOKBOOK_RECIPES_LOADED':
      return {
        ...state,
        recipes: action.recipes['recipes'],
      };
    case 'COOKBOOKS_REFRESHING':
      return {
        ...state,
        isRefreshing: true,
      };
    case 'COOKBOOKS_REFRESHED':
      return {
        ...state,
        isRefreshing: false,
      };
    default:
      return state;
  }
}
