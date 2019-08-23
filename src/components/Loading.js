/* eslint-disable  */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import * as colors from '../constant/colors';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  render() {
    return (
      <div className='sweet-loading' style={{ textAlign: 'center' }}>
        <ClipLoader
          css={{ minHeight: '200' }}
          sizeUnit={'px'}
          size={35}
          color={colors.primary}
          loading
        />
      </div>
    );
  }
}
export default Loading;
