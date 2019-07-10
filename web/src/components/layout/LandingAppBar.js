import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import settings from '../../settings';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  appTitle: {
    flex: 1,
    display: 'flex',
    fontSize: 24,
    color: theme.palette.common.white,
  },
  pageTitle: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    textDecoration: 'none',
  },
  spacer: {
    minHeight: theme.spacing(6),
  }
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.appTitle}>
          {settings.appName}
        </Typography>
        <Typography variant="h6" className={classes.pageTitle}>
        </Typography>
        <div className={classes.right}>
          <Link variant="h6" className={classes.rightLink} to="/login">
            Login
          </Link>
          <Link variant="h6" className={classes.rightLink} to="/register">
            Register
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);