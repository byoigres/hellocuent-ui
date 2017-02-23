import React, { Component, PropTypes } from 'react';
import styles from 'styles';

import TextBox from '../TextBox';

class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      displayResults: false,
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.close = this.close.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  componentWillReceiveProps(props, next) {
    console.log('componentWillReceiveProps', props, next);
  }

  onTextChange(e) {
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

    this.input.value = selectedItem.text;
    this.close();
  }

  close() {
    this.setState({
      displayResults: false,
    });
  }

  render() {
    const { items, ...props } = this.props;

    let itemList = null;
    let resultBoxStyles = styles['autocomplete-result-box'];

    if (items !== undefined && Object.keys(items).length > 0) {
      itemList = Object.keys(items).map(item => (
        <li
          key={items[item].id}
          data-value={items[item].id}
          onClick={this.onItemClick}
        >
          {items[item].text}
        </li>
      ));
    }

    if (!this.state.displayResults) {
      resultBoxStyles = `${resultBoxStyles} ${styles['autocomplete-result-box-hide']}`;
    }

    return (
      <div className={styles.autocomplete}>
        <TextBox
          {...props}
          onChange={this.onTextChange}
          ref={r => this.input = r}
        />
        <ul className={resultBoxStyles}>
          {itemList}
        </ul>
      </div>
    );
  }
}

Autocomplete.propTypes = {
  items: PropTypes.object,
};

export default Autocomplete;
