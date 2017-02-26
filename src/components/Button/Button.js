import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from 'styles';

class Button extends Component {
  render() {
    const { text, link, block, primary, ...props } = this.props;
    let buttonStyles = styles.button;

    if (block) {
      buttonStyles = `${buttonStyles} ${styles['button-block']}`;
    }

    if (primary) {
      buttonStyles = `${buttonStyles} ${styles.primary}`;
    }

    let component = (
      <button
        className={buttonStyles}
        {...props}
      >
        {text}
      </button>
    );

    if (link) {
      component = (
        <Link
          to={link}
          className={buttonStyles}
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
  block: PropTypes.bool,
  primary: PropTypes.bool,
  link: PropTypes.string,
};

Button.defaultProps = {
  block: false,
  primary: false,
  link: null,
};


export default Button;
