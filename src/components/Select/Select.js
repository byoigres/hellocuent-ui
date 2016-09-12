import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class Select
 extends Component {

  getValue() {
    return this.refs.select.value;
  }

  render() {
    const { items, placeholder, error, ...props } = this.props;

    let itemList = null;
    let errorContainer = null;

    if (items && items.length > 0) {
      itemList = items.map((item) => (
        <option
          key={item.id}
          data-value={item.id}
          value={item.id}
        >
          {item.text}
        </option>
      ));
    }

    if (error) {
      errorContainer = (
        <div className={styles['select-error']}>{error}</div>
      );
    }

    return (
      <div className={styles.select}>
        <div className={styles['select-container']}>
          <select
            className={styles['select-element']}
            {...props}
            ref="select"
            defaultValue=""
          >
            <option
              className={styles['select-item-placeholder']}
              disabled
              value=""
            >
              {placeholder}
            </option>
            {itemList}
          </select>
        </div>
        {errorContainer}
      </div>
    );
  }
}

Select.propTypes = {
  placeholder: PropTypes.string,
  items: PropTypes.array,
  error: PropTypes.string,
};

export default Select;
