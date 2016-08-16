import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getMovies } from '../../actions';

class ListMovies extends Component {

  componentWillMount() {
    this.props.getMovies();
  }

  render() {
    return (
      <div>
        <h2>List Movies</h2>
        {this.props.movies.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{`${movie.title} (${movie.year})`}</Link>
          </div>
        ))}
      </div>
    );
  }
}

ListMovies.displayName = 'ListMovies';

ListMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  getMovies: PropTypes.func.isRequired,
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
