import React, { PropTypes } from 'react';

import styles from 'styles';

const Thumbnail = ({ children }) => (
  <div className={styles['thumbnail-container']}>
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-children']}>
        {children}
      </div>
    </div>
  </div>
);

Thumbnail.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Thumbnail;
