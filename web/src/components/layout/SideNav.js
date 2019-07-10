import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

const links = [
  {
    id: 'Main',
    children: [
      { id: 'Dashboard', link: '/dashboard', icon: <DashboardIcon/> },
    ],
  },
  {
    id: 'Administration',
    children: [
      { id: 'Users', link: '/users', icon: <PeopleIcon/> },
    ],
  },
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

class SideNav extends Component {

  isActiveLink = (link) => link === this.props.location.pathname;

  render() {
    const { classes, ...other } = this.props;
    return (
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
            Chef-Center
          </ListItem>
          {links.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText classes={{ primary: classes.categoryHeaderPrimary }}>
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, link }) => (
                <ListItem
                  button
                  key={childId}
                  className={classNames(classes.item, this.isActiveLink(link) && classes.itemActiveItem)}
                  component={Link}
                  to={link}
                >
                  <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              ))}
              <Divider className={classes.divider}/>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    );
  }

}

const mapStateToProps = (state) => ({
  // setup props from redux store
  // ex isAuthenticated: !!state.authentication.isAuthenticated,
  location: state.router.location,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideNav));