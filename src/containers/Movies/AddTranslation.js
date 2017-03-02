 /* eslint react/require-default-props: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextBox from 'components/TextBox';
import Select from 'components/Select';
import Header from 'components/Header';
import Modal from 'components/Modal';
import styles from 'styles';

import {
  getMovie,
  getCountries,
  getLanguagesByCountry,
  addTranslation,
  initTranslation,
  resetErrors,
  closeAddTranslationModal,
} from '../../actions';

class AddTranslation extends Component {

  constructor(props) {
    super(props);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  componentWillMount() {
    const { movieId } = this.props;
    this.props.initTranslation();
    this.props.resetErrors();
    this.props.getMovie(movieId);
    this.props.getCountries();
  }

  /*
  componentWillReceiveProps(nextProps, context) {
    const { redirect } = nextProps;

    if (redirect) {
      return context.router.push(redirect);
    }

    return true;
  }
  */

  onCancelClick() {
    this.props.closeAddTranslationModal();
  }

  onAddClick(e) {
    e.preventDefault();
    const { movieId } = this.props;

    this.props.addTranslation(
      movieId,
      this.title.getValue(),
      this.country.getValue(),
      this.language.getValue(),
      this.description.getValue(),
    );
  }

  handleCountryChange(e) {
    this.props.getLanguagesByCountry(e.target.value);
  }

  render() {
    const {
      title,
      countries,
      languages,
      messages,
      isModalOpen,
    } = this.props;

    const countryList = Object.keys(countries).map(item => ({
      id: countries[item].code,
      text: countries[item].name,
    }));

    let languageList = [];

    if (this.country && this.country.getValue().length > 0) {
      languageList = countries[this.country.getValue()].languages.map(item => ({
        id: languages[item].code,
        text: languages[item].name,
      }));
    }

    return (
      <Modal
        title="Add Translation"
        cancelText="Back"
        successText="Add"
        onCancel={this.onCancelClick}
        onSuccess={this.onAddClick}
        ref={r => this.modal = r}
        isOpen={isModalOpen}
      >
        <div className={styles['add-translation']}>
          <Header
            text={title}
            isTextCentered
            level={2}
          />
          <TextBox
            placeholder="Title"
            ref={r => this.title = r}
            error={messages.title}
          />
          <Select
            placeholder="Country"
            items={countryList}
            onChange={this.handleCountryChange}
            ref={r => this.country = r}
            error={messages.country}
          />
          <Select
            placeholder="Language"
            items={languageList}
            ref={r => this.language = r}
            disabled={(this.country && this.country.getValue().length === 0)}
            error={messages.language}
          />
          <TextBox
            placeholder="Description"
            ref={r => this.description = r}
            error={messages.description}
          />
        </div>
      </Modal>
    );
  }
}

AddTranslation.displayName = 'AddTranslation';

AddTranslation.propTypes = {
  movieId: PropTypes.string.isRequired,
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
  // redirect: PropTypes.string,
  isModalOpen: PropTypes.bool,
  getMovie: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  getLanguagesByCountry: PropTypes.func.isRequired,
  addTranslation: PropTypes.func.isRequired,
  initTranslation: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  closeAddTranslationModal: PropTypes.func.isRequired,
};

AddTranslation.defaultProps = {
  isModalOpen: false,
};


function mapStateToProps(state, props) {
  const { movieId } = props; /* .routeParams*/
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
    title: `${movie.title} (${movie.year})`,
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
  closeAddTranslationModal,
})(AddTranslation);
