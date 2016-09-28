import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login, resetErrors } from '../../actions';

import { Link, browserHistory } from 'react-router';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import styles from 'styles';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handlerLoginClick = this.handlerLoginClick.bind(this);
  }

  componentWillMount() {
    if (this.props.isLogged) {
      browserHistory.push('/');
    }

    this.props.resetErrors();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLogged) {
      browserHistory.push('/');
    }

    return false;
  }

  handlerLoginClick(e) {
    e.preventDefault();

    this.props.login(
      this.refs.username.getValue(),
      this.refs.password.getValue()
    );
  }

  render() {
    const { messages } = this.props;

    return (
      <div className={styles['login-container']}>
        <div className={styles['login-box']}>
          <h2>Login</h2>
          <h3>{this.props.message}</h3>
          <TextBox
            placeholder="Email"
            error={messages.username}
            ref="username"
          />
          <TextBox
            placeholder="Password"
            type="password"
            error={messages.password}
            ref="password"
          />
          <Button
            text="Login"
            block
            onClick={this.handlerLoginClick}
          />
          <Link to="/auth/register">Create an account</Link>
        </div>
      </div>
    );
  }
}

Login.displayName = 'Login';

Login.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  messages: PropTypes.object,
  message: PropTypes.string,
  login: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

Login.defaultProps = {
  isLogged: false,
};

function mapStateToProps(state) {
  const {
    errors: {
      message,
      messages,
    },
    authentication: {
      token,
    },
  } = state;

  return {
    message,
    messages,
    isLogged: (token && typeof token === 'string' && token.length > 0),
  };
}

export default connect(mapStateToProps, {
  login,
  resetErrors,
})(Login);
