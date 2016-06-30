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
        />
        {this.props.children}
      </div>
    );
  }
}

MainLayout.displayName = 'MainLayout';

MainLayout.propTypes = {
  children: PropTypes.element,
};

MainLayout.contextTypes = {
  store: PropTypes.object,
};

export default MainLayout;
