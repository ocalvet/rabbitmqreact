import React from 'react';

const Response = ({ response }) => {
  return (
    <div>
      Response:
      <pre>{response || <div>No Response available</div>}</pre>
    </div>
  );
};

export default Response;
