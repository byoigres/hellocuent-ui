import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMovie } from '../../actions';
import Button from 'components/Button';
import flexboxgrid from 'flexboxgrid';

class MovieDetails extends Component {

  componentWillMount() {
    const { movieId } = this.props.routeParams;
    this.props.getMovie(movieId);
  }

  renderMovie() {
    if (this.props.movie) {
      const { movie, language } = this.props;
      const movieHeader = `${movie.title} (${movie.year})`;
      const imdbUrl = `http://imdb.com/title/${movie.imdbId}`;

      return (
        <div className={flexboxgrid['col-md-12']}>
          <div className={flexboxgrid.row}>
            <div className={flexboxgrid['col-md-12']}>
              <h2>{movieHeader}</h2>
            </div>
          </div>
          <div className={flexboxgrid.row}>
            <div className={flexboxgrid['col-md-6']}>
              <a href={imdbUrl} target="_blank">{imdbUrl}</a>
              <div>Original language: {language.name}</div>
            </div>
            <div className={flexboxgrid['col-md-6']}>
              <img
                style={{
                  width: '20rem',
                }}
                alt={movieHeader}
                src="/images/1.jpg"
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  renderTranslations() {
    const { movieId } = this.props.routeParams;
    const { translations, countries } = this.props;

    return (
      <div className={flexboxgrid['col-md-12']}>
        <h2>Translations</h2>
        {translations.map((item) => (
          <div key={item.id}>
            <div>{`${item.title} (${countries[item.country].name})`}</div>
          </div>
        ))}
        <Button
          text="Add translation"
          link={`/movies/${movieId}/translation/add`}
          onClick={this.handleAddTranslationClick}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={flexboxgrid.row}>
        <div className={flexboxgrid['col-md-12']}>
          {this.renderMovie()}
        </div>
        <div className={flexboxgrid['col-md-12']}>
          {this.renderTranslations()}
        </div>
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

  const language = (languages[movie.language || null]) || { code: '', name: '' };
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
