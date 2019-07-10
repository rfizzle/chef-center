import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = _theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    listStyle: 'none',
    margin: '0',
    padding: '0 36px 0',
    height: '100%',
  },
  leftContent: {
    flex: 1,
  },
  centerContent: {
    flexGrow: 1,
    textAlign: 'center',
  },
  rightContent: {
    flex: 1,
    textAlign: 'right',
  }
});

class FooterComponent extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.leftContent}>
          <Typography variant="body1">Footer Text</Typography>
        </div>
        <div className={classes.centerContent}>
          <Typography variant="body1">Footer Text</Typography>
        </div>
        <div className={classes.rightContent}>
          <Typography variant="body1">Footer Text</Typography>
        </div>
      </div>
    );
  }

}

FooterComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterComponent);