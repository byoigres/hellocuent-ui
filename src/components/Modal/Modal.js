import React, { PropTypes } from 'react';

import styles from 'styles';

const Modal = ({ children, title }) => (
  <div className={styles.modal}>
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-dialog']}>
        <div className={styles['modal-content']}>
          <div className={styles['modal-header']}>
            {title}
          </div>
          <div className={styles['modal-body']}>
            {children}
          </div>
          <div className={styles['modal-actions']}>
            <button>Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: null,
};

export default Modal;
