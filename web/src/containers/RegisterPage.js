import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authRegister } from '../store/authentication/actions';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { enqueueSnackbar } from '../store/application/actions';
import LandingAppBar from '../components/layout/LandingAppBar';
import { withStyles } from '@material-ui/core';
import RegisterForm from '../components/register_form';
import MfaSetup from '../components/mfa_setup';
import CssBaseline from '@material-ui/core/CssBaseline';
import { authenticator } from 'otplib/otplib-browser';

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

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      mfaEnabled: false,
      mfaSecret: '',
      mfaOtp: '',
      mfaForm: false,
    };

    this.getPath = this.getPath.bind(this);
    this.getContent = this.getContent.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleMfaToggle = this.handleMfaToggle.bind(this);
    this.handleMfaOtpChange = this.handleMfaOtpChange.bind(this);
    this.handleMfaPageToggle = this.handleMfaPageToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.push(this.getPath());
    }
  }

  getPath = () => this.props.nextPath ? this.props.nextPath : '/dashboard';

  handleNameChange = (name) => {
    this.setState({ name });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleMfaToggle = () => {
    const { mfaEnabled } = this.state;
    if (!mfaEnabled) {
      let secret = authenticator.generateSecret();
      this.setState({
        mfaEnabled: true,
        mfaSecret: secret,
        mfaOtp: ''
      });
    } else {
      this.setState({
        mfaEnabled: false,
        mfaSecret: '',
        mfaOtp: ''
      });
    }
  };

  handleMfaOtpChange = (mfaOtp) => {
    this.setState({ mfaOtp });
  };

  handleMfaPageToggle = () => {
    this.setState({ mfaForm: !this.state.mfaForm });
  };

  handleSubmit = () => {
    const { name, email, password, mfaEnabled, mfaOtp, mfaSecret } = this.state;
    if (!name || !email || !password) {
      let message = 'Invalid Parameters';
      this.props.enqueueSnackbar({ message, options: { variant: 'error' } });
    } else if (mfaEnabled && !mfaOtp) {
      let message = 'MFA code required';
      this.props.enqueueSnackbar({ message, options: { variant: 'error' } });
    } else if (mfaEnabled && mfaOtp && !authenticator.check(mfaOtp, mfaSecret)) {
      let message = 'Invalid MFA code';
      this.props.enqueueSnackbar({ message, options: { variant: 'error' } });
    } else {
      this.props.authRegister(name, email, password, mfaSecret, mfaOtp);
    }
  };

  getContent = () => {
    const { name, email, password, mfaEnabled, mfaSecret, mfaOtp, mfaForm } = this.state;

    if (mfaForm) {
      return (
        <MfaSetup
          email={email}
          mfaOtp={mfaOtp}
          onMfaOtpChange={this.handleMfaOtpChange}
          mfaSecret={mfaSecret}
          onPageToggle={this.handleMfaPageToggle}
          onSubmit={this.handleSubmit}
        />
      );
    } else {
      return (
        <RegisterForm
          name={name}
          onNameChange={this.handleNameChange}
          email={email}
          onEmailChange={this.handleEmailChange}
          password={password}
          onPasswordChange={this.handlePasswordChange}
          mfaEnabled={mfaEnabled}
          onMfaToggle={this.handleMfaToggle}
          onPageToggle={this.handleMfaPageToggle}
          onSubmit={this.handleSubmit}
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

const mapDispatchToProps = dispatch => bindActionCreators({ authRegister, push, enqueueSnackbar }, dispatch);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.isAuthenticated,
  nextPath: state.authentication.nextPath,
});

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  nextPath: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  authRegister: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RegisterPage));