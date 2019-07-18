import React, { Component } from "react";
import _ from 'lodash';
import { Grid, withStyles } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Clear"

const styles = theme => ({
  contentPaper: {
    margin: 'auto',
    overflow: 'hidden',
  },
  paperDivider: {
    paddingTop: theme.spacing(4)
  },
  muted: {
    color: theme.palette.common.normal.grey
  },
  clickable: {
    cursor: 'pointer'
  },
  tableBodyParent: {
    overflow: 'auto',
    maxHeight: theme.spacing(50),
  },
  tableBody: {
    overflowY: 'scroll',
  },
});

class RunListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runList: props.runList,
      roles: _.difference(props.roles, props.runList),
      recipes: _.difference(props.recipes, props.runList)
    };

    this.itemRow = this.itemRow.bind(this);
    this.buildItemRows = this.buildItemRows.bind(this);
    this.addToRunList = this.addToRunList.bind(this);
    this.removeFromRunList = this.removeFromRunList.bind(this);
  }

  itemRow = (item, type, handleClick) => {
    return (
      <TableRow
        className={this.props.classes.clickable}
        onClick={() => handleClick(item)}
        key={item}
      >
        <TableCell>
          {item}
        </TableCell>
        <TableCell align="right">
          {_.isEqual(type, 'add') ? <AddIcon/> : <RemoveIcon/>}
        </TableCell>
      </TableRow>
    );
  };

  buildItemRows = (items, type = 'add', handleClick) => {
    if (items.length === 0) {
      return (
        <TableRow>
          <TableCell className={this.props.classes.muted}>
            None
          </TableCell>
        </TableRow>
      )
    }
    return (
      items.map(i => this.itemRow(i, type, handleClick))
    );
  };

  addToRunList = (item) => {
    const newRunList = _.uniq(_.concat(this.state.runList, item));
    this.setState({
      runList: newRunList,
      roles: _.difference(this.props.roles, newRunList),
      recipes: _.difference(this.props.recipes, newRunList)
    });
    this.props.onChange('runlist', newRunList);
  };

  removeFromRunList = (item) => {
    const newRunList = _.uniq(_.filter(this.state.runList, (i) => { return !(_.isEqual(i, item)); }));
    this.setState({
      runList: newRunList,
      roles: _.difference(this.props.roles, newRunList),
      recipes: _.difference(this.props.recipes, newRunList)
    });
    this.props.onChange('runlist', newRunList);
  };

  render() {
    const { classes } = this.props;
    const { runList, roles, recipes } = this.state;

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} md={6}>
            <Paper className={classes.contentPaper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Roles</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
              </Table>
              <div className={classes.tableBodyParent}>
                <Table>
                  <TableBody className={classes.tableBody}>
                    {this.buildItemRows(roles, 'add', this.addToRunList)}
                  </TableBody>
                </Table>
              </div>
            </Paper>
            <div className={classes.paperDivider}/>
            <Paper className={classes.contentPaper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Recipes</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
              </Table>
              <div className={classes.tableBodyParent}>
                <Table>
                  <TableBody className={classes.tableBody}>
                    {this.buildItemRows(recipes, 'add', this.addToRunList)}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} md={6}>
            <Paper className={classes.contentPaper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Run List</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
              </Table>
              <div className={classes.tableBodyParent}>
                <Table>
                  <TableBody className={classes.tableBody}>
                    {this.buildItemRows(runList, 'remove', this.removeFromRunList)}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

RunListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  runList: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  recipes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default (withStyles(styles)(RunListTable));