import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  loginForm: {
    minWidth: theme.spacing(42),
    maxWidth: theme.spacing(56),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  buttonContainer: {
    textAlign: 'right',
  },
  button: {
    ...theme.button,
    marginTop: theme.spacing(2),
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEmailInputChange = event => {
    this.props.onEmailChange(event.target.value);
  };

  handlePasswordInputChange = event => {
    this.props.onPasswordChange(event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  handleEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.onSubmit();
    }
  };

  render() {
    const { classes, email, password } = this.props;

    return (
      <Paper square={true} className={classes.loginForm} elevation={1}>
        <Typography variant="h4" gutterBottom marked="center" align="center">
          Login
        </Typography>
        <Typography variant="body2" align="center">
          Not a member yet? &nbsp;
          <Link to="/register" align="center" underline="always">
            Sign Up
          </Link>
        </Typography>
        <TextField
          id="email-input"
          name="email"
          label="Email"
          margin="normal"
          placeholder=""
          value={email}
          onKeyPress={this.handleEnter}
          onChange={this.handleEmailInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="password-input"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          placeholder=""
          value={password}
          onKeyPress={this.handleEnter}
          onChange={this.handlePasswordInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.buttonContainer}>
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
        </div>
      </Paper>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(LoginForm);