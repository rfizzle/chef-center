import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import MainLayoutComponent from '../../components/layout/Main';
import { connect } from 'react-redux';
import { getClient, loadClients, refreshClients } from '../../store/clients/actions';
import { bindActionCreators } from 'redux';
import ClientsTable from './components/table';
import ClientEdit from './components/edit'
import { enqueueSnackbar } from "../../store/application/actions";

const styles = theme => ({
  contentPaper: {
    margin: 'auto',
    overflow: 'hidden',
  },
  paperDivider: {
    paddingTop: theme.spacing(4)
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

class ClientsPage extends Component {
  constructor(props) {
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  componentDidMount() {
    this.props.loadClients();
  }

  handleRefresh = () => {
    this.props.refreshClients();
  };

  handleRowClick = id => {
    this.props.getClient(id);
  };

  render() {
    const { classes, clients, clientId, clientData, recipes } = this.props;

    return (
      <MainLayoutComponent
        pageTitle="Clients"
        subNavLinks={[{ label: "List", link: "/clients/" }]}
        subNavActions={[]}
      >
        <Paper className={classes.contentPaper}>
          {<ClientsTable
            clients={clients}
            selectedClient={clientId}
            onRefresh={this.handleRefresh}
            onRowClick={this.handleRowClick}
          />}
        </Paper>
        <div className={classes.paperDivider}/>
        {
          clientData &&
          <ClientEdit
            clientId={clientId}
            clientData={clientData}
            onUpdate={this.handleUpdate}
            clients={clients}
            recipes={recipes}
            onError={this.props.enqueueSnackbar}
          />
        }
      </MainLayoutComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadClients,
  refreshClients,
  getClient,
  enqueueSnackbar
}, dispatch);

const mapStateToProps = (state) => ({
  clients: state.clients.clients,
  clientId: state.clients.clientId,
  clientData: state.clients.clientData,
  recipes: state.cookbooks.recipes,
});

ClientsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired,
  loadClients: PropTypes.func.isRequired,
  refreshClients: PropTypes.func.isRequired,
  getClient: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClientsPage));