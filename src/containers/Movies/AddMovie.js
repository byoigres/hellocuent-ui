import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchOmdbMovie, addMovie, getLanguages } from './actions';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
// import Autocomplete from 'components/Autocomplete';
import Select from 'components/Select';
import Button from 'components/Button';

import flexboxgrid from 'flexboxgrid';

class AddMovie extends Component {

  constructor(props) {
    super(props);
    this.handleMovieChange = this.handleMovieChange.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  handleMovieChange(e) {
    const criteria = e.target.value;

    this.props.searchOmdbMovie(criteria);
  }

  handleAddButtonClick() {
    this.props.addMovie(
      this.refs.title.getValue(),
      this.refs.year.getValue(),
      this.refs.imdbId.getValue()
    );
  }

  componentWillMount() {
    this.props.getLanguages();
  }

  render() {
    const items = {
      1: { id: 1, text: 'English' },
      2: { id: 2, text: 'Spanish' },
    };

    return (
      <div className={flexboxgrid.row}>
        <div className={flexboxgrid['col-md-12']}>
          <Header text="Add Movie" />
          <TextBox
            placeholder="Original title"
            ref="title"
          />
          <TextBox
            maxLength="4"
            placeholder="Year"
            ref="year"
          />
          <TextBox
            leftText="https://imdb.com/title/"
            placeholder="Imdb ID"
            ref="imdbId"
          />
          <Select
            placeholder="Title language"
            items={items}
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
  searchOmdbMovie: PropTypes.func.isRequired,
  addMovie: PropTypes.func.isRequired,
  getLanguages: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  console.log('state', state);
  return state;
}

export default connect(mapStateToProps, {
  searchOmdbMovie,
  addMovie,
  getLanguages,
})(AddMovie);
