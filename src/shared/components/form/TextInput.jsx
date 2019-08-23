/* eslint-disable  */
import React from 'react';

const TextInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div style={{ width: '49%' }}>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      ((error && <span style={{ color: 'red' }}>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

export default TextInput;
