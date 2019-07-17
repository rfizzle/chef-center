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
  }
});

class RunListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run_list: props.run_list,
      roles: _.difference(props.roles, props.run_list),
      recipes: _.difference(props.recipes, props.run_list)
    }
  }

  itemRow = (item) => {
    return (
      <TableRow
        className={this.props.classes.clickable}
        onClick={() => {console.log(item)}}
        key={item}
      >
        <TableCell>
          {item}
        </TableCell>
      </TableRow>
    );
  };

  buildItemRows = (items) => {
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
      items.map(i => this.itemRow(i))
    );
  };

  render() {
    const { classes } = this.props;
    const { run_list, roles, recipes } = this.state;

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} md={6}>
            <Paper className={classes.contentPaper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Roles</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Table>
                <TableBody>
                  {this.buildItemRows(roles)}
                </TableBody>
              </Table>
            </Paper>
            <div className={classes.paperDivider}/>
            <Paper className={classes.contentPaper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Recipes</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Table>
                <TableBody>
                  {this.buildItemRows(recipes)}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={6} md={6}>
            <Paper className={classes.contentPaper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Run List</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Table>
                <TableBody>
                  {this.buildItemRows(run_list)}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

RunListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  run_list: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  recipes: PropTypes.array.isRequired,
};

export default (withStyles(styles)(RunListTable));
;