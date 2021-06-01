import React from 'react';

class NotFound extends React.PureComponent<{ location: Location }> {
  render() {
    const { location } = this.props;
    const { pathname } = location;
    let text: any = (
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    );
    if (pathname === '/') {
      text = '';
    }
    return <div>{text}</div>;
  }
}
export default NotFound;
