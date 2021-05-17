import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

function querystring(name, url = window.location.href) {
  const namee = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp(`[?&]${namee}(=([^&#]*)|&|#|$)`, 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function whereDirect(redirect, role, target) {
  const regexAdmin = new RegExp('(/dashboard)(.+)?', 'i');
  console.log(regexAdmin.test(redirect));
  if (role === 2) {
    if (redirect === '' || redirect === null || !regexAdmin.test(redirect)) {
      return '/dashboard';
    } return redirect;
  }
  if (role === 1) {
    if (redirect === '' || redirect === null || regexAdmin.test(redirect)) {
      return '/home';
    } return redirect;
  }
  return target;
}

export default function UnauthenticatedRoute({ children, target, ...rest }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const redirect = querystring('redirect');
  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={whereDirect(redirect, role, target)}
        />
      )}
    </Route>
  );
}

UnauthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
};

UnauthenticatedRoute.defaultProps = {
  target: '',
};
