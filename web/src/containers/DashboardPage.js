import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MainLayoutComponent from '../components/layout/Main';
import Widget from '../components/widget'
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  fullHeightBody: {
    height: theme.spacing(24),
  }
});

class DashboardPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <MainLayoutComponent
        pageTitle="Dashboard"
        subNavLinks={[
          { label: "Home", link: "/dashboard" },
          { label: 'Nodes', link: '/nodes' },
          { label: 'Cookbooks', link: '/cookbooks' }
        ]}
        subNavActions={[]}
      >
        <Grid container spacing={4}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Visits Today"
              upperTitle
              bodyClass={classes.fullHeightBody}
              className={classes.card}
            >
            </Widget>
          </Grid>
        </Grid>
      </MainLayoutComponent>
    );
  }
}

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardPage);