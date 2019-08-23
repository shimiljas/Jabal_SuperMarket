/* eslint-disable  */
/* eslint-disable  */
import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Textarea = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div style={{ width: '49%' }}>
    <Input {...input} placeholder={label} type={'textarea'} />
    {touched &&
      ((error && <span style={{ color: 'red' }}>{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
);

export default Textarea;
