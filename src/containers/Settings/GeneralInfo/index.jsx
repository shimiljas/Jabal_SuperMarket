/* eslint-disable  */
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

import { updateGeneralInfo, getGeneralInfo } from './GeneralActions';
import Loading from '../../../components/Loading';
import PasswordContainer from './PasswordContainer';
import GeneralContainer from './GeneralContainer';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile: '',
      address: '',
      postal: '',
      city: '',
      userState: '',
      modal: false,
      modalContent: null,
    };
  }

  componentDidMount() {
    const { getGeneralInfo } = this.props;
    getGeneralInfo();
  }

  saveUser = () =>
    this.setState({
      modal: true,
      modalContent: 'Updated user information successfully.',
    });

  changePassword = newPassword => {
    const { updateGeneralInfo } = this.props;

    updateGeneralInfo({ password: newPassword });
    this.setState({ modal: true, modalContent: 'Updated user password.' });
  };
  saveGeneral = obj => {
    console.log({
      name: obj.name,
      address: obj.address,
      zipCode: obj.zipCode,
    });
    const { updateGeneralInfo } = this.props;

    updateGeneralInfo({
      name: obj.name,
      address: obj.address,
      zipCode: obj.zipCode,
    });
    this.setState({ modal: true, modalContent: 'Updated user information.' });
  };

  toggleModalOff = () =>
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));

  render() {
    const { modal, modalContent } = this.state;
    const { loader, screenloader, general } = this.props;
    if (screenloader) {
      return (
        <div className='dashboard'>
          <h3 className='page-title'>General Information</h3>
          <div className='dashboard__demands' />
          <Loading />
        </div>
      );
    }
    return (
      <div className='settings'>
        <div className='arrange-generalInfo'>
          <div>
            <h3 className='page-title'>General Information</h3>
            {/*  */}
            <GeneralContainer data={general} saveGeneral={this.saveGeneral} />
          </div>
          {/*  */}
          <PasswordContainer changePassword={this.changePassword} />
        </div>
        <Modal
          isOpen={modal}
          className='modalClass'
          toggle={this.toggleModalOff}
        >
          <ModalHeader toggle={this.toggleModalOff}>Baskat Info</ModalHeader>
          {loader ? (
            <div style={{ marginTop: 10 }}>
              <Loading />
            </div>
          ) : (
            <ModalBody>{modalContent || 'Success'}</ModalBody>
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToPops = state => ({
  loader: state.general.loader,
  screenloader: state.general.screenloader,
  general: state.general.general,
});

export default connect(
  mapStateToPops,
  { updateGeneralInfo, getGeneralInfo },
)(Settings);
