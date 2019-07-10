import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode';
import otp from 'otplib/authenticator';
import settings from '../../settings';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

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
  qrTextContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    fontWeight: 700,
    fontSize: '12px',
    backgroundColor: theme.palette.background.light,
  },
  qrContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    color: '-webkit-link',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  buttonContainer: {
    textAlign: 'right',
  },
  button: {
    ...theme.button,
    marginTop: theme.spacing(2),
  },
  leftButton: {
    ...theme.button,
    marginTop: theme.spacing(2),
    float: 'left',
  }
});

class MfaSetup extends Component {
  constructor(props) {
    super(props);

    this.state = { qrImage: true };

    this.generateQrCode = this.generateQrCode.bind(this);
    this.showQrCode = this.showQrCode.bind(this);
    this.handleQrImageToggle = this.handleQrImageToggle.bind(this);
    this.handleMfaInputChange = this.handleMfaInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  generateQrCode() {
    const { email, mfaSecret } = this.props;
    let otpUri = otp.keyuri(email, settings.appName, mfaSecret);
    let qrString;

    QRCode.toDataURL(otpUri, (err, image) => {
      if (err) {
        return;
      }
      qrString = image;
    });

    // noinspection JSUnusedAssignment
    return qrString;
  }

  showQrCode() {
    const { classes, mfaSecret } = this.props;

    if (this.state.qrImage) {
      return (
        <div>
          <Typography variant="body2" align="left">
            3. Choose to scan a barcode, then scan code below.
          </Typography>
          <div className={classes.qrContainer}>
            <img alt="mfaQrCodeImage" src={this.generateQrCode()}/>
          </div>
          <Typography className={classes.link} onClick={this.handleQrImageToggle} variant="body2" align="center">
            Use secret instead of qr code image.
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="body2" align="left">
            3. Choose to enter a provided key, then enter the key below.
          </Typography>
          <Typography variant="h5" align="center" className={classes.qrTextContainer}>
            {mfaSecret}
          </Typography>
          <Typography className={classes.link} onClick={this.handleQrImageToggle} variant="body2" align="center">
            Use qr code image instead of secret.
          </Typography>
        </div>
      );
    }
  }

  handleQrImageToggle() {
    this.setState({ qrImage: !this.state.qrImage });
  }

  handleMfaInputChange = event => {
    this.props.onMfaOtpChange(event.target.value);
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
    const { classes, mfaOtp } = this.props;

    return (
      <Paper square={true} className={classes.mfaForm} elevation={1}>
        <Typography variant="h4" gutterBottom marked="center" align="center">
          2-Step Verification
        </Typography>
        <Typography variant="body2" align="left">
          1. Install the Google Authenticator App on your phone.
        </Typography>
        <Typography variant="body2" align="left">
          2. Open the app, tab begin setup
        </Typography>
        {this.showQrCode()}
        <TextField
          id="mfa-input"
          name="mfa"
          label="2-Step Code"
          margin="normal"
          placeholder=""
          value={mfaOtp}
          onKeyPress={this.handleEnter}
          onChange={this.handleMfaInputChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.buttonContainer}>
          <Button
            onClick={this.props.onPageToggle}
            variant="contained"
            color="default"
            className={classes.leftButton}
          >
            Back
          </Button>
          <Button
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

MfaSetup.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  mfaOtp: PropTypes.string.isRequired,
  onMfaOtpChange: PropTypes.func.isRequired,
  mfaSecret: PropTypes.string.isRequired,
  onPageToggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(MfaSetup);