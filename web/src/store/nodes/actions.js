import { enqueueSnackbar, loadedContent, loadingContent } from '../application/actions';
import * as types from './types';
import NodesApi from '../../api/NodesApi';
import RolesApi from "../../api/RolesApi";
import CookbooksApi from "../../api/CookbooksApi";
import { rolesLoadedNoRefresh } from '../roles/actions'
import { cookbookRecipesLoaded } from "../cookbooks/actions";

export const loadNodes = () => {
  return dispatch => {
    Promise.resolve(dispatch(loadingContent()))
      .then(() => NodesApi.index())
      .then(nodes => dispatch(nodesLoaded(nodes)))
      .then(() => dispatch(loadedContent()))
      .catch(error => {
        dispatch(loadedContent());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const refreshNodes = () => {
  return dispatch => {
    Promise.resolve(dispatch(nodesRefreshing()))
      .then(() => NodesApi.index())
      .then(nodes => dispatch(nodesLoaded(nodes)))
      .catch(error => {
        dispatch(nodesRefreshed());
        dispatch(enqueueSnackbar({ message: error.message, options: { variant: 'error' } }));
      });
  };
};

export const getNode = (id) => {
  return dispatch => {
    Promise.resolve(dispatch(nodesRefreshing()))
      .then(() => RolesApi.index())
      .then(roles => dispatch(rolesLoadedNoRefresh(roles)))
      .then(() => CookbooksApi.recipes())
      .then(recipes => dispatch(cookbookRecipesLoaded(recipes)))
      .then(() => dispatch(nodeSelected(id)))
      .then(() => NodesApi.get(id))
      .then(node => dispatch(nodeRetrieved(node)))
  }
};

export const updateNode = (id, data) => {
  return dispatch => {
    Promise.resolve(dispatch(nodesRefreshing()))
      .then(() => NodesApi.update(id, data))
      .then(() => NodesApi.get(id))
      .then(node => dispatch(nodeRetrieved(node)))
  }
};

function nodesLoaded(nodes) {
  return { type: types.NODES_LOADED, nodes };
}

function nodesRefreshing() {
  return { type: types.NODES_REFRESHING };
}

function nodesRefreshed() {
  return { type: types.NODES_REFRESHED };
}

function nodeSelected(id) {
  return { type: types.NODE_SELECTED, id }
}

function nodeRetrieved(data) {
  return { type: types.NODE_RETRIEVED, data }
}