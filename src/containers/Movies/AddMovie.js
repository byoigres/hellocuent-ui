import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextBox from 'components/TextBox';
import Select from 'components/Select';
import Button from 'components/Button';
import DropZonePoster from 'components/DropZonePoster';
import styles from 'styles';

import { addMovie, getLanguages, resetErrors } from '../../actions';

class AddMovie extends Component {

  constructor(props) {
    super(props);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.resetErrors();
    this.props.getLanguages();
  }

  handleAddButtonClick() {
    this.props.addMovie(
      this.title.getValue(),
      this.year.getValue(),
      this.imdbId.getValue(),
      this.language.getValue(),
      this.poster.getValue(),
    );
  }

  render() {
    const { messages } = this.props;

    return (
      <div className={styles['add-movie']}>
        <div className={styles['add-movie-container']}>
          <div className={styles['add-movie-content']}>
            <TextBox
              placeholder="Original title"
              ref={r => this.title = r}
              error={messages.title}
            />
            <div className={styles['add-movie-colums']}>
              <TextBox
                maxLength="4"
                placeholder="Year"
                ref={r => this.year = r}
                error={messages.year}
              />
              <Select
                placeholder="Title language"
                items={this.props.languages}
                ref={r => this.language = r}
                error={messages.languageCode}
              />
            </div>
            <TextBox
              leftText="https://imdb.com/title/"
              placeholder="Imdb ID"
              ref={r => this.imdbId = r}
              error={messages.imdbId}
            />
            <Button
              text="Add"
              block
              style={{ display: 'none' }}
              onClick={this.handleAddButtonClick}
            />
          </div>
          <div className={styles['add-movie-image']}>
            <DropZonePoster
              text={messages.poster ? messages.poster : 'Add Poster'}
              ref={r => this.poster = r}
            />
          </div>
        </div>
      </div>
    );
  }
}

AddMovie.displayName = 'AddMovie';

AddMovie.propTypes = {
  languages: PropTypes.array.isRequired,
  messages: PropTypes.object,
  addMovie: PropTypes.func.isRequired,
  getLanguages: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

AddMovie.defaultProps = {
  messages: {},
};

function mapStateToProps(state) {
  const {
    errors: {
      message,
      messages,
    },
    entities: {
      languages: languageList,
    },
  } = state;

  let languages = [];

  languages = Object.keys(languageList).map(item => ({
    id: languageList[item].code,
    text: languageList[item].name,
  }));

  return {
    languages,
    message,
    messages,
  };
}

export default connect(mapStateToProps, {
  addMovie,
  getLanguages,
  resetErrors,
})(AddMovie);
