import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Navbar from '../Navbar';

import styles from 'styles';

class MainLayout extends Component {
  getChildContext() {
    return {
      authentication: this.props.authentication,
    };
  }
  render() {
    const { authentication } = this.props;

    let loginBox = (
      <Link className="navbar-item" to={'/auth/login'}>LOGIN</Link>
    );

    if (authentication && authentication.user) {
      loginBox = (
        <Link
          className="navbar-item"
          to={`/user/${authentication.user.username}`}
        >
          {`${authentication.user.name}`}
        </Link>
      );
    }

    return (
      <div className={styles['main-layout']}>
        <Navbar
          title="Hellocuent"
          link="/"
          loginBox={loginBox}
        />
        <div className={styles['main-layout-container']}>
            {this.props.children}
        </div>

      </div>
    );
  }
}

MainLayout.displayName = 'MainLayout';

MainLayout.propTypes = {
  children: PropTypes.element,
  authentication: PropTypes.object.isRequired,
};

MainLayout.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

MainLayout.childContextTypes = {
  authentication: PropTypes.object,
};

export default connect(({ authentication }) => ({ authentication }), {})(MainLayout);
