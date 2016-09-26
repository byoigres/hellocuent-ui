import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from 'styles';

class Navbar extends Component {
  render() {
    return (
      <div className={styles.navbar}>
        <div className={styles['navbar-container']}>
          <div className={styles['navbar-brand']}>
            <Link to={this.props.link}>{this.props.title}</Link>
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Search" />
          </div>
          <div className="navbar-list">
            <Link className="navbar-item" to={'/auth/login'}>LOGIN</Link>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Navbar;
