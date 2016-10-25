import React, { Component, PropTypes } from 'react';
import TextBox from '../TextBox';
import Button from '../Button';

// import styles from 'styles';

class EditlanguageTranslation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayControls: false,
    };
    this.addTranslationClick = this.addTranslationClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.saveClick = this.saveClick.bind(this);
  }

  addTranslationClick() {
    this.setState({
      displayControls: true,
    });
  }

  saveClick() {
    this.props.saveFunction(this.editInput.getValue());

    this.setState({
      displayControls: false,
    });
  }

  cancelClick() {
    this.setState({
      displayControls: false,
    });
  }

  renderButton() {
    return (
      <Button
        text="Add translation"
        onClick={this.addTranslationClick}
      />
    );
  }

  renderControls() {
    return (
      <div>
        <div>
          <TextBox ref={(input) => this.editInput = input} />
          <Button
            text="Cancel"
            onClick={this.cancelClick}
          />
          <Button
            text="Save"
            onClick={this.saveClick}
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

EditlanguageTranslation.propTypes = {
  saveFunction: PropTypes.func.isRequired,
};

export default EditlanguageTranslation;
