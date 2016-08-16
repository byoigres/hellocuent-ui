import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMovie } from '../../actions';

class MovieDetails extends Component {

  componentWillMount() {
    const { movieId } = this.props.routeParams;
    this.props.getMovie(movieId);
  }

  renderMovie() {
    if (this.props.movie) {
      const { movie } = this.props;
      const movieHeader = `${movie.title} (${movie.year})`;
      const imdbUrl = `http://imdb.com/title/${movie.imdbId}`;

      return (
        <div>
          <h2>{movieHeader}</h2>
          <a href={imdbUrl} target="_blank">{imdbUrl}</a>
          <div>Original language: {movie.language}</div>
        </div>
      );
    }

    return null;
  }

  renderTranslations() {
    const { translations, countries } = this.props;

    if (translations) {
      return (
        <div>
          {translations.map((item) => (
            <div key={item.id}>
              <div>{`${item.title} (${countries[item.country].name})`}</div>
            </div>
          ))}
        </div>
      );
    }

    return <div>No translations</div>;
  }

  render() {
    return (
      <div>
        {this.renderMovie()}
        <h2>Translations</h2>
        {this.renderTranslations()}
      </div>
    );
  }
}

MovieDetails.displayName = 'MovieDetails';

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    imdbId: PropTypes.string,
    language: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.number,
  }),
  language: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  translations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  })),
  countries: PropTypes.object,
  routeParams: PropTypes.object.isRequired,
  getMovie: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { movieId } = props.routeParams;
  const {
    languages,
    translations,
    countries,
    movies: movies,
  } = state.entities;

  const movie = movies[movieId] || { translations: [] };

  const language = languages[movie.language || null];
  const translationList = movie.translations || [];
  const movieTranslations = translationList.map((item) => translations[item]);

  return {
    movie,
    language,
    countries,
    translations: movieTranslations,
  };
}

export default connect(mapStateToProps, {
  getMovie,
})(MovieDetails);
