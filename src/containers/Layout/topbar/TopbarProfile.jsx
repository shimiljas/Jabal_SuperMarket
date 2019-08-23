/* eslint-disable  */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import { logOut } from '../../LogIn/LoginAction';
import _ from 'lodash';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;
class TopbarProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  logout = () => {
    const { logOut, hisotry } = this.props;
    logOut();
  };

  render() {
    const { collapse } = this.state;

    return (
      <div className='topbar__profile'>
        <button type='button' className='topbar__avatar' onClick={this.toggle}>
          <p className='topbar__avatar-name'>Jabal</p>
          <DownIcon className='topbar__icon' />
        </button>
        {collapse && (
          <button
            type='button'
            className='topbar__back'
            onClick={this.toggle}
          />
        )}
        <Collapse isOpen={collapse} className='topbar__menu-wrap'>
          <div className='topbar__menu'>
            {/* <TopbarMenuLink title="Profile" icon="list" path="/pages/profile" /> */}
            {/* <div className="topbar__menu-divider" /> */}
            <TopbarMenuLink title='Log Out' icon='exit' onClick={this.logout} />
          </div>
        </Collapse>
      </div>
    );
  }
}

export default connect(
  null,
  { logOut },
)(TopbarProfile);
