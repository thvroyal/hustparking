import React from "react";
import { Redirect, Route, useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function AuthenticatedRoute({ children, restrict, ...rest }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  if (isAuthenticated && !restrict.includes(role)) {
    // console.log("Not Restrict");
    // dispatch(ClearTokenBackend());
    return <Redirect to="/404" />;
  } else
    return (
      <Route {...rest}>
        {isAuthenticated && restrict.includes(role) ? (
          children
        ) : (
          <Redirect to={`/login?redirect=${pathname}${search}`} />
        )}
      </Route>
    );
}
