import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const LocationEntry = ({ classes, value, handleChange }) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor="tmc-simple">Select Rabbit Instance</InputLabel>
    <Select
      value={value}
      onChange={handleChange}
      inputProps={{
        name: 'connectionInfo',
        id: 'connectionInfo'
      }}
    >
      <MenuItem value={'AS'}>Appsuite (10.10.0.8)</MenuItem>
      <MenuItem value={'AZ'}>Azure (137.117.65.53)</MenuItem>
    </Select>
  </FormControl>
);

export default LocationEntry;
