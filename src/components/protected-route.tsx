import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from '../services/store';
import { TProtectedRouteProps } from "../utils/types";

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, ...rest }) => {
    const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);

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