import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from 'styles';

class Button extends Component {
  render() {
    const { text, link, ...props } = this.props;

    let component = (
      <button
        className={styles.button}
        {...props}
      >
        {text}
      </button>
    );

    if (link) {
      component = (
        <Link
          to={link}
          className={styles.button}
          {...props}
        >
          {text}
        </Link>
      );
    }

    return component;
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default Button;
