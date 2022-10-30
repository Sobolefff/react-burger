import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../services/actions/auth';

export const AuthorizedRoute = ({ children, ...rest }) => {
    const dispatch = useDispatch();
    const isUserAuthorized = useSelector(
        (store) => store.user.isUserAuthorized
    );

    useEffect(() => dispatch(getUserInfo()), [dispatch]);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isUserAuthorized ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
};
