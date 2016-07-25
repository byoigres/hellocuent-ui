import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class Button extends Component {
  render() {
    const { text, ...props } = this.props;

    return (
      <button
        className={styles.button}
        {...props}
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
};

export default Button;
