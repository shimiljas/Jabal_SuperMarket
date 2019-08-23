/* eslint-disable  */
import React from 'react';

import ReactTable from 'react-table';

export default class TableWithActions extends React.Component {
  render() {
    const { rows, columns, onPageChange, onPageSizeChange } = this.props;
    return (
      <div>
        <ReactTable
          data={rows}
          minRows={0}
          columns={columns}
          onPageChange={onPageChange} // Called when the page index is changed by the user
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    );
  }
}
