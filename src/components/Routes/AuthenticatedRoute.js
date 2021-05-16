import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

export default function AuthenticatedRoute({ children, restrict, ...rest }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  if (isAuthenticated && !restrict.includes(role)) {
    // console.log("Not Restrict");
    // dispatch(ClearTokenBackend());
    return <Redirect to="/404" />;
  } return (
    <Route {...rest}>
      {isAuthenticated && restrict.includes(role) ? (
        children
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  restrict: PropTypes.arrayOf(PropTypes.number),
};

AuthenticatedRoute.defaultProps = {
  restrict: [0],
};
