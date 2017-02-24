import React, { PropTypes } from 'react';

import styles from 'styles';

const Modal = ({ children }) => (
  <div className={styles.modal}>
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-dialog']}>
        <div className={styles['modal-content']}>
          <div className={styles['modal-header']}>
            Title
          </div>
          <div className={styles['modal-body']}>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
