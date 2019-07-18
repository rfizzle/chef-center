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
import { loadRoles, refreshRoles } from '../store/roles/actions';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import RoleUtils from '../utils/RoleUtils'
import Chip from "@material-ui/core/Chip";
import classNames from "classnames";

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
  }
});

const rolesTable = (roles, classes) => {
  if (roles && roles.length > 0) {
    return (
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.tableRow}>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Run List</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map(role => {
            return (
              <TableRow key={role.name}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{buildRunListChips(role.run_list, classes, role.name)}</TableCell>
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
          No roles found
        </Typography>
      </div>
    );
  }
};

const buildRunListChips = (arr, classes, key) => {
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

class RolesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    this.props.loadRoles();
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
    this.props.refreshRoles();
  };

  render() {
    const { classes, roles } = this.props;
    const { search } = this.state;

    const filteredRoles = RoleUtils.searchRoles(roles, search);

    return (
      <MainLayoutComponent
        pageTitle="Roles"
        subNavLinks={[{ label: "List", link: "/roles/" }]}
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
          {rolesTable(filteredRoles, classes)}
        </Paper>
      </MainLayoutComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadRoles, refreshRoles }, dispatch);

const mapStateToProps = (state) => ({
  roles: state.roles.roles,
});

RolesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  loadRoles: PropTypes.func.isRequired,
  refreshRoles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RolesPage));