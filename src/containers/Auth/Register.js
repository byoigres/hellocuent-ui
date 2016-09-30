import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { register, resetErrors } from '../../actions';

import { Link, browserHistory } from 'react-router';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import styles from 'styles';

class Register extends Component {

  constructor(props) {
    super(props);
    this.handlerRegisterClick = this.handlerRegisterClick.bind(this);
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

  handlerRegisterClick(e) {
    e.preventDefault();

    this.props.register(
      this.refs.username.getValue(),
      this.refs.password.getValue(),
      this.refs.confirmPassword.getValue()
    );
  }

  render() {
    const { messages, complete } = this.props;

    if (complete) {
      return (
        <div className={styles['login-container']}>
          <div className={styles['login-box']}>
            Check your email to activate your account.
          </div>
        </div>
      );
    }

    return (
      <div className={styles['login-container']}>
        <div className={styles['login-box']}>
          <h2>Create an account</h2>
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
          <TextBox
            placeholder="Confirm Password"
            type="password"
            error={messages.confirmPassword}
            ref="confirmPassword"
          />
          <Button
            text="Create Account"
            block
            onClick={this.handlerRegisterClick}
          />
          <Link to="/auth/login">Sign in</Link>
        </div>
      </div>
    );
  }
}

Register.displayName = 'Register';

Register.propTypes = {
  complete: PropTypes.bool.isRequired,
  messages: PropTypes.object,
  message: PropTypes.string,
  register: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

Register.defaultProps = {
  isLogged: false,
};

function mapStateToProps(state) {
  const {
    errors: {
      message,
      messages,
    },
    authentication: {
      register: {
        complete,
      },
    },
  } = state;

  return {
    message,
    messages,
    complete,
  };
}

export default connect(mapStateToProps, {
  register,
  resetErrors,
})(Register);
