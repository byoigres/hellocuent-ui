import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import flexboxgrid from 'flexboxgrid';
import styles from 'styles';

class Navbar extends Component {
  render() {
    return (
      <div className={styles.navbar}>
        <div className={flexboxgrid.container}>
          <div className={styles['navbar-brand']}>
            <Link to={this.props.link}>{this.props.title}</Link>
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
