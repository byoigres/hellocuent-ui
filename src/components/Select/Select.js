import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class Select
 extends Component {

  getValue() {
    return this.refs.select.value;
  }

  render() {
    const { items, placeholder, ...props } = this.props;

    let itemList = null;

    if (items !== undefined && items.length > 0) {
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

    return (
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
    );
  }
}

Select.propTypes = {
  placeholder: PropTypes.string,
  items: PropTypes.array,
};

export default Select;
