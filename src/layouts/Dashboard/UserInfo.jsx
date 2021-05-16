import React from 'react';
import { withRouter } from 'react-router';

function UserInfo() {
  return (
    <h1>Info: User ID</h1>
  );
}

export default React.memo(withRouter(UserInfo));
