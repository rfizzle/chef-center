import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import RolesApi from '../../api/RolesApi';
import * as types from './types';
import CookbooksApi from '../../api/CookbooksApi';
import { cookbookRecipesLoaded } from '../cookbooks/actions';

export const loadRoles = () => {
  return dispatch => {
    Promise.resolve(dispatch(loadingContent()))
      .then(() => RolesApi.index())
      .then(roles => dispatch(rolesLoaded(roles)))
      .then(() => dispatch(loadedContent()))
      .catch(error => {
        dispatch(loadedContent());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const refreshRoles = () => {
  return dispatch => {
    Promise.resolve(dispatch(rolesRefreshing()))
      .then(() => RolesApi.index())
      .then(roles => dispatch(rolesLoaded(roles)))
      .catch(error => {
        dispatch(rolesRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const getRole = (id) => {
  return dispatch => {
    Promise.resolve(dispatch(rolesRefreshing()))
      .then(() => CookbooksApi.recipes())
      .then(recipes => dispatch(cookbookRecipesLoaded(recipes)))
      .then(() => dispatch(roleSelected(id)))
      .then(() => RolesApi.get(id))
      .then(role => dispatch(roleLoaded(role)))
      .catch(error => {
        dispatch(rolesRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const updateRole = (id, data) => {
  return dispatch => {
    Promise.resolve(dispatch(rolesRefreshing()))
      .then(() => RolesApi.update(id, data))
      .then(role => dispatch(roleLoaded(role)))
      .then(() => RolesApi.index())
      .then(roles => dispatch(rolesLoaded(roles)))
      .catch(error => {
        dispatch(rolesRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export function rolesLoaded(roles) {
  return { type: types.ROLES_LOADED, roles };
}

export function rolesRefreshing() {
  return { type: types.ROLES_REFRESHING };
}

export function rolesRefreshed() {
  return { type: types.ROLES_REFRESHED };
}

function roleSelected(id) {
  return { type: types.ROLE_SELECTED, id };
}

// TODO: Break this out into own store
function roleLoaded(data) {
  return { type: types.ROLE_LOADED, data };
}