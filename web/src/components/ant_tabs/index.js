import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from "prop-types";

const AntTabsParent = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTabItem = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
});

class AntTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };

    this.setValue = this.setValue.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  setValue = (value) => {
    this.setState({ value })
  };

  handleChange = (event, newValue) => {
    this.setValue(newValue);
  };

  render() {
    const { classes, data } = this.props;

    if (!data) {
      return (<div/>);
    }

    const { value } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabsParent value={value} onChange={this.handleChange}>
            {data.map(ele => {
              return (<AntTabItem label={ele.label} key={'tab_parent_' + ele.label}/>)
            })}
          </AntTabsParent>
          <div className={classes.content}>
            {data[value].content}
          </div>
        </div>
      </div>
    );
  }
}

AntTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(AntTabs);