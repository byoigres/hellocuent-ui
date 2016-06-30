import React, { Component } from 'react';

import Header from 'components/Header';
import TextBox from 'components/TextBox';

class AddMovie extends Component {
  render() {
    return (
      <div>
        <Header text="Add Movie" />
        <TextBox
          placeholder="Hello from textbox"
        />
        <TextBox
          disabled
          placeholder="Year"
        />
        <div>
          <label>{'https://imdb.com/title/'}</label>
        </div>
      </div>
    );
  }
}

AddMovie.displayName = 'AddMovie';

export default AddMovie;
