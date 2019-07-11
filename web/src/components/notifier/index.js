import { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from '../../store/application/actions';
import * as _ from 'lodash';

class Notifier extends Component {
  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate(nextProps, _nextState, _nextContext) {
    let newSnacks = nextProps.notifications;
    let currentSnacks = this.props.notifications;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i++) {
      if (notExists) continue;
      notExists = notExists || !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate(_prevProps, _prevState, _snapshot) {
    const { notifications = [] } = this.props;
    const defaultOptions = {};
    notifications.forEach(notification => {

      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;

      // Display snackbar using notistack
      this.props.enqueueSnackbar(notification.message, _.merge(notification.options, defaultOptions));

      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);

      // Dispatch action to remove snackbar from redux store
      this.props.removeSnackbar(notification.key);
    });
  }

  render() {
    return null;
  }
}

Notifier.propTypes = {
  notifications: PropTypes.array.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  removeSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  notifications: store.application.notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSnackbar(Notifier));
