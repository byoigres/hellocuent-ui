import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addMovie, getLanguages, resetErrors } from '../../actions';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Select from 'components/Select';
import Button from 'components/Button';

import flexboxgrid from 'flexboxgrid';

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
      this.refs.title.getValue(),
      this.refs.year.getValue(),
      this.refs.imdbId.getValue(),
      this.refs.language.getValue()
    );
  }

  render() {
    const { messages } = this.props;
    const colStyle =
      `${flexboxgrid['col-sm-12']} ${flexboxgrid['col-md-12']} ${flexboxgrid['col-lg-12']}`;

    return (
      <div className={`${flexboxgrid.row} ${flexboxgrid['start-xs']}`}>
        <div className={colStyle}>
          <Header text="Add Movie" />
          <TextBox
            placeholder="Original title"
            ref="title"
            error={messages.title}
          />
          <TextBox
            maxLength="4"
            placeholder="Year"
            ref="year"
            error={messages.year}
          />
          <TextBox
            leftText="https://imdb.com/title/"
            placeholder="Imdb ID"
            ref="imdbId"
            error={messages.imdbId}
          />
          <Select
            placeholder="Title language"
            items={this.props.languages}
            ref="language"
            error={messages.languageCode}
          />
          <Button
            text="Add"
            onClick={this.handleAddButtonClick}
          />
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

  languages = Object.keys(languageList).map((item) => ({
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
