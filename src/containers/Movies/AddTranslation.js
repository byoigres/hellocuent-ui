import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMovie, getCountries } from '../../actions';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Select from 'components/Select';
import Button from 'components/Button';

import flexboxgrid from 'flexboxgrid';

class AddTranslation extends Component {

  componentWillMount() {
    const { movieId } = this.props.routeParams;
    this.props.getMovie(movieId);
    this.props.getCountries();
  }

  render() {
    const { title, countries, messages } = this.props;
    const colStyle =
      `${flexboxgrid['col-sm-12']} ${flexboxgrid['col-md-12']} ${flexboxgrid['col-lg-12']}`;

    return (
      <div className={flexboxgrid.row}>
        <div className={colStyle}>
          <Header text="Add Translation" />
          <TextBox
            readOnly
            disabld
            text={title}
          />
          <TextBox
            placeholder="Title"
            ref="title"
            error={messages.title}
          />
          <Select
            placeholder="Country"
            items={countries}
            ref="country"
            error={messages.country}
          />
          <Button
            text="Add translation"
          />
        </div>
      </div>
    );
  }
}

AddTranslation.displayName = 'AddTranslation';

AddTranslation.propTypes = {
  title: PropTypes.string.isRequired,
  countries: PropTypes.array,
  messages: PropTypes.object,
  getMovie: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired,
};

function mapStateToProps(state, props) {
  const { movieId } = props.routeParams;
  const {
    movies,
    countries,
  } = state.entities;

  const movie = movies[movieId] || { title: '' };

  const countryList = Object.keys(countries).map(item => ({
    id: countries[item].code,
    text: countries[item].name,
  }));

  return {
    title: movie.title,
    countries: countryList,
    messages: {},
  };
}

export default connect(mapStateToProps, {
  getMovie,
  getCountries,
})(AddTranslation);
