import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import MainLayoutComponent from '../components/layout/Main';
import { connect } from 'react-redux';
import { loadNodes, refreshNodes } from '../store/nodes/actions';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import NodeUtils from "../utils/NodeUtils";
import moment from 'moment';
import Chip from "@material-ui/core/Chip";
import classNames from 'classnames';
import { push } from 'connected-react-router';
import AntTabs from "../components/ant_tabs";

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
  marginChip: {
    marginRight: theme.spacing(1),
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  paperDivider: {
    paddingTop: theme.spacing(4)
  }
});

const nodesTable = (nodes, classes, onRowClick) => {
  if (nodes && nodes.length > 0) {
    return (
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
        <TableBody>
          {nodes.map(node => {
            return (
              <TableRow
                key={node.id}
              >
                <TableCell onClick={() => onRowClick(node.id)}>{node.hostname}</TableCell>
                <TableCell onClick={() => onRowClick(node.id)}>{node.platform}</TableCell>
                <TableCell onClick={() => onRowClick(node.id)}>{node.fqdn}</TableCell>
                <TableCell onClick={() => onRowClick(node.id)}>{moment.duration(node.uptime).humanize()}</TableCell>
                <TableCell onClick={() => onRowClick(node.id)}>{moment(node.last_checkin, 'X').fromNow()}</TableCell>
                <TableCell
                  onClick={() => onRowClick(node.id)}>{buildRoleChips(node.roles, classes, node.id)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  } else {
    return (
      <div className={classes.contentWrapper}>
        <Typography color="textSecondary" align="center">
          No nodes found
        </Typography>
      </div>
    );
  }
};

const buildRoleChips = (arr, classes, key) => {
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

const buildNodePanel = (selectedNode, nodeData, classes) => {
  return (
    <AntTabs data={
      [{ label: 'World', content: 'hello World' }, { label: 'Hell', content: 'hello hell' }]
    }/>
  );
};

class NodesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  componentDidMount() {
    this.props.loadNodes();
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

  handleRowClick = (id) => {
    this.props.push("/nodes/" + id);
  };

  handleRefresh = (event) => {
    event.preventDefault();
    this.props.refreshNodes();
  };

  render() {
    const { classes, nodes, selectedNode, nodeData } = this.props;
    const { search } = this.state;

    const filteredNodes = NodeUtils.searchNodes(nodes, search);

    return (
      <MainLayoutComponent
        pageTitle="Nodes"
        subNavLinks={[{ label: "List", link: "/nodes/" }]}
        subNavActions={[]}
      >
        <Paper className={classes.contentPaper}>
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
          {nodesTable(filteredNodes, classes, this.handleRowClick)}
        </Paper>
        <div className={classes.paperDivider}/>
        <AntTabs/>
        {buildNodePanel(selectedNode, nodeData, classes)}
      </MainLayoutComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadNodes, refreshNodes, push }, dispatch);

const mapStateToProps = (state) => ({
  nodes: state.nodes.nodes,
  selectedNode: state.nodes.selectedNode,
  nodeData: state.nodes.nodeData
});

NodesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
  loadNodes: PropTypes.func.isRequired,
  refreshNodes: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NodesPage));