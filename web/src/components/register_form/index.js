import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  registerForm: {
    minWidth: theme.spacing(42),
    maxWidth: theme.spacing(56),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonContainer: {
    textAlign: 'right',
  },
  button: {
    ...theme.button,
    marginTop: theme.spacing(2),
  }
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleNameInputChange = event => {
    this.props.onNameChange(event.target.value);
  };

  handleEmailInputChange = event => {
    this.props.onEmailChange(event.target.value);
  };

  handlePasswordInputChange = event => {
    this.props.onPasswordChange(event.target.value);
  };

  handleSubmit = event => {
    const { mfaEnabled } = this.props;
    event.preventDefault();
    if (mfaEnabled) {
      this.props.onPageToggle();
    } else {
      this.props.onSubmit();
    }
  };

  handleEnter = event => {
    const { mfaEnabled } = this.props;
    if (event.key === 'Enter') {
      event.preventDefault();
      if (mfaEnabled) {
        this.props.onPageToggle();
      } else {
        this.props.onSubmit();
      }
    }
  };

  render() {
    const { classes, name, email, password, mfaEnabled } = this.props;

    return (
      <Paper square={true} className={classes.registerForm} elevation={1}>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Register
        </Typography>
        <Typography variant="body2" align="center">
          <Link to="/login" underline="always">
            Already have an account?
          </Link>
        </Typography>
        <TextField
          id="name-input"
          name="name"
          label="Name"
          margin="normal"
          placeholder=""
          value={name}
          onKeyPress={this.handleEnter}
          onChange={this.handleNameInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
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
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={mfaEnabled}
                onChange={this.props.onMfaToggle}
                value={mfaEnabled}
                color="primary"
              />
            }
            label="2-Factor Authentication"
          />
        </FormGroup>
        <div className={classes.buttonContainer}>
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {mfaEnabled ? 'Next' : 'Submit'}
          </Button>
        </div>
      </Paper>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  mfaEnabled: PropTypes.bool.isRequired,
  onMfaToggle: PropTypes.func.isRequired,
  onPageToggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(RegisterForm);