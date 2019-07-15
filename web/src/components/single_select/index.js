import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { emphasize } from '@material-ui/core/styles';
import Select from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';
import components from './components'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

class SingleSelect extends Component {
  buildList = (values) => (
    values.map(v => {
      return ({ value: v, label: v });
    })
  );

  render() {
    const { selectedValue, availableValues, classes, label, onChange, placeholder } = this.props;
    const listComponents = this.buildList(availableValues);
    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            styles={styles}
            inputId="react-select-single"
            TextFieldProps={{
              label: label,
              InputLabelProps: {
                htmlFor: 'react-select-single',
                shrink: true,
              },
              placeholder: placeholder,
            }}
            options={listComponents}
            components={components}
            value={{ value: selectedValue, label: selectedValue }}
            onChange={onChange}
          />
        </NoSsr>
      </div>
    )
  }
}

SingleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  availableValues: PropTypes.array.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(SingleSelect)