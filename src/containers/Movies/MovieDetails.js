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
      const { movie, language, translations } = this.props;
      const movieHeader = `${movie.title} (${movie.year})`;
      const imdbUrl = `http://imdb.com/title/${movie.imdbId}`;

      return (
        <div className={`${flexboxgrid.row} ${flexboxgrid['middle-lg']}`}>
          <div className={flexboxgrid['col-md-4']}>
            <img
              style={{
                height: '22rem',
              }}
              alt={movieHeader}
              src={`/images/${movie.id}.jpg`}
            />
          </div>
          <div className={flexboxgrid['col-md-8']}>
            <div>
              <h1>{movieHeader}</h1>
              <a href={imdbUrl} target="_blank">{imdbUrl}</a>
              <div>Original language: {language.name}</div>
              <div>{translations.length} translations</div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  renderTranslations() {
    const { movieId } = this.props.routeParams;
    const { translations, countries, languages } = this.props;

    let translationsBox = (
      <div className={flexboxgrid['col-md-12']}>
        <h2>No translations</h2>
      </div>
    );

    if (translations.length > 0) {
      translationsBox = (
        <div className={flexboxgrid['col-md-12']}>
          <h2>Translations</h2>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Language</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {translations.map((item) => (
                <tr key={item.id}>
                  <td>{countries[item.country].name}</td>
                  <td>{languages[item.language].name}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className={flexboxgrid.row}>
        {translationsBox}
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
    description: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  })),
  countries: PropTypes.object,
  languages: PropTypes.object,
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
    languages,
    translations: movieTranslations,
  };
}

export default connect(mapStateToProps, {
  getMovie,
})(MovieDetails);
