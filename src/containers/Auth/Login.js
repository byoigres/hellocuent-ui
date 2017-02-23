import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import AbsoluteMiddle from 'components/AbsoluteMiddle';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import styles from 'styles';

import { login, resetErrors } from '../../actions';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handlerLoginClick = this.handlerLoginClick.bind(this);
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      browserHistory.push('/');
    }

    this.props.resetErrors();
  }

  componentWillReceiveProps(newProps) {
    const { redirectTo } = this.props.location.query;

    if (newProps.isAuthenticated) {
      browserHistory.push(redirectTo || '/');
    }

    return false;
  }

  handlerLoginClick(e) {
    e.preventDefault();

    this.props.login(
      this.username.getValue(),
      this.password.getValue(),
    );
  }

  render() {
    const { messages } = this.props;

    return (
      <div style={{ height: '100%' }}>
        <AbsoluteMiddle vertical>
          <div className={styles['login-box']}>
            <h1>
              <Link to="/">hellocuent</Link>
            </h1>
            <h2>Login</h2>
            <h3>{this.props.message}</h3>
            <TextBox
              placeholder="Email"
              error={messages.username}
              ref={r => this.username = r}
            />
            <TextBox
              placeholder="Password"
              type="password"
              error={messages.password}
              ref={r => this.password = r}
            />
            <Button
              text="Login"
              block
              onClick={this.handlerLoginClick}
            />
            <Link to="/auth/register">Create an account</Link>
          </div>
        </AbsoluteMiddle>
      </div>
    );
  }
}

Login.displayName = 'Login';

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  messages: PropTypes.object,
  message: PropTypes.string,
  location: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

Login.defaultProps = {
  messages: {},
  message: null,
};


Login.defaultProps = {
  isAuthenticated: false,
};

function mapStateToProps(state) {
  const {
    errors: {
      message,
      messages,
    },
    authentication: {
      isAuthenticated,
    },
  } = state;

  return {
    message,
    messages,
    isAuthenticated,
  };
}

export default connect(mapStateToProps, {
  login,
  resetErrors,
})(Login);
