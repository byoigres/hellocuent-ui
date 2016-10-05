import React, { PropTypes } from 'react';

import styles from 'styles';

const AbsoluteMiddle = ({ children, adjustSize }) => (
  <div
    className={
      `${styles['absolute-middle']}${adjustSize ? ` ${styles['width-height']}` : ''}`
    }
  >
    {children}
  </div>
);

AbsoluteMiddle.propTypes = {
  children: PropTypes.object.isRequired,
  adjustSize: PropTypes.bool,
};

AbsoluteMiddle.defaultProps = {
  adjustSize: true,
};

export default AbsoluteMiddle;
