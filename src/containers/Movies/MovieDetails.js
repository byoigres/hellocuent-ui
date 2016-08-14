import React, { Component } from 'react';

class MovieDetails extends Component {

  componentWillMount() {
    console.log(`Looking for movie ${this.props.routeParams.movieId}`);
  }

  render() {
    return (
      <div>
        <h2>Movie Details</h2>
      </div>
    );
  }
}

MovieDetails.displayName = 'MovieDetails';

MovieDetails.propTypes = {};

export default MovieDetails;
