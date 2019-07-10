import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authLogin } from '../store/authentication/actions';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { enqueueSnackbar } from '../store/application/actions';
import LandingAppBar from '../components/layout/LandingAppBar';
import { withStyles } from '@material-ui/core';
import LoginForm from '../components/login_form';
import CssBaseline from '@material-ui/core/CssBaseline';
import MfaPrompt from '../components/mfa_prompt';

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor: theme.palette.primary.background,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {},
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      mfa: '',
    };

    this.getPath = this.getPath.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleMfaChange = this.handleMfaChange.bind(this);
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.push(this.getPath());
    }
  }

  componentWillUpdate(nextProps, _nextState, _nextContext) {
    if (this.props.mfaRequired && !nextProps.mfaRequired) {
      this.setState({ ...this.state, mfa: '' });
    }
  }

  getPath = () => this.props.nextPath ? this.props.nextPath : '/dashboard';

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleMfaChange = mfa => {
    this.setState({ mfa });
  };

  handleLogin = () => {
    if (!this.state.email || !this.state.password) {
      let message = 'Invalid Parameters';
      this.props.enqueueSnackbar({ message, options: { variant: 'error' } });
    } else {
      this.props.authLogin(this.state.email, this.state.password, this.getPath(), this.state.mfa);
    }
  };

  getContent = () => {
    const { mfaRequired } = this.props;
    const { email, password, mfa } = this.state;

    if (mfaRequired) {
      return (
        <MfaPrompt
          mfa={mfa}
          onMfaChange={this.handleMfaChange}
          onSubmit={this.handleLogin}
        />
      );
    } else {
      return (
        <LoginForm
          email={email}
          onEmailChange={this.handleEmailChange}
          password={password}
          onPasswordChange={this.handlePasswordChange}
          onSubmit={this.handleLogin}
        />
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <LandingAppBar/>
        <main className={classes.main}>
          {this.getContent()}
        </main>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => bindActionCreators({ authLogin, push, enqueueSnackbar }, dispatch);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.isAuthenticated,
  nextPath: state.authentication.nextPath,
  mfaRequired: state.authentication.mfaRequired
});

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  nextPath: PropTypes.string.isRequired,
  mfaRequired: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  authLogin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));