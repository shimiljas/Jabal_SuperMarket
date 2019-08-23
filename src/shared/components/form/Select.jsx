/* eslint-disable */
import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import _ from 'lodash';

class SelectField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ]).isRequired,
  };

  static defaultProps = {
    placeholder: '',
    options: [],
  };
  state = { defaultValue: {} };
  handleChange = selectedOption => {
    const { onChange, priceChange } = this.props;
    onChange(selectedOption);
    priceChange(selectedOption);
  };

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.defaultValue)) {
      this.setState({ defaultValue: nextProps.defaultValue });
    }
  }

  render() {
    const { value, name, placeholder, options } = this.props;
    const { defaultValue } = this.state;
    console.log(defaultValue, 'defaultValuedefaultValue');
    return (
      <Select
        name={name}
        value={value}
        onChange={this.handleChange}
        options={options}
        defaultValue={defaultValue}
        clearable={false}
        className='react-select'
        placeholder={placeholder}
        classNamePrefix='react-select'
      />
    );
  }
}

const renderSelectField = props => {
  const {
    input,
    meta,
    options,
    placeholder,
    value,
    defaultValue,
    priceChange,
  } = props;
  return (
    <div className='form__form-group-input-wrap'>
      <SelectField
        {...input}
        options={options}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        priceChange={priceChange}
      />
      {meta.touched && meta.error && (
        <span className='form__form-group-error'>{meta.error}</span>
      )}
    </div>
  );
};

renderSelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  placeholder: PropTypes.string,
};

renderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: '',
};

export default renderSelectField;
