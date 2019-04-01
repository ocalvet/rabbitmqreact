import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const LocationEntry = ({ classes, value, handleChange }) => (
  <FormControl variant="outlined" className={classes.formControl}>
    <TextField
      id="location_key_field"
      label="Enter Location Key"
      value={value}
      InputLabelProps={{
        shrink: true
      }}
      onChange={handleChange}
      className={classes.textField}
      margin="normal"
      variant="outlined"
    />
  </FormControl>
);

export default LocationEntry;
