import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import AbsoluteMiddle from 'components/AbsoluteMiddle';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import styles from 'styles';

import { register, resetErrors } from '../../actions';

class Register extends Component {

  constructor(props) {
    super(props);
    this.handlerRegisterClick = this.handlerRegisterClick.bind(this);
  }

  componentWillMount() {
    if (this.props.complete) {
      browserHistory.push('/');
    }

    this.props.resetErrors();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isAuthenticated) {
      browserHistory.push('/');
    }

    return false;
  }

  handlerRegisterClick(e) {
    e.preventDefault();

    this.props.register(
      this.username.getValue(),
      this.email.getValue(),
      this.name.getValue(),
      this.password.getValue(),
      this.confirmPassword.getValue(),
    );
  }

  render() {
    const { messages, complete } = this.props;

    if (complete) {
      return (
        <div className={styles['login-container']}>
          <div className={styles['login-box']}>
            <div>Check your email to activate your account.</div>
            <Link to="/">Register another account</Link>
          </div>
        </div>
      );
    }

    return (
      <AbsoluteMiddle vertical>
        <h1>
          <Link to="/">hellocuent</Link>
        </h1>
        <div className={styles['login-box']}>
          <h2>Create an account</h2>
          <h3>{this.props.message}</h3>
          <TextBox
            placeholder="Username"
            error={messages.username}
            ref={r => this.username = r}
          />
          <TextBox
            placeholder="Email"
            error={messages.email}
            ref={r => this.email = r}
          />
          <TextBox
            placeholder="Name"
            error={messages.email}
            ref={r => this.name = r}
          />
          <TextBox
            placeholder="Password"
            type="password"
            error={messages.password}
            ref={r => this.password = r}
          />
          <TextBox
            placeholder="Confirm Password"
            type="password"
            error={messages.confirmPassword}
            ref={r => this.confirmPassword = r}
          />
          <Button
            text="Create Account"
            block
            onClick={this.handlerRegisterClick}
          />
          <Link to="/auth/login">Sign in</Link>
        </div>
      </AbsoluteMiddle>
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
  messages: {},
  message: null,
};

Register.defaultProps = {
  isAuthenticated: false,
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
