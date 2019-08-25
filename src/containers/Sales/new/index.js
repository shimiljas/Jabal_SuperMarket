/* eslint-disable  */
import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Button,
  ButtonToolbar,
  Label,
  Input,
  Table,
} from 'reactstrap';
import { Field, reduxForm, getFormSubmitErrors } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import PropTypes from 'prop-types';
import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import renderSelectField from '../../../shared/components/form/Select';
import RenderField from '../../../components/RenderField';
import renderDatePickerField from '../../../shared/components/form/DatePicker';
import Textarea from '../../../shared/components/form/TextArea';
import TextInput from '../../../shared/components/form/TextInput';

import Loading from '../../../components/Loading';
import { connect } from 'react-redux';
import * as api from '../../../modules/api';
import _ from 'lodash';
import moment from 'moment';
import { toast } from 'react-toastify';

const PhoneNumberValdiation = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

class SalesForm extends Component {
  state = {
    loader: false,
    phone_number: '',
    price: '',
    discount: '',
    seaerch_result: {},
  };
  handleSubmit = () => {
    const { loader, phone_number, price, discount } = this.state;

    if (phone_number.length == 0) {
      toast.error('Please add a mobile number');
      return;
    }
    if (isNaN(phone_number)) {
      toast.error('Please add a valid mobile number');
      return;
    }

    if (phone_number.length < 10) {
      toast.error('Please add a valid mobile number');
      return;
    }

    if (!phone_number.match(PhoneNumberValdiation)) {
      toast.error('Please add a valid mobile number');
      return;
    }

    if (price.length == 0) {
      toast.error('Please add a price');
      return;
    }

    let data = {
      phone_number,
      price,
    };
    if (!discount) data.discount = discount;

    console.log(data, 'datadatadata');

    this.setState({ loader: true });
    api
      .submitsale(data)
      .then(res => {
        console.log(res, 'Sdfsdfsdf------------><>');
        debugger;
        if (res.status == 200) {
          toast.success('Purchase added');
          this.setState({
            seaerch_result: res.data,
            loader: false,
            price: '',
            discount: '',
            phone_number: '',
          });
        } else {
          toast.success('Something went wrong');
        }
      })
      .catch(err => {
        toast.success('Something went wrong');
        this.setState({
          seaerch_result: {},
          loader: false,
          price: '',
          discount: '',
          phone_number: '',
        });
      });
  };

  search = () => {
    const { loader, phone_number, price, discount } = this.state;

    if (phone_number.length == 0) {
      toast.error('Please add a mobile number');
      return;
    }
    if (phone_number.length < 10) {
      toast.error('Please add a valid mobile number');
      return;
    }

    if (isNaN(phone_number)) {
      toast.error('Please add a valid number');
      return;
    }

    if (!phone_number.match(PhoneNumberValdiation)) {
      toast.error('Please add a valid mobile number');
      return;
    }

    let data = { phone_number };
    this.setState({ loader: false });
    api
      .searchBynumber(data)
      .then(res => {
        console.log(res, 'Sdfsdfsdf------------><>');
        if (res.status == 200) {
          this.setState({ seaerch_result: res.data, loader: false });
        } else {
          toast.success('No purchase before');
          this.setState({ seaerch_result: {}, loader: false });
        }
      })
      .catch(err => {
        this.setState({ seaerch_result: {}, loader: false });
      });
  };

  render() {
    const {
      loader,
      phone_number,
      price,
      discount,
      seaerch_result,
    } = this.state;

    if (loader) {
      return (
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <div className='card__title'>
                <h5 className='bold-text'>New Sales</h5>
              </div>
              <Loading />
            </CardBody>
          </Card>
        </Col>
      );
    }

    return (
      <div style={{ flex: 1 }}>
        <div
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 50,
            margin: 30,
          }}
        >
          <div className='card__title'>
            <h5 className='bold-text'>New Sale</h5>
          </div>
          <div className='form form--horizontal'>
            <div className='form__form-group'>
              <span className='form__form-group-label'>Phone Number</span>
              <div
                className='form__form-group-field'
                style={{ maxWidth: '50%' }}
              >
                <div className='form__form-group-icon'>+91</div>
                <Input
                  name='phonenumber'
                  type='text'
                  max={10}
                  value={phone_number}
                  onChange={event =>
                    this.setState({
                      phone_number: event.target.value.replace(/\D/, ''),
                    })
                  }
                />

                <ButtonToolbar
                  style={{ marginLeft: '20px', marginTop: '1px' }}
                  className='form__button-toolbar'
                >
                  <button
                    type='button'
                    className='btn btn-primary account__btn account__btn--small'
                    style={{ padding: '4px 25px' }}
                    onClick={this.search}
                  >
                    Search
                  </button>
                </ButtonToolbar>
              </div>
            </div>

            <div className='form__form-group'>
              <span className='form__form-group-label'>Price</span>
              <div
                className='form__form-group-field'
                style={{ maxWidth: '50%' }}
              >
                <Input
                  name='price'
                  type='text'
                  value={price}
                  onChange={event =>
                    this.setState({
                      price: event.target.value.replace(/\D/, ''),
                    })
                  }
                />
              </div>
            </div>
            <div className='form__form-group'>
              <span className='form__form-group-label'>Discount</span>
              <div
                className='form__form-group-field'
                style={{ maxWidth: '50%' }}
              >
                <Input
                  name='discount'
                  type='text'
                  value={discount}
                  onChange={event =>
                    this.setState({
                      discount: event.target.value.replace(/\D/, ''),
                    })
                  }
                />
              </div>
            </div>
            <ButtonToolbar className='form__button-toolbar'>
              <button
                type='button'
                className='btn btn-primary account__btn account__btn--small'
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </ButtonToolbar>
          </div>
        </div>
        {!_.isEmpty(seaerch_result) ? (
          <div
            style={{
              flex: 1,
              backgroundColor: 'white',
              margin: 30,
              padding: 50,
            }}
          >
            <Card>
              <Table striped responsive>
                <tbody>
                  <tr>
                    <td>Phone Number</td>
                    <td>Total</td>
                    <td>Discount</td>
                  </tr>
                  <tr>
                    <td>{seaerch_result.phone_number}</td>
                    <td>{seaerch_result.total}</td>
                    <td>{seaerch_result.discount}</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
            <div style={{ marginHorizontal: 50 }}>
              <Table striped responsive>
                <tbody>
                  {seaerch_result.sales.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{moment(item.date).format('DD/MM/YY')}</td>
                        <td>{item.price}</td>
                        <td />
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SalesForm;
