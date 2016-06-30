import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render() {
    return (
      <h1>
        {this.props.text}
      </h1>
    );
  }
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
