import React, { useState } from 'react';
import styles from './profile.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { logoutUser } from '../services/actions/auth';
import ProfileForm from './profile-form';

export function ProfilePage() {
    const dispatch = useDispatch();
    const logout = () => dispatch(logoutUser());
    const { path } = useRouteMatch();
    const [isHistoryLinkActive, setHistoryLinkActive] = useState(false);

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.navblock}>
                    <ul className={styles.nav}>
                        <li>
                            <NavLink
                                exact
                                to="/profile"
                                className={`${styles.link} pt-4 pr-5 pb-4 mr-2 text text_type_main-medium text_color_inactive`}
                                activeClassName={styles.textactive}
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                exact
                                to="/profile/orders"
                                className={`${styles.link} pt-4 pr-5 pb-4 mr-2 text text_type_main-medium text_color_inactive`}
                                activeClassName={styles.textactive}
                            >
                                История заказов
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                exact
                                to="/login"
                                className={`${styles.link} pt-4 pr-5 pb-4 mr-2 text text_type_main-medium text_color_inactive`}
                                activeClassName={styles.textactive}
                                onClick={logout}
                            >
                                Выход
                            </NavLink>
                        </li>
                    </ul>
                    <div className={styles.footer}>
                        <p className={ !isHistoryLinkActive ? 'mt-20 text text_type_main-default text_color_inactive' : `${styles.hiddentext}`}
                            
                        >
                            В этом разделе вы можете изменить&nbsp;свои
                            персональные данные
                        </p>
                    </div>
                </div>
                <Switch>
                    <Route exact path={path} children={<ProfileForm />} />
                    {/* <Route
                        exact
                        path={`${path}/orders`}
                        children={<Orders />}
                    /> */}
                </Switch>
            </div>
        </div>
    );
}
