/* eslint-disable  */
import React from 'react';

const RenderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div style={{ width: '100%' }}>
    <input {...input} placeholder={label} type={type} />
    {touched &&
      ((error && <span style={{ color: 'red' }}>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

export default RenderField;
