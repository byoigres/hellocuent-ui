import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMovie, getCountries, addTranslation, resetErrors } from '../../actions';

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
  }

  componentWillMount() {
    const { movieId } = this.props.routeParams;
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

  handleAddTranslationClick(e) {
    e.preventDefault();
    const { movieId } = this.props.routeParams;

    this.props.addTranslation(
      movieId,
      this.refs.title.getValue(),
      this.refs.country.getValue()
    );
  }

  render() {
    const { title, countries, messages } = this.props;
    const { movieId } = this.props.routeParams;
    const colStyle =
      `${flexboxgrid['col-sm-12']} ${flexboxgrid['col-md-12']} ${flexboxgrid['col-lg-12']}`;

    return (
      <div className={flexboxgrid.row}>
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
            items={countries}
            ref="country"
            error={messages.country}
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
  countries: PropTypes.array,
  messages: PropTypes.object,
  redirect: PropTypes.string,
  getMovie: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  addTranslation: PropTypes.func.isRequired,
  routeParams: PropTypes.object.isRequired,
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
    },
  } = state;

  const movie = movies[movieId] || { title: '' };
  let redirect = null;

  if (registered) {
    redirect = `/movies/${movieId}`;
  }

  const countryList = Object.keys(countries).map(item => ({
    id: countries[item].code,
    text: countries[item].name,
  }));

  return {
    title: movie.title,
    countries: countryList,
    message,
    messages,
    redirect,
  };
}

export default connect(mapStateToProps, {
  getMovie,
  getCountries,
  addTranslation,
  resetErrors,
})(AddTranslation);
