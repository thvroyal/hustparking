import React from 'react';
import { withRouter } from 'react-router';

const Footer = React.memo(() => (
  <footer className="sticky-footer bg-white">
    <div className="container my-auto">
      <div className="copyright text-center my-auto">
        <span>Copyright &copy; SANSLAB 2020</span>
      </div>
    </div>
  </footer>
));

export default withRouter(Footer);
