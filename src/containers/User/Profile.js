import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../actions';

class UserProfile extends Component {
  componentWillMount() {
    const { username } = this.props.routeParams;

    this.props.getUserProfile(username);
  }
  render() {
    return (
      <h1>Welcome</h1>
    );
  }
}

UserProfile.displayName = 'UserProfile';

UserProfile.propTypes = {
  routeParams: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {
  getUserProfile,
})(UserProfile);
