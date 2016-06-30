import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class Header extends Component {
  render() {
    return (
      <h1 className={styles.header}>
        {this.props.text}
      </h1>
    );
  }
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
