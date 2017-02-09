import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getMovies } from '../../actions';

import Header from 'components/Header';
import NavigationBar from 'components/NavigationBar';
import styles from 'styles';

class ListMovies extends Component {

  componentWillMount() {
    this.props.getMovies();
  }

  render() {
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
        <div className={styles['movie-list']}>
          {this.props.movies.map((movie) => (
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
      </div>
    );
  }
}

ListMovies.displayName = 'ListMovies';

ListMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  getMovies: PropTypes.func.isRequired,
};

ListMovies.contextTypes = {
  authentication: PropTypes.object,
};

function mapStateToProps(state) {
  let { movies } = state.entities;

  movies = Object.keys(movies).map((item) => movies[item]);

  return {
    movies,
  };
}

export default connect(mapStateToProps, {
  getMovies,
})(ListMovies);
