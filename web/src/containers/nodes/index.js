import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import MainLayoutComponent from '../../components/layout/Main';
import { connect } from 'react-redux';
import { getNode, loadNodes, refreshNodes } from '../../store/nodes/actions';
import { bindActionCreators } from 'redux';
import NodesTable from './components/table'
import NodeEdit from './components/edit'

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
  }

  componentDidMount() {
    this.props.loadNodes();
  }

  handleRefresh() {
    this.props.refreshNodes();
  }

  handleRowClick = (id) => {
    this.props.getNode(id);
    // this.props.push("/nodes/" + id);
  };

  handleUpdate = () => {

  };

  render() {
    const { classes, nodes, nodeId, nodeData } = this.props;

    return (
      <MainLayoutComponent
        pageTitle="Nodes"
        subNavLinks={[{ label: "List", link: "/nodes/" }]}
        subNavActions={[]}>
        <Paper className={classes.contentPaper}>
          <NodesTable nodes={nodes} selectedNode={nodeId} onRowClick={this.handleRowClick}
                      onRefresh={this.handleRefresh}/>
        </Paper>
        <div className={classes.paperDivider}/>
        {
          nodeData &&
          <NodeEdit
            nodeId={nodeId}
            nodeData={nodeData}
            onUpdate={() => {
            }}
          />
        }
      </MainLayoutComponent>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loadNodes, refreshNodes, getNode }, dispatch);

const mapStateToProps = (state) => ({
  nodes: state.nodes.nodes,
  nodeId: state.nodes.nodeId,
  nodeData: state.nodes.nodeData
});

NodesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  nodes: PropTypes.array.isRequired,
  loadNodes: PropTypes.func.isRequired,
  refreshNodes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NodesPage));