import React, { Component, PropTypes } from 'react';

import flexboxgrid from 'flexboxgrid';
import styles from 'styles';

class Navbar extends Component {
  render() {
    return (
      <div className={styles.navbar}>
        <div className={flexboxgrid.container}>
          <div className={styles['navbar-brand']}>
            <a href="#">{this.props.title}</a>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
