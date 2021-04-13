import React from "react";
import { Redirect, Route, useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function AuthenticatedRoute({ children, restrict, ...rest }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  return (
    <Route {...rest}>
      {isAuthenticated && role === restrict ? (
        children
      ) : (
        <Redirect to={`/login?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}
