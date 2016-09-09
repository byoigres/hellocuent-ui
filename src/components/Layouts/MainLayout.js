import React, { Component, PropTypes } from 'react';

import Navbar from '../Navbar';

import flexboxgrid from 'flexboxgrid';
import styles from 'styles';

class MainLayout extends Component {
  render() {
    return (
      <div className={`${styles['main-layout']} ${flexboxgrid.container}`}>
        <Navbar
          title="Hellocuent"
          link="/movies"
        />
        <div className={`${flexboxgrid.row} ${flexboxgrid['center-xs']}`}>
          <div className={`${flexboxgrid['col-md-10']} ${styles['white-bg']}`}>
            {this.props.children}
          </div>
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
