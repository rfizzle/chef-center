import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MainLayoutComponent from '../components/layout/Main';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import { loadProfile, updateProfile } from '../store/profile/actions';

const styles = theme => ({
  contentPaper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    overflow: 'hidden',
  },
  heading: {
    marginBottom: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  buttonContainer: {
    textAlign: 'right',
  },
  button: {
    ...theme.button,
    marginTop: theme.spacing(2),
  },
});

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
    };
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  componentDidMount() {
    // Get user profile information
    this.props.loadProfile();
  }

  componentWillUpdate(nextProps, _nextState, _nextContext) {
    if (this.props.name !== nextProps.name) {
      this.setState({ ...this.state, name: nextProps.name });
    }
  }

  handleNameInputChange = event => {
    this.setState({
      name: event.target.value,
    });
  };

  handleProfileUpdate = () => {
    this.props.updateProfile(this.state.name);
  };

  render() {
    const { classes, email } = this.props;
    const { name } = this.state;

    return (
      <MainLayoutComponent pageTitle="Profile" subNavLinks={[]} subNavActions={[]}>
        <Typography variant="body2" className={classes.heading}>
          General
        </Typography>
        <Paper className={classes.contentPaper}>
          <TextField
            name="email"
            label="Email"
            margin="normal"
            placeholder=""
            disabled={true}
            value={email}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="name"
            label="Name"
            margin="normal"
            placeholder=""
            value={name}
            onChange={this.handleNameInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleProfileUpdate}
            >
              Update
            </Button>
          </div>
        </Paper>
      </MainLayoutComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadProfile, updateProfile }, dispatch);

const mapStateToProps = (state) => ({
  name: state.profile.name,
  email: state.profile.email,
});

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  loadProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfilePage));