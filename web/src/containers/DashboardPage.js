import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MainLayoutComponent from '../components/layout/Main';

const styles = _theme => ({});

class DashboardPage extends Component {
  render() {
    return (
      <MainLayoutComponent
        pageTitle="Dashboard"
        // subNavLinks={[{ label: "Users", link: "/users/" }]}
        subNavLinks={[]}
        subNavActions={[]}
      >
        <div/>
      </MainLayoutComponent>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardPage);