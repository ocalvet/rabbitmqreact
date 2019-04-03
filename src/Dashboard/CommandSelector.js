import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const CommandSelector = ({ classes, value, handleChange, name, commands, label }) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor="tmc-simple">{label}</InputLabel>
    <Select
      value={value}
      onChange={handleChange}
      inputProps={{
        name: name,
        id: name
      }}
    >
      <MenuItem value="">
        <em>Select a command</em>
      </MenuItem>
      {commands.map(command => {
        return (
          <MenuItem key={command.id} value={command.id}>
            {command.label}
          </MenuItem>
        );
      })}
    </Select>
  </FormControl>
);

export default CommandSelector;
