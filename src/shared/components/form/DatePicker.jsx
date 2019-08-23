/* eslint-disable  */
import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class DatePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      startDate: null,
    };
  }

  handleChange = date => {
    const { onChange } = this.props;
    this.setState({
      startDate: date,
    });
    onChange(date);
  };

  render() {
    const { startDate } = this.state;

    return (
      <div className='date-picker'>
        <DatePicker
          className='form__form-group-datepicker'
          selected={startDate}
          onChange={this.handleChange}
          dateFormat='Pp'
          dropDownMode='select'
        />
      </div>
    );
  }
}

const renderDatePickerField = props => {
  const { input, meta } = props;
  const { touched, error, warning } = meta;
  console.log(touched, '---------------9090909');
  return (
    <div>
      <DatePickerField {...input} error={error} />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

renderDatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
};

export default renderDatePickerField;
