import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class AbsoluteMiddle extends Component {
  render() {
    const { children, adjustSize, vertical } = this.props;

    let classes = styles['absolute-middle'];

    if (adjustSize) {
      classes = `${classes} ${styles['width-height']}`;
    }

    if (vertical) {
      classes = `${classes} ${styles.vertical}`;
    }

    return (
      <div
        className={classes}
      >
        {children}
      </div>
    );
  }
}

AbsoluteMiddle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  adjustSize: PropTypes.bool,
  vertical: PropTypes.bool,
};

AbsoluteMiddle.defaultProps = {
  adjustSize: true,
  vertical: false,
};

export default AbsoluteMiddle;
