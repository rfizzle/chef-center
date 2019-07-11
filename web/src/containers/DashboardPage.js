import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MainLayoutComponent from '../components/layout/Main';
import Widget from '../components/widget'
import Grid from "@material-ui/core/Grid";
import ComputerIcon from '@material-ui/icons/Computer';
import CookBookIcon from '@material-ui/icons/LibraryBooks';
import RoleIcon from '@material-ui/icons/Security';
import ClientIcon from '@material-ui/icons/Backup';
import { connect } from "react-redux";
import { loadDashboard, refreshDashboard } from "../store/dashboard/actions";
import { bindActionCreators } from "redux";

const styles = theme => ({
  fullHeightBody: {
    height: theme.spacing(3),
  },
  largeIcon: {
    transform: 'scale(5.0)',
  }
});

class DashboardPage extends Component {
  componentDidMount() {
    this.props.loadDashboard();
  }

  handleRefresh = (event) => {
    event.preventDefault();
    this.props.refreshDashboard();
  };

  render() {
    const { classes, dashboard } = this.props;

    return (
      <MainLayoutComponent
        pageTitle="Dashboard"
        subNavLinks={[
          { label: "Home", link: "/dashboard" },
        ]}
        subNavActions={[]}
      >
        <Grid container spacing={4}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Nodes"
              mainValue={dashboard.nodes}
              subText=""
              actionText="View Nodes"
              actionUrl="/nodes"
              icon={<ComputerIcon className={classes.largeIcon}/>}
            >
            </Widget>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Cookbooks"
              mainValue={dashboard.cookbooks}
              subText=""
              actionText="View cookbooks"
              actionUrl="/cookbooks"
              icon={<CookBookIcon className={classes.largeIcon}/>}
            >
            </Widget>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Roles"
              mainValue={dashboard.roles}
              subText=""
              actionText="View roles"
              actionUrl="/roles"
              icon={<RoleIcon className={classes.largeIcon}/>}
            >
            </Widget>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Clients"
              mainValue={dashboard.clients}
              subText=""
              actionText="View clients"
              actionUrl="/clients"
              icon={<ClientIcon className={classes.largeIcon}/>}
            >
            </Widget>
          </Grid>
        </Grid>
      </MainLayoutComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadDashboard, refreshDashboard }, dispatch);

const mapStateToProps = (state) => ({
  dashboard: state.dashboard.dashboard,
});

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  loadDashboard: PropTypes.func.isRequired,
  refreshDashboard: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashboardPage));