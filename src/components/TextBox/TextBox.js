import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class TextBox extends Component {
  getValue() {
    return this.refs.input.value;
  }

  render() {
    const { text, leftText, error, ...props } = this.props;
    console.log('error', error);
    let textboxStyles = styles['textbox-input'];
    let leftContainer = null;
    let errorContainer = null;

    if (leftText) {
      leftContainer = (
        <span className={styles['left-textbox-content']}>{leftText}</span>
      );

      textboxStyles = `${textboxStyles} ${styles['textbox-input-with-left-content']}`;
    }

    if (error) {
      textboxStyles = `${textboxStyles} ${styles['textbox-input-error']}`;
      errorContainer = (
        <div className={styles['textbox-error']}>{error}</div>
      );
    }

    return (
      <div className={`${styles.textbox} ${styles['textbox-error']}`}>
        <div className={styles['textbox-container']}>
          {leftContainer}
          <input
            className={textboxStyles}
            type="text"
            {...props}
            ref="input"
            value={text}
          />
        </div>
        {errorContainer}
      </div>
    );
  }
}

TextBox.propTypes = {
  text: PropTypes.string,
  leftText: PropTypes.string,
  error: PropTypes.string,
};

export default TextBox;