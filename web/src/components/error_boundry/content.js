import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContentErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(_error, _info) {
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

ContentErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ContentErrorBoundary;