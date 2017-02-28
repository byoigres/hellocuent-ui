import React, { Component, PropTypes } from 'react';

import Dropzone from 'react-dropzone';
import styles from 'styles';

class DropZonePoster extends Component {

  constructor(props) {
    super(props);
    this.state = {
      poster: null,
    };
    this.onDropImage = this.onDropImage.bind(this);
  }

  onDropImage(files) {
    if (files.length > 0) {
      this.setState({
        poster: files[0],
      });
    }
  }

  getValue() {
    return this.state.poster;
  }

  render() {
    const { text, error, ...rest } = this.props;

    let component = <strong className={styles['dropzone-text']}>{text}</strong>;
    let textStyles = styles['dropzone-text'];
    let componentStyles = styles['dropzone-element'];

    if (error) {
      textStyles = `${textStyles} ${styles['dropzone-text-error']}`;
      componentStyles = `${componentStyles} ${styles['dropzone-element-error']}`;
      component = <strong className={textStyles}>{error}</strong>;
    } else if (this.state.poster) {
      component = (
        <img
          src={this.state.poster.preview}
          alt="Movie Poster"
          className={styles['dropzone-preview']}
        />
      );
    } else {
      component = (
        <strong className={textStyles}>{text}</strong>
      );
    }

    return (
      <Dropzone
        className={componentStyles}
        onDrop={this.onDropImage}
        {...rest}
      >
        {component}
      </Dropzone>
    );
  }
}

DropZonePoster.propTypes = {
  poster: PropTypes.string,
  text: PropTypes.string.isRequired,
  error: PropTypes.string,
};

DropZonePoster.defaultProps = {
  poster: null,
  error: null,
};

export default DropZonePoster;
