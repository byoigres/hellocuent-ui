import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login, resetErrors } from '../../actions';

import Button from 'components/Button';
import TextBox from 'components/TextBox';
import styles from 'styles';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handlerLoginClick = this.handlerLoginClick.bind(this);
  }

  componentWillMount() {
    this.props.resetErrors();
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
            onClick={this.handlerLoginClick}
          />
        </div>
      </div>
    );
  }
}

Login.displayName = 'Login';

Login.propTypes = {
  messages: PropTypes.object,
  message: PropTypes.string,
  login: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // console.log(state);
  const {
    errors: {
      message,
      messages,
    },
  } = state;

  return {
    message,
    messages,
  };
}

export default connect(mapStateToProps, {
  login,
  resetErrors,
})(Login);
