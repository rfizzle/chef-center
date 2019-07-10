import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

const findLinkPosition = (_arr, _link) => {
  return 0;
  //return arr.findIndex(elem => elem.link === link)
};

const buildSubNav = (links, location, classes) => {
  if (links.length > 0) {
    return (
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs
          value={findLinkPosition(links, location)} textColor="inherit">
          {links.map(link => <Tab component={Link} to={link.link} key={link.label} textColor="inherit"
                                  label={link.label}/>)}
        </Tabs>
      </AppBar>
    );
  }
};

const singleAction = (action, classes) => {
  return (
    <Grid key={action.title} item>
      <Button
        component={Link}
        to={action.link}
        className={classes.button}
        variant="outlined"
        color="inherit"
        size="small"
      >
        {action.title}
      </Button>
    </Grid>
  );
};

const buildActions = (actions, classes) => {
  if (actions.length > 0) {
    return (actions.map(action => singleAction(action, classes)));
  }
};

function TopNav(props) {
  const { classes, onDrawerToggle, title, links, actions } = props;

  const location = props.location;

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon/>
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs/>
            <Grid item>
              <Typography className={classes.link} component="a" href="#">
                Go to docs
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alters">
                <IconButton color="inherit">
                  <NotificationsIcon/>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <UserMenu/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {title}
              </Typography>
            </Grid>
            {buildActions(actions, classes)}
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {buildSubNav(links, location, classes)}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  // setup props from redux store
  // ex isAuthenticated: !!state.authentication.isAuthenticated,
  location: state.router.location,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopNav));