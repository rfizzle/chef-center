import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import MainLayoutComponent from '../../components/layout/Main';
import { connect } from 'react-redux';
import { getRole, loadRoles, refreshRoles, updateRole } from '../../store/roles/actions';
import { bindActionCreators } from 'redux';
import RolesTable from './componenets/table'

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

class RolesPage extends Component {
  constructor(props) {
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.props.loadRoles();
  }

  handleRefresh = () => {
    this.props.refreshRoles();
  };

  handleRowClick = name => {
    this.props.getRole(name);
  };

  handleUpdate = (type, data) => {
    if (type === 'runlist') {
      this.props.updateRole(this.props.roleId, { run_list: data })
    }
  };

  render() {
    const { classes, roles, roleId } = this.props;

    return (
      <MainLayoutComponent
        pageTitle="Roles"
        subNavLinks={[{ label: "List", link: "/roles/" }]}
        subNavActions={[]}
      >
        <Paper className={classes.contentPaper}>
          {<RolesTable
            roles={roles}
            selectedRole={roleId}
            onRefresh={this.handleRefresh}
            onRowClick={this.handleRowClick}
          />}
        </Paper>
      </MainLayoutComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadRoles, refreshRoles, getRole, updateRole }, dispatch);

const mapStateToProps = (state) => ({
  roles: state.roles.roles,
  roleId: state.roles.roleId,
  roleData: state.roles.roleData,
  recipes: state.cookbooks.recipes,
});

RolesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  loadRoles: PropTypes.func.isRequired,
  refreshRoles: PropTypes.func.isRequired,
  getRole: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RolesPage));