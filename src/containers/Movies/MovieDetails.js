 /* eslint react/require-default-props: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EditBox from 'components/EditBox';
import AbsoluteMiddle from 'components/AbsoluteMiddle';
import NavigationBar from 'components/NavigationBar';
import styles from 'styles';
import AddTranslation from './AddTranslation';

import {
  getMovie,
  addLanguageTranlation,
  openAddTranslationModal,
} from '../../actions';

class MovieDetails extends Component {

  componentWillMount() {
    const { movieId } = this.props.routeParams;
    this.saveLanguageTranslation = this.saveLanguageTranslation.bind(this);
    this.displayAddTranslationModal = this.displayAddTranslationModal.bind(this);
    this.props.getMovie(movieId);
  }

  saveLanguageTranslation(title, translationId) {
    this.props.addLanguageTranlation(translationId, title);
  }

  displayAddTranslationModal(e) {
    e.preventDefault();
    this.props.openAddTranslationModal();
  }

  renderMovie() {
    if (this.props.movie) {
      const { movie, language, translations } = this.props;
      const movieHeader = `${movie.title} (${movie.year})`;
      const imdbUrl = `http://imdb.com/title/${movie.imdbId}`;

      return (
        <div
          className={styles['movie-details-content']}
        >
          <div
            className={styles['background-image']}
            style={{
              backgroundImage: `url(/images/${movie.poster ? movie.poster : 'blank.png'})`,
            }}
          />
          <div className={styles['background-image-overlay']} />
          <div className={styles['movie-details-image-container']}>
            <AbsoluteMiddle>
              <img
                alt={movieHeader}
                src={`/images/${movie.poster ? movie.poster : 'blank.png'}`}
              />
            </AbsoluteMiddle>
          </div>
          <div className={styles['movie-details-info']}>
            <h1>{movieHeader}</h1>
            <a href={imdbUrl} target="_blank" rel="noopener noreferrer">{imdbUrl}</a>
            <div>Original language: {language.name}</div>
            <div>{translations.length} translations</div>
          </div>
        </div>
      );
    }

    return null;
  }

  renderEditControl(id) {
    return (
      <EditBox
        text="Add Translation"
        loading={this.props.loaders.languageTranslation}
        loadingText="Saving..."
        onSaveClick={value => this.saveLanguageTranslation(value, id)}
        ref={edit => this.edit = edit}
      />
    );
  }

  renderTranslations() {
    const {
      translations,
      countries,
      languages,
    } = this.props;

    let translationsBox = (
      <div>
        <h2>No translations</h2>
      </div>
    );

    if (translations.length > 0) {
      translationsBox = (
        <div>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Language</th>
                <th>Original Title</th>
                <th>English</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {translations.map(item => (
                <tr key={item.id}>
                  <td>{countries[item.country].name}</td>
                  <td>{languages[item.language].name}</td>
                  <td>{item.title}</td>
                  <td>{
                    item.languageTranslation.length > 0 ?
                    item.languageTranslation :
                      this.renderEditControl(item.id)
                  }</td>
                  <td>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return translationsBox;
  }

  render() {
    const { movieId } = this.props.routeParams;
    const {
      movie,
      isModalOpen,
    } = this.props;

    if (this.props.notFound) {
      return (
        <h1>Movie not found</h1>
      );
    }

    const navBarItems = [
      {
        text: 'Movies',
        href: '/movies',
      },
      {
        text: `${movie.title} (${movie.year})`,
      },
      {
        text: 'Add translation',
        href: '#',
        onClick: this.displayAddTranslationModal,
      },
    ];

    return (
      <div className={styles['movie-details']}>
        <NavigationBar
          items={navBarItems}
          selectedIndex={2}
        />
        {this.renderMovie()}
        {this.renderTranslations()}
        <AddTranslation
          movieId={movieId}
          isModalOpen={isModalOpen}
        />
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
    poster: PropTypes.string,
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
  loaders: PropTypes.object.isRequired,
  notFound: PropTypes.bool.isRequired,
  routeParams: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  openAddTranslationModal: PropTypes.func.isRequired,
  getMovie: PropTypes.func.isRequired,
  addLanguageTranlation: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { movieId } = props.routeParams;
  const {
    languages,
    translations,
    countries,
    movies,
    languageTranslation,
  } = state.entities;
  const { loaders } = state;
  const { isModalOpen } = state.translations;

  const movie = movies[movieId] || { translations: [] };

  const language = (languages[movie.language || null]) || { code: '', name: '' };
  const translationList = movie.translations || [];

  const movieTranslations = translationList.map((item) => {
    const translation = translations[item];

    let languageTranslationTitle = '';

    if (translation.languageTranslations.length > 0) {
      languageTranslationTitle = languageTranslation[translation.languageTranslations[0]].title;
    }

    return Object.assign({}, translation, {
      languageTranslation: languageTranslationTitle,
    });
  });

  return {
    movie,
    language,
    countries,
    languages,
    translations: movieTranslations,
    notFound: Object.keys(movies).length === 0,
    loaders,
    isModalOpen,
  };
}

export default connect(mapStateToProps, {
  getMovie,
  addLanguageTranlation,
  openAddTranslationModal,
})(MovieDetails);
