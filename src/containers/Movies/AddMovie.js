import React, { Component } from 'react';

import Header from 'components/Header';

class AddMovie extends Component {
  render() {
    return (
      <div>
        <Header text="Add Movie" />
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
          />
        </div>
        <div>
          <label>Year</label>
          <input
            type="text"
            disabled
            placeholder="Year"
          />
        </div>
        <div>
          <label>{'https://imdb.com/title/'}</label>
        </div>
      </div>
    );
  }
}

AddMovie.displayName = 'AddMovie';

export default AddMovie;
