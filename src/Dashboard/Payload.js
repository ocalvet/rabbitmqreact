import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const Payload = ({ classes, payload, handleChange }) => {
  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <TextField
        id="outlined-multiline-flexible"
        label="Soap Payload"
        multiline
        rows="10"
        fullWidth
        value={payload}
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
};

export default Payload;
