import React, { PropTypes } from 'react';
import Button from 'components/Button';
import styles from 'styles';

const Modal = ({
  children,
  title,
  cancelText,
  okText,
}) => (
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
            <Button
              text={cancelText}
            />
            <Button
              text={okText}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
};

Modal.defaultProps = {
  title: null,
  cancelText: 'Cancel',
  okText: 'OK',
};

export default Modal;
