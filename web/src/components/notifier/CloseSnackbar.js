import React from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import withStyles from '@material-ui/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

const styles = {
  icon: {
    position: '20px',
  },
};

function CloseSnackbar({ classes }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      aria-label="Close"
      color="inherit"
      onClick={() => {
        closeSnackbar();
      }}
    >
      <CloseIcon className={classes.icon}/>
    </IconButton>
  );
}

CloseSnackbar.propTypes = {
  classes: PropTypes.object.isRequired /* From withStyles */,
};

export default withStyles(styles)(CloseSnackbar);