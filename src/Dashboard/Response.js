import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({

});

const Response = ({ response, classes }) => {
  return (
    <div>
      <Typography variant="h5">Response:</Typography>
      <pre>{response || <div>No Response available</div>}</pre>
    </div>
  );
};

export default withStyles(styles)(Response);
