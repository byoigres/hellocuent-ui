import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class TextBox extends Component {
  getValue() {
    return this.input.value;
  }

  render() {
    const { text, leftText, error, ...props } = this.props;
    let textboxStyles = styles['textbox-input'];
    let leftContainer = null;
    let errorContainer = null;

    if (leftText) {
      leftContainer = (
        <span className={`${styles['left-textbox-content']}${error ? ` ${styles['textbox-input-error']}` : ''}`}>{leftText}</span>
      );

      textboxStyles = `${textboxStyles} ${styles['textbox-input-with-left-content']}`;
    }

    if (error) {
      textboxStyles = `${textboxStyles} ${styles['textbox-input-error']}`;
      errorContainer = (
        <span className={styles['textbox-error']}>{error}</span>
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
            ref={input => this.input = input}
            defaultValue={text}
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

TextBox.defaultProps = {
  text: '',
  leftText: null,
  error: null,
};


export default TextBox;
