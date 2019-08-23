import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import DefaultModal from '../component/ConfirmationCreateModal';

class AddUserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
      designation: '',
      address: '',
      password: '',
    };
  }

  render() {
    const {
      name,
      email,
      mobile,
      designation,
      address,
      password,
    } = this.state;
    return (
      <div className="settings">
        <h3 className="page-title">Add User</h3>
        <div className="settings__password">
          <h2>Add User</h2>
          <Form>
            <FormGroup>
              <Label for="dealerName">Dealer Name</Label>
              <Input
                id="dealerName"
                type="text"
                value={name}
                onChange={event => this.setState({ name: event.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dealerEmail">Dealer Email</Label>
              <Input
                id="dealerEmail"
                type="email"
                value={email}
                onChange={event => this.setState({ email: event.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dealerMobile">Dealer Mobile</Label>
              <Input
                id="dealerMobile"
                type="tel"
                value={mobile}
                onChange={event => this.setState({ mobile: event.target.value.replace(/\D/, '') })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dealerDesignation">Designation</Label>
              <Input
                id="dealerDesignation"
                type="text"
                value={designation}
                onChange={event => this.setState({ designation: event.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dealerAddress">Dealer Address</Label>
              <Input
                id="dealerAddress"
                type="textarea"
                value={address}
                onChange={event => this.setState({ address: event.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dealerPassword">Password</Label>
              <Input
                id="dealerPassword"
                type="text"
                value={password}
                onChange={event => this.setState({ password: event.target.value })}
              />
            </FormGroup>
          </Form>
          <div className="align__buttonRight">
            <DefaultModal
              color="primary"
              title="Congratulations!"
              btn="Add User"
              message="User Created Successfully. Create another user"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AddUserSettings;
