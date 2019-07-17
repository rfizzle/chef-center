import React, { Component } from "react";
import moment from "moment";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from '@material-ui/icons/Refresh';
import NodeUtils from "../../../utils/NodeUtils";

const styles = theme => ({
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
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
});

class NodesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

    this.buildRoleChips = this.buildRoleChips.bind(this);
  }

  handleSearch = (event) => {
    let searchVal = event.target.value;
    if (searchVal) {
      // Do search
      this.setState({
        ...this.state,
        search: searchVal,
        nodes: this.props.nodes,
      });
    } else {
      this.setState({
        ...this.state,
        search: '',
        nodes: this.props.nodes,
      });
    }
  };

  handleRefresh = (event) => {
    event.preventDefault();
    this.props.onRefresh();
  };

  buildRoleChips = (arr, classes, key) => {
    if (arr.length === 0) {
      return (<div className={classes.errorText}>No Roles</div>)
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

  render() {
    const { search } = this.state;
    const { nodes, classes, onRowClick, selectedNode } = this.props;
    const filteredNodes = NodeUtils.searchNodes(nodes, search);

    const searchBar = (
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit"/>
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by id, hostname, platform, or FQDN"
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
    );

    if (nodes && nodes.length > 0) {
      return (
        <div>
          {searchBar}
          <div className={classes.tableBodyParent}>
            <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
                <TableRow className={classes.tableRow}>
                  <TableCell>Hostname</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>FQDN</TableCell>
                  <TableCell>Uptime</TableCell>
                  <TableCell>Last Checkin</TableCell>
                  <TableCell>Roles</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {filteredNodes.map(node => {
                  return (
                    <TableRow
                      className={classes.clickable}
                      key={node.id}
                      selected={node.id === selectedNode}
                    >
                      <TableCell onClick={() => onRowClick(node.id)}>{node.hostname}</TableCell>
                      <TableCell onClick={() => onRowClick(node.id)}>{node.platform}</TableCell>
                      <TableCell onClick={() => onRowClick(node.id)}>{node.fqdn}</TableCell>
                      <TableCell
                        onClick={() => onRowClick(node.id)}>{moment.duration(node.uptime).humanize()}</TableCell>
                      <TableCell
                        onClick={() => onRowClick(node.id)}>{moment(node.last_checkin, 'X').fromNow()}</TableCell>
                      <TableCell
                        onClick={() => onRowClick(node.id)}>{this.buildRoleChips(node.roles, classes, node.id)}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {searchBar}
          <div className={classes.contentWrapper}>
            <Typography color="textSecondary" align="center">
              No nodes found
            </Typography>
          </div>
        </div>
      );
    }
  }

}

NodesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
  selectedNode: PropTypes.string,
  onRowClick: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default (withStyles(styles)(NodesTable));