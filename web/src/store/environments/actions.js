import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import EnvironmentsApi from '../../api/EnvironmentsApi';
import * as types from './types';

export const loadEnvironments = () => {
  return dispatch => {
    Promise.resolve(dispatch(loadingContent()))
      .then(() => EnvironmentsApi.index())
      .then(environments => dispatch(environmentsLoaded(environments)))
      .then(() => dispatch(loadedContent()))
      .catch(error => {
        dispatch(loadedContent());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const refreshEnvironments = () => {
  return dispatch => {
    Promise.resolve(dispatch(environmentsRefreshing()))
      .then(() => EnvironmentsApi.index())
      .then(environments => dispatch(environmentsLoaded(environments)))
      .catch(error => {
        dispatch(environmentsRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export function environmentsLoaded(data) {
  return { type: types.ENVIRONMENTS_LOADED, data };
}

export function environmentsRefreshing() {
  return { type: types.ENVIRONMENTS_REFRESHING };
}

export function environmentsRefreshed() {
  return { type: types.ENVIRONMENTS_REFRESHED };
}