import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from 'styles';

class Button extends Component {
  render() {
    const { text, link, block, ...props } = this.props;
    let buttonStyles = styles.button;

    if (block) {
      buttonStyles = `${buttonStyles} ${styles['button-block']}`;
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
  link: PropTypes.string,
};

Button.defaultProps = {
  block: false,
  link: null,
};


export default Button;
