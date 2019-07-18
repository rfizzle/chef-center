import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { deletePath, savePath } from '../store/authentication/actions';
import AppErrorBoundary from '../components/error_boundry/app';
import { bindActionCreators } from 'redux';
import AuthenticationApi from '../api/AuthenticationApi';

class PrivateRoute extends Component {

  componentDidMount() {
    this.handleRedirectPath();
    setInterval(AuthenticationApi.refresh_token, 300000);
  }

  componentDidUpdate(_prevProps, _prevState, _snapshot) {
    this.handleRedirectPath();
  }

  handleRedirectPath() {
    // Get current location
    const currentLocation = this.props.location;

    if (!this.props.isAuthenticated) {
      this.props.savePath(currentLocation.pathname);
    }

    if (this.props.isAuthenticated && currentLocation === this.props.nextPath) {
      this.props.deletePath();
    }
  }

  render() {
    let { isAuthenticated, component: Component } = this.props;

    if (!isAuthenticated) {
      return (<Redirect to="/login"/>);
    }

    return (
      <AppErrorBoundary>
        <Component {...this.props} />
      </AppErrorBoundary>
    );
  }
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.any,
  location: PropTypes.object.isRequired,
  savePath: PropTypes.func.isRequired,
  nextPath: PropTypes.string.isRequired,
  deletePath: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.isAuthenticated,
  nextPath: state.authentication.nextPath,
});

const mapDispatchToProps = dispatch => bindActionCreators({ savePath, deletePath }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
