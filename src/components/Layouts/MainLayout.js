import React, { Component, PropTypes } from 'react';

import Navbar from '../Navbar';

import styles from 'styles';

class MainLayout extends Component {
  render() {
    return (
      <div className={styles['main-layout']}>
        <Navbar
          title="Hellocuent"
          link="/movies"
        />
        <div className={styles['main-layout-container']}>
            {this.props.children}
        </div>

      </div>
    );
  }
}

MainLayout.displayName = 'MainLayout';

MainLayout.propTypes = {
  children: PropTypes.element,
};

MainLayout.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default MainLayout;
