import React, { Component, PropTypes } from 'react';

import AbsoluteMiddle from 'components/AbsoluteMiddle';
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
    const { text, ...rest } = this.props;

    return (
      <Dropzone
        className={styles['dropzone-element']}
        onDrop={this.onDropImage}
        {...rest}
      >
        {this.state.poster ?
          <img
            src={this.state.poster.preview}
            alt="Movie Poster"
            className={styles['dropzone-preview']}
          /> : <strong className={styles['dropzone-text']}>{text}</strong>}
      </Dropzone>
    );
  }
}

DropZonePoster.propTypes = {
  poster: PropTypes.string,
  text: PropTypes.string.isRequired,
};

DropZonePoster.defaultProps = {
  poster: null,
};

export default DropZonePoster;
