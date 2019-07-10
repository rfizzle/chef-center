import React, { Component } from 'react';
import SideNav from './SideNav';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopNav from './TopNav';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContentErrorBoundary from '../error_boundry/content';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import FooterComponent from '../footer';

const drawerWidth = 256;

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flexGrow: 1,
    padding: '48px 36px 0',
    backgroundColor: theme.palette.primary.background,
  },
  footerContent: {
    flex: 1,
    backgroundColor: theme.palette.common.white,
    maxHeight: theme.spacing(6),
  },
  loadingMainContent: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.background,
  },
});

const loadingHandler = (isLoading, children) => {
  if (isLoading) {
    return (<CircularProgress size={100} thickness={4}/>);
  } else {
    return children;
  }
};

class MainLayoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, children, subNavLinks, subNavActions, pageTitle, isLoading } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <SideNav
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <SideNav
              PaperProps={{ style: { width: drawerWidth } }}
            />
          </Hidden>
        </nav>
        <div className={classes.appContent}>
          <TopNav
            onDrawerToggle={this.handleDrawerToggle}
            title={pageTitle}
            links={subNavLinks}
            actions={subNavActions}
          />
          <main className={isLoading ? classes.loadingMainContent : classes.mainContent}>
            <ContentErrorBoundary>
              {loadingHandler(isLoading, children)}
            </ContentErrorBoundary>
          </main>
          <footer className={classes.footerContent}>
            <FooterComponent/>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.application.contentIsLoading,
});

MainLayoutComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
  subNavLinks: PropTypes.array.isRequired,
  subNavActions: PropTypes.array.isRequired,
  children: PropTypes.any,
};

export default connect(mapStateToProps)(withStyles(styles)(MainLayoutComponent));