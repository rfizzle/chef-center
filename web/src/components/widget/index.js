/* eslint-disable no-script-url */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import classNames from "classnames";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const styles = theme => ({
  widgetContext: {
    flex: 1,
  },
  fixedHeight: {
    height: 240,
  },
  title: {
    flexGrow: 1,
  },
  widgetBody: {
    padding: theme.spacing(2)
  },
  action: {
    textDecoration: 'none',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
    flex: 1,
  },
  flexCenter: {
    alignItems: 'center',
    align: 'center',
    alignSelf: 'center'
  }
});

class Widget extends Component {
  render() {
    const { classes, title, mainValue, subText, actionUrl, actionText, icon } = this.props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <div className={classes.flexRow}>
            <div className={classes.flexColumn}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h2" component="h2">
                  {mainValue}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {subText}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classNames(classes.button, classes.action)}
                  component={Link}
                  to={actionUrl}
                  color="inherit"
                  size="small"
                >
                  {actionText}
                </Button>
              </CardActions>
            </div>
            <div className={classNames(classes.flexColumn, classes.flexCenter)}>
              {icon}
            </div>
          </div>
        </Card>
      </React.Fragment>
    )
  }
}

Widget.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  mainValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subText: PropTypes.string.isRequired,
  actionUrl: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Widget)