import React from "react";
import {Redirect, Route, useLocation} from "react-router";
import {useSelector} from "react-redux";


export default function AuthenticatedRoute({children, restrict, ...rest}) {
    const {pathname, search} = useLocation();
    const {isAuthenticated, typeUser} = useSelector(state => state.Authenticated);
    return (
        <Route {...rest}>
            {isAuthenticated && typeUser === restrict ? (children) : (
                <Redirect to={`/login?redirect=${pathname}${search}`}/>
            )}
        </Route>
    )
}
