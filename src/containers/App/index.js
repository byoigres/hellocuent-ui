import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router
          onUpdate={() => window.scrollTo(0, 0)}
          history={this.props.history}
          routes={this.props.routes}
        />
      </Provider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
};

export default App;
