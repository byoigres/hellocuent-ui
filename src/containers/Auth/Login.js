import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login, resetErrors } from '../../actions';

import flexboxgrid from 'flexboxgrid';
import Button from 'components/Button';
import TextBox from 'components/TextBox';

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
    return (
      <div className={`${flexboxgrid.row} ${flexboxgrid['center-xs']}`}>
        <div className={flexboxgrid['col-md-4']}>
          <h2>Login</h2>
          <h3>{this.props.message}</h3>
          <TextBox
            placeholder="Email"
            ref="username"
          />
          <TextBox
            placeholder="Password"
            type="password"
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
  message: PropTypes.string,
  login: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // console.log(state);
  const {
    errors: {
      message,
    },
  } = state;

  return {
    message,
  };
}

export default connect(mapStateToProps, {
  login,
  resetErrors,
})(Login);
