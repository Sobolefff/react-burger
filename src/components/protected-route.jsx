import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../services/actions/auth";

export const ProtectedRoute = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);

    useEffect(() => dispatch(getUserInfo()), [dispatch]);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isUserAuthorized ? (children) 
                : (
                    <Redirect
                        to={{
                        pathname: "/login",
                        state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};