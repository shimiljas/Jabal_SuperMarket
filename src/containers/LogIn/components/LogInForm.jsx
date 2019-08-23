/* eslint-disable  */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-quotes */
/* eslint-disable arrow-parens */
import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/MailOutlineIcon';
import PropTypes from 'prop-types';
import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import Loading from '../../../components/Loading';
import RenderField from '../../../components/RenderField';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be greater than 8 ';
  }
  return errors;
};

class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loader: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPassword = e => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const { handleSubmit, loader, pristine, submitting, invalid } = this.props;
    const { showPassword } = this.state;
    console.log(
      pristine,
      submitting,
      invalid,
      'pristine, submitting, invalidpristine, submitting, invalid',
    );
    if (loader) {
      return <Loading />;
    }
    return (
      <form onSubmit={handleSubmit}>
        <div className='form'>
          <div className='form__form-group'>
            <span className='form__form-group-label'>Email</span>
            <div className='form__form-group-field'>
              <div className='form__form-group-icon'>
                <AccountOutlineIcon />
              </div>
              <Field
                name='email'
                component={RenderField}
                type='text'
                placeholder='Enter your email'
              />
            </div>
          </div>
          <div className='form__form-group'>
            <span className='form__form-group-label'>Password</span>
            <div className='form__form-group-field'>
              <div className='form__form-group-icon'>
                <KeyVariantIcon />
              </div>
              <Field
                name='password'
                component={RenderField}
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
              />
              <button
                className={`form__form-group-button${
                  showPassword ? ' active' : ''
                }`}
                onClick={e => this.showPassword(e)}
                type='button'
              >
                <EyeIcon />
              </button>
            </div>
            {/* <div className='account__forgot-password'>
              <a href='/forgot'>Forgot a password?</a>
            </div> */}
          </div>
          <div className='form__form-group'>
            <div className='form__form-group-field'>
              <Field
                name='remember_me'
                component={renderCheckBoxField}
                label='Remember me'
              />
            </div>
          </div>
          <button
            type='button'
            className='btn btn-primary account__btn account__btn--small'
            disabled={submitting || pristine || invalid}
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'log_in_form',
  validate, // <--- validation function given to redux-form
})(LogInForm);
