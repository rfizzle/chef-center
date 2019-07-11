import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import RolesApi from '../../api/RolesApi';
import * as types from './types';

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

function rolesLoaded(roles) {
  return { type: types.ROLES_LOADED, roles };
}

function rolesRefreshing() {
  return { type: types.ROLES_REFRESHING };
}

function rolesRefreshed() {
  return { type: types.ROLES_REFRESHED };
}