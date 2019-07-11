import React, { Component } from 'react';
import { render } from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import './styles/styles.css';
import { theme } from './theme/theme';
import configureStore from './store/config/configureStore';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { loginSuccess, logoutSuccess } from './store/authentication/actions';
import history from './routers/history';
import Authenticator from './lib/Authenticator';
import authenticationReducer from './store/authentication/reducers';
import usersReducer from './store/users/reducers';
import applicationReducer from './store/application/reducers';
import profileReducer from './store/profile/reducers';
import Notifier from './components/notifier';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import CloseSnackbar from "./components/notifier/CloseSnackbar";
import nodesReducer from "./store/nodes/reducers";
import dashboardReducer from "./store/dashboard/reducers";

const reducer = (history) => {
  return {
    application: applicationReducer,
    authentication: authenticationReducer,
    router: connectRouter(history),
    dashboard: dashboardReducer,
    users: usersReducer,
    nodes: nodesReducer,
    profile: profileReducer,
  };
};

const store = configureStore({
  reducer: reducer(history)
});

if (process.env.NODE_ENV !== 'production') {
  store.subscribe(() => {
    console.log(store.getState()); // eslint-disable-line no-console
  });
}

axios.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    if (status === 401) {
      store.dispatch(logoutSuccess());
    }
    return Promise.reject(error);
  }
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider
              maxSnack={3}
              preventDuplicate
              action={() => <CloseSnackbar/>}>
              <div>
                <Notifier/>
                <AppRouter/>
              </div>
            </SnackbarProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Authenticator.checkAuth()
  .then(res => store.dispatch(loginSuccess(res.email, res.name)))
  .then(() => render(<App/>, document.getElementById('app')))
  .catch(() => render(<App/>, document.getElementById('app')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
