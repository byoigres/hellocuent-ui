import React, { Component, PropTypes } from 'react';
import Button from 'components/Button';
import styles from 'styles';

class Modal extends Component {

  componentWillMount() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  }

  componentWillUnount() {
    const body = document.querySelector('body');
    body.style.overflow = 'auto';
  }

  render() {
    const {
      children,
      title,
      cancelText,
      okText,
    } = this.props;

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
                />
                <Button
                  text={okText}
                  primary
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
