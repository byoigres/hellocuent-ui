import React, { PropTypes } from 'react';

import styles from 'styles';

const Modal = ({ children }) => (
  <div className={styles.modal}>
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-children']}>
        {children}
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
