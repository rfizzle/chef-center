import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import RoleUtils from '../../../utils/RoleUtils';
import Chip from '@material-ui/core/Chip';
import Toolbar from "@material-ui/core/Toolbar";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from "@material-ui/core/Tooltip";
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/RemoveCircle'

const styles = theme => ({
  contentPaper: {
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  table: {
    width: '100%',
  },
  tableHead: {
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#f5f5f5',
    height: theme.spacing(4),
  },
  tableRow: {
    height: theme.spacing(4),
  },
  tableCell: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
  },
  tableBodyParent: {
    overflow: 'auto',
    maxHeight: theme.spacing(50),
  },
  tableBody: {
    overflowY: 'scroll',
  },
  marginChip: {
    marginRight: theme.spacing(1),
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  muted: {
    color: theme.palette.common.normal.grey
  },
  clickable: {
    cursor: 'pointer'
  },
  notClickable: {
    cursor: 'auto',
  },
});

class RolesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.buildRunListChips = this.buildRunListChips.bind(this);
    this.buildContent = this.buildContent.bind(this);
  }

  handleSearch = (event) => {
    let searchVal = event.target.value;
    if (searchVal) {
      // Do search
      this.setState({
        ...this.state,
        search: searchVal,
        roles: this.props.roles,
      });
    } else {
      this.setState({
        ...this.state,
        search: '',
        roles: this.props.roles,
      });
    }
  };

  handleRefresh = (event) => {
    event.preventDefault();
    this.props.onRefresh();
  };

  buildRunListChips = (arr, classes, key) => {
    if (arr.length === 0) {
      return (<div className={classes.errorText}>No Run List</div>)
    }
    return (
      <div>
        {arr.map(ele => {
          return (
            <Chip
              variant="outlined"
              size="small"
              label={ele}
              key={key + "_role_" + ele}
              className={classNames(classes.chip, classes.marginChip)}
              color="primary"
            />);
        })}
      </div>
    );
  };

  buildContent = (roles) => {
    const { classes, onRowClick, selectedRole } = this.props;
    if (roles && roles.length > 0) {
      return (
        roles.map(role => {
          return (
            <TableRow
              key={role.name}
              className={classes.clickable}
              selected={role.name === selectedRole}
            >
              <TableCell onClick={() => onRowClick(role.name)}>{role.name}</TableCell>
              <TableCell onClick={() => onRowClick(role.name)}>{role.description}</TableCell>
              <TableCell
                onClick={() => onRowClick(role.name)}>{this.buildRunListChips(role.run_list, classes, role.name)}</TableCell>
              <TableCell className={classes.notClickable} align="right">
                <RemoveIcon className={classNames(classes.errorText, classes.clickable)}/>
              </TableCell>
            </TableRow>
          );
        })
      )
    } else {
      return (
        <TableRow>
          <TableCell colSpan={4} align="center">
            <Typography className={classes.muted} align="center">
              No roles found
            </Typography>
          </TableCell>
        </TableRow>
      )
    }
  };

  render() {
    const { search } = this.state;
    const { roles, classes } = this.props;
    const filteredRoles = RoleUtils.searchRoles(roles, search);

    return (
      <div>
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit"/>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by name, description, or run list"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                  onChange={this.handleSearch}
                  value={search}
                />
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton onClick={this.handleRefresh}>
                    <RefreshIcon className={classes.block} color="inherit"/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Table className={classes.table}>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableRow}>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Run List</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.buildContent(filteredRoles)}
          </TableBody>
        </Table>
      </div>
    );
  }

}

RolesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  selectedRole: PropTypes.string,
  onRowClick: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default (withStyles(styles)(RolesTable));