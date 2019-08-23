/* eslint-disable  */
import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Table, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import * as api from '../../modules/api';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
export default class DashBoard extends Component {
  state = { loader: false, data: [], total: 0 };
  componentDidMount() {
    this.setState({ loader: true });
    let total = 0;
    api
      .getdashboard()
      .then(res => {
        if (res.code == 200) {
          res.data.map(item => {
            total += item.total;
          });

          this.setState({ loader: false, data: res.data, total });
        } else {
          toast.error('Something went wrong');
        }
      })
      .catch(err => {
        this.setState({ loader: false, data: [] });
      });
  }
  render() {
    console.log(this.state.data, 'DSffd------->');
    const { data } = this.state;
    if (this.state.loader) {
      return (
        <div
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Loading />
        </div>
      );
    }

    return (
      <div style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
        <div
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-betwwen',
          }}
        >
          <h3 className='page-title'>Sales</h3>
          <h3 className='page-title'>Total : {this.state.total}</h3>
        </div>

        <div className='accordion-section'>
          <Table striped responsive>
            <tbody>
              <tr>
                <td>Phone Number</td>
                <td>Total</td>
                <td>Discount</td>
              </tr>
              {data.map(item => {
                return (
                  <tr>
                    <td>{item.phone_number}</td>
                    <td>{item.total}</td>
                    <td>{item.discount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
