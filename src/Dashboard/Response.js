import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => {
  console.log(theme);
  return {
    code: {
      color: theme.palette.text.primary
    }
  };
};

const Response = ({ response, classes }) => {
  return (
    <div>
      <Typography variant="h5">Response:</Typography>
      <pre className={classes.code}>
        {response || <div>No Response available</div>}
      </pre>
    </div>
  );
};

export default withStyles(styles)(Response);
