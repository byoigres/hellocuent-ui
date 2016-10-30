import React, { Component, PropTypes } from 'react';
import TextBox from '../TextBox';
import Button from '../Button';

import styles from 'styles';

class EditBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayControls: false,
      error: '',
    };
    this.internalOnEditClick = this.internalOnEditClick.bind(this);
    this.internalOnCancelClick = this.internalOnCancelClick.bind(this);
    this.internalSaveClick = this.internalSaveClick.bind(this);
  }

  internalOnCancelClick() {
    if (typeof this.props.onCancelClick === 'function') {
      this.props.onCancelClick();
    }

    this.setState({
      displayControls: false,
      error: '',
    });
  }

  /* eslint consistent-return: 0*/
  internalSaveClick() {
    const value = this.editInput.getValue();

    if (typeof value === 'string' && value.length === 0) {
      this.editInput.input.focus();

      return this.setState({
        error: 'Provide a value',
      });
    }

    this.props.onSaveClick(value);

    this.setState({
      displayControls: false,
    });
  }

  internalOnEditClick() {
    if (typeof this.props.onEditClick === 'function') {
      this.props.onEditClick();
    }

    this.setState({
      displayControls: true,
    });
  }

  renderButton() {
    const { text, loading, loadingText } = this.props;

    return (
      <Button
        text={loading ? loadingText : text}
        disabled={loading}
        onClick={this.internalOnEditClick}
      />
    );
  }

  renderControls() {
    return (
      <div className={styles.editbox}>
        <div className={styles['editbox-edit-field']}>
          <TextBox
            ref={(input) => this.editInput = input}
            error={this.state.error}
          />
        </div>
        <div className={styles['editbox-edit-actions']}>
          <Button
            text={this.props.cancelText}
            onClick={this.internalOnCancelClick}
          />
          <Button
            text={this.props.saveText}
            onClick={this.internalSaveClick}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.displayControls) {
      return this.renderControls();
    }

    return this.renderButton();
  }
}

EditBox.propTypes = {
  saveText: PropTypes.string,
  cancelText: PropTypes.string,
  text: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  onEditClick: PropTypes.func,
  onSaveClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func,
};

EditBox.defaultProps = {
  saveText: 'Save',
  cancelText: 'Cancel',
  text: 'Edit',
  loading: false,
  loadingText: 'Loading...',
};

export default EditBox;
