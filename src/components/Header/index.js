import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class Header extends Component {
  getContent() {
    let content = this.props.text;

    if ((typeof this.props.subtext === 'string' && this.props.subtext.length > 0) ||
      this.props.subtext !== null) {
      content = (
        <span>
          {content}
          <span>&nbsp;/&nbsp;</span>
          <small>
            {this.props.subtext}
          </small>
        </span>
      );
    }

    return content;
  }

  getLevelElement() {
    switch (this.props.level) {
      case 2:
        return (<h2 className={styles.header}>{this.getContent()}</h2>);
      case 3:
        return (<h3 className={styles.header}>{this.getContent()}</h3>);
      case 4:
        return (<h4 className={styles.header}>{this.getContent()}</h4>);
      default:
        return (<h1 className={styles.header}>{this.getContent()}</h1>);
    }
  }

  render() {
    return this.getLevelElement();
    /*
    return (
      <h1 className={styles.header}>
        {this.props.text}
      </h1>
    );
    */
  }
}

Header.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  level: PropTypes.number,
  subtext: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

Header.defaultProps = {
  level: 1,
};

export default Header;
