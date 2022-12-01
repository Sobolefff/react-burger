import React, { useEffect, FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector, useDispatch } from '../services/store';
import { getUserInfo } from "../services/actions/auth";
import { TProtectedRouteProps } from "../utils/types";

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);

    useEffect(() => { dispatch(getUserInfo()); }, [dispatch]);

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