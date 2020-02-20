import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import _ from 'lodash';
import AceEditor from "react-ace";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
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

import 'brace/mode/json';
import 'brace/theme/github';

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
    this.state = {
      normal_attributes: JSON.stringify(props.nodeData.normal_attributes, null, 2),
      default_attributes: JSON.stringify(props.nodeData.default_attributes, null, 2),
      override_attributes: JSON.stringify(props.nodeData.override_attributes, null, 2),
    };
    this.checkInItem = this.checkInItem.bind(this);
    this.detailsTab = this.detailsTab.bind(this);
    this.runListTab = this.runListTab.bind(this);
    this.handleNormalAttributeChange = this.handleNormalAttributeChange.bind(this);
    this.handleAttributeSave = this.handleAttributeSave.bind(this);
  }

  handleNormalAttributeChange = value => {
    this.setState({
      ...this.state,
      normal_attributes: value,
    })
  };

  handleAttributeSave = () => {
    try {
      const normalAttributes = JSON.parse(this.state.normal_attributes);
      this.props.onUpdate('attributes', { normal_attributes: normalAttributes });
    } catch {
      this.props.onError({ message: 'Invalid JSON in attributes', options: { variant: 'error' } });
    }
  };

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
      <ListItemText primary="Uptime" secondary={moment.duration(uptime, 'seconds').humanize()}/>
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

  detailsTab = (nodeData, environments) => (
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
              availableValues={environments}
              selectedValue={nodeData.chef_environment}
              label="Environment"
              placeholder="Select environment"
              onChange={(env) => { this.props.onUpdate('environment', env.value) }}
            />
          </List>
        </Grid>
      </Grid>
    </div>
  );

  runListTab = (runList, roles, recipes) => (
    <div>
      <RunListTable
        runList={runList}
        roles={roles.map((r) => `role[${r.name}]`)}
        recipes={recipes.map((r) => `recipe[${r}]`)}
        onChange={this.props.onUpdate}
      />
    </div>
  );

  attributesTab = () => (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography align="center">
            Normal Attributes
          </Typography>
          <AceEditor
            placeholder="Normal Attributes"
            mode="json"
            theme="github"
            name="normal-attributes"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.normal_attributes}
            onChange={this.handleNormalAttributeChange}
            width="100%"
            editorProps={{ "$blockScrolling": "Infinity" }}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography align="center">
            Default Attributes
          </Typography>
          <AceEditor
            placeholder="Default Attributes"
            mode="json"
            theme="github"
            name="default-attributes"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.default_attributes}
            readOnly
            width="100%"
            editorProps={{ "$blockScrolling": "Infinity" }}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography align="center">
            Override Attributes
          </Typography>
          <AceEditor
            placeholder="Override Attributes"
            mode="json"
            theme="github"
            name="override-attributes"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.override_attributes}
            readOnly
            width="100%"
            editorProps={{ "$blockScrolling": "Infinity" }}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}/>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            className={this.props.classes.button}
            onClick={this.handleAttributeSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );

  render() {
    const { nodeId, nodeData, roles, recipes, environments } = this.props;

    return (
      <AntTabs
        data={
          [
            { label: 'Details', content: this.detailsTab(nodeData, environments) },
            { label: 'Run List', content: this.runListTab(nodeData.run_list, roles, recipes) },
            { label: 'Attributes', content: this.attributesTab() },
          ]
        }
        key={nodeId}
      />
    );
  }
}

NodeEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  nodeId: PropTypes.string,
  nodeData: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  recipes: PropTypes.array.isRequired,
  environments: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default (withStyles(styles)(NodeEdit));