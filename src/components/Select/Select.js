import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class Select
 extends Component {

  getValue() {
    return this.select.value;
  }

  render() {
    const { items, placeholder, error, ...props } = this.props;

    let itemList = null;
    let errorContainer = null;
    let selectStyles = styles['select-element'];

    if (items && items.length > 0) {
      itemList = items.map(item => (
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
      selectStyles = `${selectStyles} ${styles['select-input-error']}`;
      errorContainer = (
        <span className={styles['select-error']}>{error}</span>
      );
    }

    return (
      <div className={styles.select}>
        <div className={styles['select-container']}>
          <select
            className={selectStyles}
            {...props}
            ref={r => this.select = r}
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

Select.defaultProps = {
  placeholder: '',
  items: [],
  error: null,
};

export default Select;
