/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    // changeToDark: PropTypes.func.isRequired,
    // changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    // const { changeToDark, changeToLight } = this.props;
    return (
      <div className='sidebar__content'>
        <ul className='sidebar__block'>
          <SidebarLink
            icon='chart-bars'
            title='Dashboard'
            route='/pages/dashboard'
            onClick={this.hideSidebar}
          />
          <SidebarCategory icon='diamond' title='Sales'>
            <SidebarLink
              title='Create'
              route='/pages/sales/new'
              onClick={this.hideSidebar}
            />
            <SidebarLink
              title='Offer Setting'
              route='/pages/sales/lmit'
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
