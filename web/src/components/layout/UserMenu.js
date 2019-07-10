import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarIcon from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { bindActionCreators } from 'redux';
import { authLogout } from '../../store/authentication/actions';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const styles = _theme => ({});

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  };

  handleProfile = () => {
    this.handleClose();
    this.props.push('/profile');
  };

  handleLogout = () => {
    this.handleClose();
    this.props.authLogout();
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    return (
      <div>
        <IconButton onClick={this.handleClick} color="inherit" aria-owns={anchorEl ? 'profile-menu' : undefined}>
          <AvatarIcon/>
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={this.handleClose}
          className={classes.menu}
        >
          <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  authLogout: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = (_state) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ authLogout, push }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserMenu));