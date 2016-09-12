import React, { Component, PropTypes } from 'react';

import flexboxgrid from 'flexboxgrid';
import styles from 'styles';

class MainLayout extends Component {
  render() {
    return (
      <div className={`${styles['clean-layout']} ${flexboxgrid.container}`}>
        <div className={`${flexboxgrid.row} ${flexboxgrid['center-xs']}`}>
          <div className={flexboxgrid['col-md-12']}>
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
