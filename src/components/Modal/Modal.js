import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import styles from 'styles';

class Modal extends Component {

  componentWillMount() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  }

  render() {
    const {
      children,
      title,
      cancelText,
      okText,
      isOpen,
      onCancel,
      onSuccess,
    } = this.props;

    const body = document.querySelector('body');

    if (isOpen) {
      body.style.overflow = 'hidden';

      return (
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
                    onClick={onCancel}
                  />
                  <Button
                    text={okText}
                    primary
                    onClick={onSuccess}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    body.style.overflow = 'auto';

    return null;
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

Modal.defaultProps = {
  title: null,
  cancelText: 'Cancel',
  okText: 'OK',
  isOpen: false,
};

export default Modal;
