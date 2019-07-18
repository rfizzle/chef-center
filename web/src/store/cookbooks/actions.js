import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import CookbooksApi from '../../api/CookbooksApi';
import * as types from './types';

export const loadCookbooks = () => {
  return dispatch => {
    Promise.resolve(dispatch(loadingContent()))
      .then(() => CookbooksApi.index())
      .then(cookbooks => dispatch(cookbooksLoaded(cookbooks)))
      .then(() => dispatch(loadedContent()))
      .catch(error => {
        dispatch(loadedContent());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const refreshCookbooks = () => {
  return dispatch => {
    Promise.resolve(dispatch(cookbooksRefreshing()))
      .then(() => CookbooksApi.index())
      .then(cookbooks => dispatch(cookbooksLoaded(cookbooks)))
      .catch(error => {
        dispatch(cookbooksRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

function cookbooksLoaded(cookbooks) {
  return { type: types.COOKBOOKS_LOADED, cookbooks };
}

export function cookbookRecipesLoaded(recipes) {
  return { type: types.COOKBOOK_RECIPES_LOADED, recipes };
}

function cookbooksRefreshing() {
  return { type: types.COOKBOOKS_REFRESHING };
}

function cookbooksRefreshed() {
  return { type: types.COOKBOOKS_REFRESHED };
}