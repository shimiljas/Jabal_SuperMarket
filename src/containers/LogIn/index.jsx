/* eslint-disable no-debugger */
/* eslint-disable  */
/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LogInForm from './components/LogInForm';
import Logo from '../../shared/img/logo/logo_light.png';

import { logIn } from './LoginAction';
import { toast, ToastContainer } from 'react-toastify';
import store from 'store';

class LogIn extends Component {
  componentDidMount() {
    let token = store.get('token');
    const { user, history } = this.props;
    if (user.token && token) {
      history.replace('/pages/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user, history } = nextProps;
    let token = store.get('token');
    console.log(token, user, 'tokentokentoken');

    if (user.email && token) {
      history.replace('/pages/dashboard');
    }
  }

  onSubmit = () => {
    const { log_in_form, logIn, history } = this.props;
    const { email, password } = log_in_form.values;
    let credentails = {
      email,
      password,
    };
    this.props.logIn(credentails, history);
  };

  render() {
    const { loader } = this.props;
    return (
      <div className='account'>
        <div className='account__wrapper'>
          <div className='account__logo-holder'>
            {/* <img src={Logo} alt='logo' className='account__header-logo-image' /> */}
          </div>
          <div className='account__card'>
            <div className='account__head'>
              <h3 className='account__title'>Login</h3>
            </div>
            <LogInForm loader={loader} handleSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToPops = state => ({
  log_in_form: state.form.log_in_form,
  user: state.login.data,
  loader: state.login.loader,
});

export default connect(
  mapStateToPops,
  { logIn },
)(LogIn);
