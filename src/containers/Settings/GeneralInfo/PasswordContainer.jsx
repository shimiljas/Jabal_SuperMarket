/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import { changePassword } from './GeneralActions';
import Loading from '../../../components/Loading';

class PasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      retypePassword: '',
      modal: false,
      modalContent: null,
      passworderror: '',
      newPassworderror: '',
      retypePassworderror: '',
    };
  }
  validate = prop => {
    if (prop == 'newPassword') {
      const { newPassword } = this.state;
      if (newPassword.length < 7) {
        this.setState({
          newPassworderror: 'Password must be 8 character',
        });
      } else {
        this.setState({
          newPassworderror: '',
        });
      }
      return;
    }
    if (prop == 'retypePassword') {
      const { retypePassword, newPassword } = this.state;
      console.log(retypePassword, newPassword, 'retypePassword, newPassword');
      if (retypePassword !== newPassword) {
        this.setState({
          retypePassworderror: 'Password doesnot match',
        });
      } else {
        this.setState({
          retypePassworderror: '',
        });
      }
      return;
    }
  };
  changeField = (prop, value) => {
    this.setState({ [prop]: value }, () => {
      this.validate(prop);
    });
  };

  buttonClick = () => {
    const { changePassword } = this.props;
    const {
      newPassword,
      passworderror,
      newPassworderror,
      retypePassworderror,
      retypePassword,
    } = this.state;
    if (retypePassword.length == 0) return;

    if (
      passworderror.length == 0 &&
      newPassworderror.length == 0 &&
      retypePassworderror.length == 0
    ) {
      changePassword(newPassword);
      this.setState({ newPassword: '', retypePassword: '' });
    }
  };

  render() {
    const {
      newPassword,
      retypePassword,
      passworderror,
      newPassworderror,
      retypePassworderror,
    } = this.state;
    return (
      <div>
        <h3 className='page-title'>Change Password</h3>
        <div className='settings__password'>
          <Form>
            {/* <FormGroup>
              <Label for='userPassword'>Current Password</Label>
              <Input
                id='userPassword'
                type='password'
                value={password}
                onChange={event =>
                  this.changeField('password', event.target.value)
                }
              />
              {passworderror && (
                <span style={{ color: 'red' }}>{passworderror}</span>
              )}
            </FormGroup> */}
            <FormGroup>
              <Label for='userNewPassword'>New Password</Label>
              <Input
                id='userNewPassword'
                type='password'
                value={newPassword}
                onChange={event => {
                  this.changeField('newPassword', event.target.value);
                }}
              />
              {newPassworderror && (
                <span style={{ color: 'red' }}>{newPassworderror}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label for='repeatPassword'>Repeat Password</Label>
              <Input
                id='repeatPassword'
                type='password'
                value={retypePassword}
                onChange={event => {
                  this.changeField('retypePassword', event.target.value);
                }}
              />
              {retypePassworderror && (
                <span style={{ color: 'red' }}>{retypePassworderror}</span>
              )}
            </FormGroup>
          </Form>
          <div className='align__buttonRight'>
            <Button color='primary' size='lg' onClick={this.buttonClick}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordContainer;
