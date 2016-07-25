import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class TextBox extends Component {
  render() {
    const { text, leftText, ...props } = this.props;
    let textboxStyles = styles['textbox-input'];
    let leftContainer = null;

    if (leftText) {
      leftContainer = (
        <span className={styles['left-textbox-content']}>{leftText}</span>
      );

      textboxStyles = `${textboxStyles} ${styles['textbox-input-with-left-content']}`;
    }

    return (
      <div className={styles.textbox}>
        {leftContainer}
        <input
          className={textboxStyles}
          type="text"
          {...props}
          ref="input"
          value={text}
        />
      </div>
    );
  }

  getValue() {
    return this.refs.input.value;
  }
}

TextBox.propTypes = {
  text: PropTypes.string,
  leftText: PropTypes.string,
};

export default TextBox;
