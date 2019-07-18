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
import { loadCookbooks, refreshCookbooks } from '../store/cookbooks/actions';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import CookbookUtils from '../utils/CookbookUtils';

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
  }
});

const cookbooksTable = (cookbooks, classes) => {
  if (cookbooks && cookbooks.length > 0) {
    return (
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.tableRow}>
            <TableCell>Name</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cookbooks.map(cookbook => {
            return (
              <TableRow key={cookbook.name}>
                <TableCell>{cookbook.name}</TableCell>
                <TableCell>{cookbook.version}</TableCell>
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
          No cookbooks found
        </Typography>
      </div>
    );
  }
};

class CookbooksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    this.props.loadCookbooks();
  }

  handleSearch = (event) => {
    let searchVal = event.target.value;
    if (searchVal) {
      // Do search
      this.setState({
        ...this.state,
        search: searchVal,
        cookbooks: this.props.cookbooks,
      });
    } else {
      this.setState({
        ...this.state,
        search: '',
        cookbooks: this.props.cookbooks,
      });
    }
  };

  handleRefresh = (event) => {
    event.preventDefault();
    this.props.refreshCookbooks();
  };

  render() {
    const { classes, cookbooks } = this.props;
    const { search } = this.state;

    const filteredCookbooks = CookbookUtils.searchCookbooks(cookbooks, search);

    return (
      <MainLayoutComponent
        pageTitle="Cookbooks"
        subNavLinks={[{ label: 'List', link: '/cookbooks/' }]}
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
                    placeholder="Search by name or version"
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
          {cookbooksTable(filteredCookbooks, classes)}
        </Paper>
      </MainLayoutComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadCookbooks, refreshCookbooks }, dispatch);

const mapStateToProps = (state) => ({
  cookbooks: state.cookbooks.cookbooks,
});

CookbooksPage.propTypes = {
  classes: PropTypes.object.isRequired,
  cookbooks: PropTypes.array.isRequired,
  loadCookbooks: PropTypes.func.isRequired,
  refreshCookbooks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CookbooksPage));