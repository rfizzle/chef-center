import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import _ from 'lodash';
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from '@material-ui/core/Avatar';
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/ReportProblem';
import UptimeIcon from '@material-ui/icons/AccessTime';
import OSIcon from '@material-ui/icons/DonutLarge';
import ComputerIcon from '@material-ui/icons/Computer';
import DomainIcon from '@material-ui/icons/Domain';
import IPIcon from '@material-ui/icons/SignalWifi4Bar';
import MacIcon from '@material-ui/icons/Fingerprint';

import AntTabs from '../../../components/ant_tabs';
import SingleSelect from '../../../components/single_select';
import RunListTable from '../../../components/run_list_table'

const styles = theme => ({
  boxContent: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  detailsTitle: {},
  detailsLabel: {},
  detailsItem: {},
  success: {
    backgroundColor: theme.palette.common.normal.green,
  },
  warning: {
    backgroundColor: theme.palette.common.normal.amber,
  },
  windows: {
    backgroundColor: '#00BCF2',
    color: '#ffffff'
  },
  ubuntu: {
    backgroundColor: '#E95420',
    color: '#ffffff'
  },
  icon: {
    width: '32px',
    height: '32px',
  }
});

class NodeEdit extends Component {
  constructor(props) {
    super(props);
    this.checkInItem = this.checkInItem.bind(this);
    this.detailsTab = this.detailsTab.bind(this);
  }

  hostItem = (hostname) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ComputerIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Hostname" secondary={hostname}/>
    </ListItem>
  );

  domainItem = (domain) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <DomainIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Domain" secondary={domain || 'NONE'}/>
    </ListItem>
  );

  checkInItem = (time) => {
    const { classes } = this.props;
    let hourSpread = moment().diff(moment(time, 'X'), 'h');
    let maxSpread = 72;
    return (
      <ListItem>
        <ListItemAvatar>
          {hourSpread < maxSpread ?
            <Avatar className={classes.success}><CheckIcon/></Avatar> :
            <Avatar className={classes.warning}><WarningIcon/></Avatar>
          }
        </ListItemAvatar>
        <ListItemText primary="Last Checkin" secondary={moment(time, 'X').fromNow()}/>
      </ListItem>
    )
  };

  uptimeItem = (uptime) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <UptimeIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Uptime" secondary={moment.duration(uptime).humanize()}/>
    </ListItem>
  );

  osItem = (platform, osVersion) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar><OSIcon/></Avatar>
      </ListItemAvatar>
      <ListItemText primary={_.capitalize(platform)} secondary={osVersion}/>
    </ListItem>
  );

  ipItem = (type, ipAddress) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar><IPIcon/></Avatar>
      </ListItemAvatar>
      <ListItemText primary={type + " Address"} secondary={ipAddress || 'N/A'}/>
    </ListItem>
  );

  macItem = (macAddress) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar><MacIcon/></Avatar>
      </ListItemAvatar>
      <ListItemText primary="MAC Address" secondary={macAddress || 'N/A'}/>
    </ListItem>
  );

  detailsTab = (nodeData) => (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={6} md={3}>
          <List>
            {this.hostItem(nodeData.hostname)}
            {this.checkInItem(nodeData.last_checkin)}
            {this.osItem(nodeData.platform, nodeData.os_version)}
            {this.macItem(nodeData.mac_address)}
          </List>
        </Grid>
        <Grid item xs={6} md={3}>
          <List>
            {this.domainItem(nodeData.domain)}
            {this.uptimeItem(nodeData.uptime)}
            {this.ipItem('IPv4', nodeData.ip_address)}
            {this.ipItem('IPv6', nodeData.ipv6_address)}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <SingleSelect
              availableValues={['production', 'development']}
              selectedValue="development"
              label="Environment"
              placeholder="Select environment"
              onChange={(selectedObj) => { console.log(selectedObj.value) }}
            />
          </List>
        </Grid>
      </Grid>
    </div>
  );

  runListTab = (nodeData) => (
    <div>
      <RunListTable run_list={['corporate_laptop']} roles={['corporate_laptop']}
                    recipes={['default', 'local', 'remote']}/>
    </div>
  );

  attributesTab = (nodeData) => (
    <div>
      Attributes
    </div>
  );

  render() {
    const { nodeData } = this.props;

    return (
      <AntTabs data={
        [
          { label: 'Details', content: this.detailsTab(nodeData) },
          { label: 'Run List', content: this.runListTab(nodeData) },
          { label: 'Attributes', content: this.attributesTab(nodeData) },
        ]
      }/>
    );
  }
}

NodeEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  nodeId: PropTypes.string,
  nodeData: PropTypes.object,
  onUpdate: PropTypes.func.isRequired
};

export default (withStyles(styles)(NodeEdit));