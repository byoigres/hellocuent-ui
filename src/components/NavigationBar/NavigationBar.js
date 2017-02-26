import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from 'styles';

const NavigationBar = ({ items, separator, selectedIndex }) => (
  <div className={styles['navigation-bar']}>
    {items.map((item, index) => (
      <span
        key={index}
        className={
          (index + 1) === selectedIndex ? styles['navigation-bar-selected-item'] : ''
        }
      >
        {
          item.href ? <Link to={item.href} onClick={item.onClick}>{item.text}</Link> : item.text
        }
        {' '}
        {
          `${(index + 1) < items.length ? separator : ''}`
        }
        {' '}
      </span>
    ))}
  </div>
);

NavigationBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIndex: PropTypes.number,
  separator: PropTypes.string,
};

NavigationBar.defaultProps = {
  selectedIndex: 1,
  separator: '/',
};

export default NavigationBar;
