import React, { ErrorInfo } from 'react';

/**
 * React error boundary enclosing the entire application.
 * Smaller components in the app should have their own error boundaries as appropriate.
 * Any uncaught rendering/React lifecycle errors will be handled here.
 * https://reactjs.org/docs/error-boundaries.html
 * @extends React.Component
 */
export default class GlobalErrorBoundary extends React.Component<
  any,
  { hasError: Boolean; error?: Error; errorInfo?: ErrorInfo }
> {
  state = {
    hasError: false,
    error: undefined,
    errorInfo: undefined,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    // Set renderErrorView to null to swallow the error instead of crashing the page
    if (this.state.hasError) {
      return <div>error:{this.state.error}</div>;
    }
    return this.props.children;
  }
}

