import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class MainLayout extends Component {
  render() {
    return (
      <div className={styles['clean-layout']}>
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
  store: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default MainLayout;
