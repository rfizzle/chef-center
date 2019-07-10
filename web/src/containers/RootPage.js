import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import settings from '../settings';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

class RootPage extends Component {

  componentWillMount() {
    if (this.props.isAuthenticated) {
      if (!this.props.nextPath || this.props.nextPath === '/') {
        this.props.push(settings.defaultAuthenticatedRoute);
      }
    } else {
      this.props.push(settings.defaultUnauthenticatedRoute);
    }
  }

  render() {
    return (<div/>);
  }

}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.isAuthenticated,
  nextPath: state.authentication.nextPath,
});

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

RootPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  nextPath: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootPage);