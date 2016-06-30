import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class TextBox extends Component {
  render() {
    const { text, ...props } = this.props;

    return (
      <div className={styles.textbox}>
        <input
          className={styles['textbox-input']}
          type="text"
          {...props}
          value={text}
        />
      </div>
    );
  }
}

TextBox.propTypes = {
  text: PropTypes.string,
};

export default TextBox;
