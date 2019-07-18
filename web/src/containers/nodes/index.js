import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import MainLayoutComponent from '../../components/layout/Main';
import { connect } from 'react-redux';
import { clearCurrentNode, getNode, loadNodes, refreshNodes, updateNode } from '../../store/nodes/actions';
import { bindActionCreators } from 'redux';
import NodesTable from './components/table'
import NodeEdit from './components/edit'
import { enqueueSnackbar } from "../../store/application/actions";

const styles = theme => ({
  contentPaper: {
    margin: 'auto',
    overflow: 'hidden',
  },
  paperDivider: {
    paddingTop: theme.spacing(4)
  }
});

class NodesPage extends Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.props.loadNodes();
  }

  handleRefresh() {
    this.props.refreshNodes();
  }

  handleRowClick = (id) => {
    if (id !== this.props.nodeId) {
      this.props.clearCurrentNode();
      this.props.getNode(id);
    }
  };

  handleUpdate = (type, data) => {
    if (type === 'runlist') {
      this.props.updateNode(this.props.nodeId, { run_list: data })
    } else if (type === 'environment') {
      this.props.updateNode(this.props.nodeId, { chef_environment: data })
    } else if (type === 'attributes') {
      this.props.updateNode(this.props.nodeId, data)
    }
  };

  render() {
    const { classes, nodes, nodeId, nodeData, roles, recipes, environments } = this.props;

    return (
      <MainLayoutComponent
        pageTitle="Nodes"
        subNavLinks={[{ label: "List", link: "/nodes/" }]}
        subNavActions={[]}>
        <Paper className={classes.contentPaper}>
          <NodesTable
            nodes={nodes}
            selectedNode={nodeId}
            onRowClick={this.handleRowClick}
            onRefresh={this.handleRefresh}
          />
        </Paper>
        <div className={classes.paperDivider}/>
        {
          nodeData &&
          <NodeEdit
            nodeId={nodeId}
            nodeData={nodeData}
            onUpdate={this.handleUpdate}
            roles={roles}
            recipes={recipes}
            environments={environments}
            onError={this.props.enqueueSnackbar}
            key={nodeId}
          />
        }
      </MainLayoutComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loadNodes,
  refreshNodes,
  getNode,
  updateNode,
  enqueueSnackbar,
  clearCurrentNode
}, dispatch);

const mapStateToProps = (state) => ({
  nodes: state.nodes.nodes,
  nodeId: state.nodes.nodeId,
  nodeData: state.nodes.nodeData,
  roles: state.roles.roles,
  recipes: state.cookbooks.recipes,
  environments: state.environments.environments,
});

NodesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
  loadNodes: PropTypes.func.isRequired,
  refreshNodes: PropTypes.func.isRequired,
  updateNode: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NodesPage));