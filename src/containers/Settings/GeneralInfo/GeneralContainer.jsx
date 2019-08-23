/* eslint-disable  */
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class GeneralContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      address: '',
      zipCode: '',
      city: '',
      userState: '',
      cc: '',
      number: '',
      firstNameError: '',
      lastNameError: '',
      addressError: '',
      zipCodeError: '',
    };
  }

  componentDidMount() {
    console.log(this.props.data);
    if (!_.isEmpty(this.props.data)) {
      const { email, address, name, zipCode, phone } = this.props.data;
      this.setState({
        email,
        address,
        firstName: name.firstName,
        cc: phone.cc,
        number: phone.number,
        lastName: name.lastName,
        zipCode: zipCode,
      });
    }
  }

  validate = prop => {
    if (prop == 'firstName') {
      const { firstName } = this.state;
      if (firstName.length === 0) {
        this.setState({
          firstNameError: 'First Name should not be blank',
        });
      } else {
        this.setState({
          firstNameError: '',
        });
      }
      return;
    }

    if (prop == 'lastName') {
      const { lastName } = this.state;
      if (lastName.length === 0) {
        this.setState({
          lastNameError: 'Last Name should not be blank',
        });
      } else {
        this.setState({
          lastNameError: '',
        });
      }
      return;
    }
    if (prop == 'address') {
      const { address } = this.state;
      if (address.length === 0) {
        this.setState({
          addressError: 'Address should not be blank',
        });
      } else {
        this.setState({
          addressError: '',
        });
      }
      return;
    }
    if (prop == 'zipCode') {
      const { zipCode } = this.state;
      if (zipCode.length === 0) {
        this.setState({
          zipCodeError: 'Zipcode should not be blank',
        });
      } else {
        this.setState({
          zipCodeError: '',
        });
      }
      return;
    }
  };

  changeValue = (props, value) => {
    this.setState({ [props]: value }, () => {
      this.validate(props);
    });
  };

  saveUser = () => {
    const {
      firstName,
      lastName,
      address,
      zipCode,
      firstNameError,
      lastNameError,
      addressError,
      zipCodeError,
    } = this.state;

    if (
      firstNameError.length == 0 &&
      lastNameError.length == 0 &&
      zipCodeError.length == 0 &&
      addressError.length == 0
    ) {
      this.props.saveGeneral({
        name: `${firstName.replace(/ /g, '')}  ${lastName.replace(/ /g, '')}`,
        address: address,
        zipCode: zipCode,
      });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      mobile,
      address,
      zipCode,
      city,
      cc,
      firstNameError,
      lastNameError,
      addressError,
      zipCodeError,
      number,
      userState,
    } = this.state;
    return (
      <div className='settings__profile'>
        <Form>
          <FormGroup>
            <Label for='dealerName'>Fist Name</Label>
            <Input
              id='firstName'
              type='text'
              value={firstName}
              onChange={event =>
                this.changeValue('firstName', event.target.value)
              }
            />
            {firstNameError && (
              <span style={{ color: 'red' }}>{firstNameError}</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label for='dealerName'>Second Name</Label>
            <Input
              id='lastName'
              type='text'
              value={lastName}
              onChange={event =>
                this.changeValue('lastName', event.target.value)
              }
            />
            {lastNameError && (
              <span style={{ color: 'red' }}>{lastNameError}</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label for='dealerEmail'>Dealer Email</Label>
            <Input
              id='dealerEmail'
              type='email'
              disabled
              value={email}
              onChange={event => this.setState({ email: event.target.value })}
            />
          </FormGroup>
          <div className='profile-user'>
            <div>
              <FormGroup>
                <Label for='dealerMobile'>Country Code</Label>
                <Input
                  id='dealerMobile'
                  type='tel'
                  value={cc}
                  disabled
                  onChange={event =>
                    this.setState({
                      cc: event.target.value.replace(/\D/, ''),
                    })
                  }
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <Label for='dealerMobile'>Mobile Number</Label>
                <Input
                  id='dealerMobile'
                  type='tel'
                  value={number}
                  disabled
                  onChange={event =>
                    this.setState({
                      number: event.target.value.replace(/\D/, ''),
                    })
                  }
                />
              </FormGroup>
            </div>
          </div>

          <FormGroup>
            <Label for='dealerAddress'>Dealer Address</Label>
            <Input
              id='dealerAddress'
              type='textarea'
              value={address}
              onChange={event =>
                this.changeValue('address', event.target.value)
              }
            />
            {addressError && (
              <span style={{ color: 'red' }}>{addressError}</span>
            )}
          </FormGroup>
          <div className='profile-user'>
            <div>
              <FormGroup>
                <Label for='dealerZipCode'>Zip Code</Label>
                <Input
                  id='dealerZipCode'
                  type='number'
                  value={zipCode}
                  onChange={event =>
                    this.changeValue(
                      'zipCode',
                      event.target.value.replace(/\D/, ''),
                    )
                  }
                />
                {zipCodeError && (
                  <span style={{ color: 'red' }}>{zipCodeError}</span>
                )}
              </FormGroup>
            </div>
            {/* <div>
              <FormGroup>
                <Label for='dealerCity'>City</Label>
                <Input
                  id='dealerCity'
                  type='text'
                  value={city}
                  onChange={event =>
                    this.setState({ city: event.target.value })
                  }
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup>
                <Label for='dealerState'>State</Label>
                <Input
                  id='dealerState'
                  type='text'
                  value={userState}
                  onChange={event =>
                    this.setState({ userState: event.target.value })
                  }
                />
              </FormGroup>
            </div> */}
          </div>
        </Form>
        <div className='align__buttonRight'>
          <Button color='primary' size='lg' onClick={() => this.saveUser()}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default GeneralContainer;
