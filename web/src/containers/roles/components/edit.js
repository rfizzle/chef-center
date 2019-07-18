import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import AceEditor from 'react-ace';

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from '@material-ui/core/Avatar';
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ComputerIcon from '@material-ui/icons/Computer';
import Button from "@material-ui/core/Button";

import AntTabs from '../../../components/ant_tabs';
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

class RoleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.roleData.description,
      default_attributes: JSON.stringify(props.roleData.default_attributes, null, 2),
      override_attributes: JSON.stringify(props.roleData.override_attributes, null, 2),
    };
    this.detailsTab = this.detailsTab.bind(this);
    this.runListTab = this.runListTab.bind(this);
    this.attributesTab = this.attributesTab.bind(this);
    this.handleDefaultAttributeChange = this.handleDefaultAttributeChange.bind(this);
    this.handleOverrideAttributeChange = this.handleOverrideAttributeChange.bind(this);
  }

  handleDescriptionInputChange = event => {
    this.setState({
      ...this.state,
      description: event.target.value,
    });
  };

  handleDefaultAttributeChange = value => {
    this.setState({
      ...this.state,
      default_attributes: value,
    })
  };

  handleOverrideAttributeChange = value => {
    this.setState({
      ...this.state,
      override_attributes: value,
    })
  };

  handleAttributeSave = () => {
    try {
      const defaultAttributes = JSON.parse(this.state.default_attributes);
      const overrideAttributes = JSON.parse(this.state.override_attributes);
      this.props.onUpdate('attributes', {
        default_attributes: defaultAttributes,
        override_attributes: overrideAttributes,
      });
    } catch {
      this.props.onError({ message: 'Invalid JSON in attributes', options: { variant: 'error' } });
    }
  };

  nameItem = (name) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ComputerIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Name" secondary={name}/>
    </ListItem>
  );

  detailsTab = (roleData) => (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={6} md={3}>
          <List>
            {this.nameItem(roleData.name)}
          </List>
        </Grid>
        <Grid item xs={6} md={3}>
          <List/>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <TextField
              name="description"
              label="Description"
              margin="normal"
              placeholder=""
              value={this.state.description}
              onChange={this.handleDescriptionInputChange}
              fullWidth
              multiline
              rows="3"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={this.props.classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                onClick={() => this.props.onUpdate('description', this.state.description)}
              >
                Update
              </Button>
            </div>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
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
        <Grid item xs={12} md={6}>
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
            onChange={this.handleDefaultAttributeChange}
            width="100%"
            editorProps={{ "$blockScrolling": "Infinity" }}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}/>
        </Grid>
        <Grid item xs={12} md={6}>
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
            onChange={this.handleOverrideAttributeChange}
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
    const { roleId, roleData, recipes } = this.props;
    const roles = _.uniq(_.filter(this.props.roles, (i) => { return !(_.isEqual(i.name, roleId)); }));

    return (
      <AntTabs
        data={
          [
            { label: 'Details', content: this.detailsTab(roleData) },
            { label: 'Run List', content: this.runListTab(roleData.run_list, roles, recipes) },
            { label: 'Attributes', content: this.attributesTab() },
          ]
        }
        key={roleId}
      />
    );
  }
}

RoleEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  roleId: PropTypes.string,
  roleData: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  recipes: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default (withStyles(styles)(RoleEdit));