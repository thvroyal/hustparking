import React from "react";
import {Redirect, Route} from "react-router";
import {useSelector} from "react-redux";


export default function UnauthenticatedRoute({children, ...rest}) {
    const {isAuthenticated} = useSelector(state => state.Authenticated);
    return (
        <Route {...rest}>
            {!isAuthenticated ? (children) : (
                <Redirect to='/'/>
            )}
        </Route>
    )
}
