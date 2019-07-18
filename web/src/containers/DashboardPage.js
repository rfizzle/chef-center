import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MainLayoutComponent from '../components/layout/Main';
import Widget from '../components/widget';
import Grid from '@material-ui/core/Grid';
import ComputerIcon from '@material-ui/icons/Computer';
import CookBookIcon from '@material-ui/icons/LibraryBooks';
import RoleIcon from '@material-ui/icons/Security';
import ClientIcon from '@material-ui/icons/Backup';
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import FailedIcon from '@material-ui/icons/HighlightOffOutlined';
import RunningIcon from '@material-ui/icons/PlayCircleOutline';

import { connect } from 'react-redux';
import { loadDashboard, refreshDashboard } from '../store/dashboard/actions';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  fullHeightBody: {
    height: theme.spacing(3),
  },
  largeIcon: {
    transform: 'scale(5.0)',
    color: theme.palette.common.light.blueGray
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
          { label: 'Home', link: '/dashboard' },
        ]}
        subNavActions={[]}
      >
        <Grid container spacing={4}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Nodes"
              mainValue={dashboard.nodes}
              subText=""
              actionText="View"
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
              actionText="View"
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
              actionText="View"
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
              actionText="View"
              actionUrl="/clients"
              icon={<ClientIcon className={classes.largeIcon}/>}
            >
            </Widget>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Successful Runs"
              mainValue={dashboard.successful_runs}
              subText=""
              actionText="View"
              actionUrl="/runs?type=success"
              icon={<SuccessIcon className={classes.largeIcon}/>}
            >
            </Widget>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Failed Runs"
              mainValue={dashboard.failed_runs}
              subText=""
              actionText="View"
              actionUrl="/runs?type=failed"
              icon={<FailedIcon className={classes.largeIcon}/>}
            >
            </Widget>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Widget
              title="Started Runs"
              mainValue={dashboard.started_runs}
              subText=""
              actionText="View"
              actionUrl="/runs?type=started"
              icon={<RunningIcon className={classes.largeIcon}/>}
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