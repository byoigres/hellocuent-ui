import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import NavigationBar from 'components/NavigationBar';
import Modal from 'components/Modal';
import Button from 'components/Button';
import styles from 'styles';
import AddMovie from './AddMovie';


import {
  getMovies,
  openAddMovieModal,
  closeAddMovieModal,
} from '../../actions';

class ListMovies extends Component {

  constructor(props) {
    super(props);
    this.displayAddMovieModal = this.displayAddMovieModal.bind(this);
    this.onCancelAddMovieModal = this.onCancelAddMovieModal.bind(this);
  }

  componentWillMount() {
    this.props.getMovies();
  }

  onCancelAddMovieModal() {
    this.props.closeAddMovieModal();
  }

  displayAddMovieModal() {
    this.props.openAddMovieModal();
  }

  render() {
    const { isModalOpen } = this.props;

    const navBarItems = [
      {
        text: 'Movies',
      },
      {
        text: 'Add movie',
        href: '/movies/add',
      },
    ];
    return (
      <div>
        <NavigationBar items={navBarItems} />
        <Button text="Add Movie" onClick={this.displayAddMovieModal} />
        <div className={styles['movie-list']}>
          {this.props.movies.map(movie => (
            <div
              className={styles['movie-list-item']}
              key={movie.id}
            >
              <Link className={styles['movie-item-detail']} to={`/movies/${movie.id}`}>
                <img
                  className={styles['movie-item-image']}
                  src={`/images/${movie.poster}`}
                  alt=""
                />
                <span className={styles['movie-item-title']}>
                  {`${movie.title} (${movie.year})`}
                </span>
              </Link>
            </div>
          ))}
        </div>
        <Modal
          title="Add movie"
          okText="Add"
          isOpen={isModalOpen}
          ref={r => this.modal = r}
          onCancel={this.onCancelAddMovieModal}
        >
          <AddMovie />
        </Modal>
      </div>
    );
  }
}

ListMovies.displayName = 'ListMovies';

ListMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  getMovies: PropTypes.func.isRequired,
  openAddMovieModal: PropTypes.func.isRequired,
  closeAddMovieModal: PropTypes.func.isRequired,
};

ListMovies.contextTypes = {
  authentication: PropTypes.object,
};

function mapStateToProps(state) {
  let { movies } = state.entities;
  const { isModalOpen } = state.movies;

  movies = Object.keys(movies).map(item => movies[item]);

  return {
    movies,
    isModalOpen,
  };
}

export default connect(mapStateToProps, {
  getMovies,
  openAddMovieModal,
  closeAddMovieModal,
})(ListMovies);
