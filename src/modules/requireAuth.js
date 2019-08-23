/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import store from 'store';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      let token = store.get('token');
      if (token == null || token.length == 0) {
        window.location.href = window.location.origin;
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToPops = state => ({
    user: state.login.data,
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        redirect: () => push('/'),
      },
      dispatch,
    );

  return connect(
    mapStateToPops,
    mapDispatchToProps,
  )(Authentication);
}
