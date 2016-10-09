import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  getMovie,
  getCountries,
  getLanguagesByCountry,
  addTranslation,
  initTranslation,
  resetErrors
} from '../../actions';

import { Link } from 'react-router';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Select from 'components/Select';
import Button from 'components/Button';

import flexboxgrid from 'flexboxgrid';

class AddTranslation extends Component {

  constructor(props) {
    super(props);
    this.handleAddTranslationClick = this.handleAddTranslationClick.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentWillMount() {
    const { movieId } = this.props.routeParams;
    this.props.initTranslation();
    this.props.resetErrors();
    this.props.getMovie(movieId);
    this.props.getCountries();
  }

  componentWillReceiveProps(nextProps, context) {
    const { redirect } = nextProps;

    if (redirect) {
      return context.router.push(redirect);
    }

    return true;
  }

  handleCountryChange(e) {
    this.props.getLanguagesByCountry(e.target.value);
  }

  handleAddTranslationClick(e) {
    e.preventDefault();
    const { movieId } = this.props.routeParams;

    this.props.addTranslation(
      movieId,
      this.refs.title.getValue(),
      this.refs.country.getValue(),
      this.refs.language.getValue(),
      this.refs.description.getValue()
    );
  }

  render() {
    const { title, countries, languages, messages } = this.props;
    const { movieId } = this.props.routeParams;
    const colStyle =
      `${flexboxgrid['col-sm-12']} ${flexboxgrid['col-md-12']} ${flexboxgrid['col-lg-12']}`;

    const countryList = Object.keys(countries).map(item => ({
      id: countries[item].code,
      text: countries[item].name,
    }));

    let languageList = [];

    if (this.refs.country && this.refs.country.getValue().length > 0) {
      languageList = countries[this.refs.country.getValue()].languages.map((item) => ({
        id: languages[item].code,
        text: languages[item].name,
      }));
    }

    return (
      <div className={`${flexboxgrid.row} ${flexboxgrid['start-xs']}`}>
        <div className={colStyle}>
          <Header text="Add Translation" />
          <Link to={`/movies/${movieId}`}>{title}</Link>
          <TextBox
            placeholder="Title"
            ref="title"
            error={messages.title}
          />
          <Select
            placeholder="Country"
            items={countryList}
            onChange={this.handleCountryChange}
            ref="country"
            error={messages.country}
          />
          <Select
            placeholder="Language"
            items={languageList}
            ref="language"
            disabled={(this.refs.country && this.refs.country.getValue().length === 0)}
            error={messages.language}
          />
          <TextBox
            placeholder="Description"
            ref="description"
            error={messages.description}
          />
          <Button
            text="Add translation"
            onClick={this.handleAddTranslationClick}
          />
        </div>
      </div>
    );
  }
}

AddTranslation.displayName = 'AddTranslation';

AddTranslation.propTypes = {
  title: PropTypes.string.isRequired,
  countries: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),
  languages: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),
  messages: PropTypes.object,
  redirect: PropTypes.string,
  getMovie: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  getLanguagesByCountry: PropTypes.func.isRequired,
  addTranslation: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired,
  initTranslation: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

AddTranslation.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};


function mapStateToProps(state, props) {
  const { movieId } = props.routeParams;
  const {
    translations: {
      registered,
    },
    errors: {
      message,
      messages,
    },
    entities: {
      movies,
      countries,
      languages,
    },
  } = state;

  const movie = movies[movieId] || { title: '' };
  let redirect = null;

  if (registered) {
    redirect = `/movies/${movieId}`;
  }

  return {
    title: movie.title,
    countries,
    languages,
    message,
    messages,
    redirect,
  };
}

export default connect(mapStateToProps, {
  getMovie,
  getCountries,
  getLanguagesByCountry,
  addTranslation,
  initTranslation,
  resetErrors,
})(AddTranslation);
