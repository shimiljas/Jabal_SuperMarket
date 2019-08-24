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

import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import * as api from '../../modules/api';
import _ from 'lodash';
import moment from 'moment';
import { toast } from 'react-toastify';
class LimitForm extends Component {
  state = { loader: false, limit: 1000, discount: 30 };

  componentDidMount() {
    this.setState({ loader: true });
    api
      .fetchLimit()
      .then(res => {
        if (res.status == 200 && res.data) {
          this.setState({
            loader: false,
            limit: res.data.limit,
            discount: res.data.discount,
          });
        }
      })
      .catch(err => {
        this.setState({ loader: false });
      });
  }
  handleSubmit = () => {
    const { loader, limit, discount } = this.state;
    if (limit.length == 0) {
      toast.error('Please add price limit');
      return;
    }

    if (discount.length == 0) {
      toast.error('Please add discount limit');
      return;
    }

    let data = { limit, discount };
    this.setState({ loader: true });
    api
      .setOffer(data)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          this.setState({ loader: false });
          toast.success('Price and discount limit set successfully');
        }
      })
      .catch(err => {
        toast.error('Something went wrong');
        this.setState({ loader: false });
      });
  };

  render() {
    const { loader, limit, discount } = this.state;

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
            <h5 className='bold-text'>Offer Setting</h5>
          </div>
          <div className='form form--horizontal'>
            <div className='form__form-group'>
              <span className='form__form-group-label'>Limit</span>
              <div
                className='form__form-group-field'
                style={{ maxWidth: '50%' }}
              >
                <Input
                  name='price'
                  type='text'
                  value={limit}
                  onChange={event =>
                    this.setState({
                      limit: event.target.value.replace(/\D/, ''),
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
      </div>
    );
  }
}

export default LimitForm;
