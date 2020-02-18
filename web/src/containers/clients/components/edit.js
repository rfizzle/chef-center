import React, { Component } from "react";
import PropTypes from "prop-types";
import AceEditor from 'react-ace';

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from '@material-ui/core/Avatar';
import ListItemText from "@material-ui/core/ListItemText";
import ComputerIcon from '@material-ui/icons/Computer';
import HelpIcon from '@material-ui/icons/Help';
import LockIcon from '@material-ui/icons/Lock';
import ClassIcon from '@material-ui/icons/Class';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import AntTabs from '../../../components/ant_tabs';

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
  icon: {
    width: '32px',
    height: '32px',
  },
  buttonContainer: {
    textAlign: 'right',
  },
  button: {
    ...theme.button,
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
  },
});

class ClientEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.detailsTab = this.detailsTab.bind(this);
    this.publicKeyTab = this.publicKeyTab.bind(this);
  }

  idItem = (name) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ComputerIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Name" secondary={name}/>
    </ListItem>
  );

  adminItem = (admin) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <LockIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Admin" secondary={admin}/>
    </ListItem>
  );

  validatorItem = (validator) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <VerifiedUserIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Validator" secondary={validator}/>
    </ListItem>
  );

  typeItem = (type) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <HelpIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Type" secondary={type}/>
    </ListItem>
  );

  classItem = (chefClass) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ClassIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="JSON Class" secondary={chefClass}/>
    </ListItem>
  );

  detailsTab = (clientData) => (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6} md={4}>
          <List>
            {this.idItem(clientData.name)}
          </List>
        </Grid>
        <Grid item xs={6} md={4}>
          <List>
            {this.adminItem(clientData.admin.toString())}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <List>
            {this.validatorItem(clientData.validator.toString())}
          </List>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6} md={4}>
          <List>
            {this.typeItem(clientData.chef_type)}
          </List>
        </Grid>
        <Grid item xs={6} md={4}>
          <List>
            {this.classItem(clientData.json_class)}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <List>
          </List>
        </Grid>
      </Grid>
    </div>
  );

  publicKeyTab = (clientData) => (
    <div>
      <Grid container spacing={4}>
        <Grid item md={12}>
          <AceEditor
            placeholder="Public Key"
            readOnly={true}
            mode="text"
            theme="github"
            name="public-key"
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={clientData.public_key}
            onChange={this.handleDefaultAttributeChange}
            width="100%"
            editorProps={{ "$blockScrolling": "Infinity" }}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}/>
        </Grid>
      </Grid>
    </div>
  );

  render() {
    const { clientId, clientData } = this.props;

    return (
      <AntTabs
        data={
          [
            { label: 'Details', content: this.detailsTab(clientData) },
            { label: 'Public Key', content: this.publicKeyTab(clientData) },
          ]
        }
        key={clientId}
      />
    );
  }
}

ClientEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  clientId: PropTypes.string,
  clientData: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired,
  onError: PropTypes.func.isRequired,
};

export default (withStyles(styles)(ClientEdit));