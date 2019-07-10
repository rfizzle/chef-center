import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  mfaForm: {
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
  },
});

class MfaPrompt extends Component {
  constructor(props) {
    super(props);
    this.handleMfaInputChange = this.handleMfaInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleMfaInputChange = event => {
    this.props.onMfaChange(event.target.value);
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
    const { classes, mfa } = this.props;

    return (
      <Paper square={true} className={classes.mfaForm} elevation={1}>
        <Typography variant="h4" gutterBottom marked="center" align="center">
          2-Step Verification
        </Typography>
        <Typography variant="body2" align="center">
          Get a verification code from the Google Authenticator app
        </Typography>
        <TextField
          id="mfa-input"
          name="mfa"
          label="2-Step Code"
          margin="normal"
          placeholder=""
          value={mfa}
          onKeyPress={this.handleEnter}
          onChange={this.handleMfaInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.buttonContainer}>
          <Button
            id="mfa-submit"
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </div>
      </Paper>
    );
  }
}

MfaPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
  mfa: PropTypes.string.isRequired,
  onMfaChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(MfaPrompt);