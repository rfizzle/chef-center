import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import DashboardApi from '../../api/DashboardApi';
import * as types from './types';

export const loadDashboard = () => {
  return dispatch => {
    Promise.resolve(dispatch(loadingContent()))
      .then(() => DashboardApi.index())
      .then(dashboard => dispatch(dashboardLoaded(dashboard)))
      .then(() => dispatch(loadedContent()))
      .catch(error => {
        dispatch(loadedContent());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const refreshDashboard = () => {
  return dispatch => {
    Promise.resolve(dispatch(dashboardRefreshing()))
      .then(() => DashboardApi.index())
      .then(dashboard => dispatch(dashboardLoaded(dashboard)))
      .catch(error => {
        dispatch(dashboardRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

function dashboardLoaded(dashboard) {
  return { type: types.DASHBOARD_LOADED, dashboard };
}

function dashboardRefreshing() {
  return { type: types.DASHBOARD_REFRESHING };
}

function dashboardRefreshed() {
  return { type: types.DASHBOARD_REFRESHED };
}