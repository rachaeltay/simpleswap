import React from 'react';
import { TextField } from '@mui/material';

const ValueSelect = ({ label, name, updateValue, text, readOnly = false }) => {
  return (
    <TextField
      id='outlined-basic'
      label={label}
      variant='outlined'
      type='number'
      name={name}
      onChange={updateValue}
      value={text}
      InputProps={{ inputProps: { min: 0, readOnly } }}
    />
  );
};
export default ValueSelect;
