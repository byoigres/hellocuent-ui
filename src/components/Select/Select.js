import React, { Component, PropTypes } from 'react';

import styles from 'styles';

class Select
 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      displayResults: false,
    };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  onSelectChange(e) {
    const text = e.target.value;

    this.setState({
      displayResults: text.length > 0,
    });
  }

  onItemClick(e) {
    const id = e.target.dataset.value;
    const selectedItem = this.props.items[id];

    this.setState({
      selectedItem,
    });

    this.refs.select.value = selectedItem.text;
    this.close();
  }

  render() {
    const { items, ...props } = this.props;

    let resultBoxStyles = styles['autocomplete-result-box'];
    let itemList = null;

    if (items !== undefined && Object.keys(items).length > 0) {
      itemList = Object.keys(items).map((item) => (
        <option
          key={items[item].id}
          data-value={items[item].id}
          onClick={this.onItemClick}
        >
          {items[item].text}
        </option>
      ));
    }

    if (!this.state.displayResults) {
      resultBoxStyles = `${resultBoxStyles} ${styles['autocomplete-result-box-hide']}`;
    }

    return (
      <div className={styles['select-container']}>
        <select
          className={styles['select-element']}
          {...props}
          onChange={this.onSelectChange}
          ref="select"
          defaultValue=""
        >
          <option
            className={styles['select-item-placeholder']}
            disabled
            value=""
          >
            Title Language
          </option>
          {itemList}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  items: PropTypes.object,
};

export default Select;
