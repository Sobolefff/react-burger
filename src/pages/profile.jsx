import React, { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser, updateUser } from '../services/actions/auth';

export function ProfilePage() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        isValueChanged: false
    });

    const name = useSelector((store) => store.user.user.name);
    const login = useSelector((store) => store.user.user.email);
    const password = useSelector((store) => store.user.user.password);

    useEffect(() => {
        setState((state) => {
            return {
                ...state,
                name,
                email: login,
                password,
                isValueChanged: false
            };
        });
    }, [name, login, password]);

    const logout = () => dispatch(logoutUser());

    const onNameChange = (e) => {
        setState({ ...state, name: e.target.value, isValueChanged: true });
    };
    const onPasswordChange = (e) => {
        setState({ ...state, password: e.target.value, isValueChanged: true });
    };
    const onLoginChange = (e) => {
        setState({ ...state, email: e.target.value, isValueChanged: true });
    };
    const onSave = (e) => {
        e.preventDefault();
        dispatch(updateUser(state.email, state.name));
    }
    const onCancel = () => {
        setState((state) => {
            return {
                ...state,
                name,
                email: login,
                password,
                isValueChanged: false
            };
        });
    };


    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                <div className={styles.navblock}>
                <ul className={styles.navigation}>
                    <li>
                    <NavLink
                        exact
                        to="/profile"
                        className={`${styles.text} 
                    'pt-4',
                    'pb-4',
                    'pr-5',
                    'mr-2',
                    'text text_type_main-medium text_color_inactive`}
                        activeClassName={styles.textactive}
                    >
                        <span>Профиль</span>
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                        exact
                        to="/profile/orders"
                        className={`${styles.text} 
                    'pt-4',
                    'pb-4',
                    'pr-5',
                    'mr-2',
                    'text text_type_main-medium text_color_inactive`}
                        activeClassName={styles.textactive}
                    >
                        <span>История заказов</span>
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                        exact
                        to="/login"
                        className={`${styles.text} 
                    'pt-4',
                    'pb-4',
                    'pr-5',
                    'mr-2',
                    'text text_type_main-medium text_color_inactive`}
                        activeClassName={styles.textactive}
                        onClick={logout}
                    >
                        <span>Выход</span>
                    </NavLink>
                    </li>
                </ul>
                <div className={styles.footer}>
                    <p
                    className={`${styles.subtext} text text_type_main-default text_color_inactive`}
                    >
                    В этом разделе вы можете изменить свои персональные данные.
                    </p>
                </div>
                </div>


                <form className={styles.form} onSubmit={(e) => onSave(e)}>
                    <Input
                    style={{ color: "#8585AD" }}
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onNameChange}
                    value={state.name || ''}
                    name={"name"}
                    icon={"EditIcon"}
                    />
                    <div className={styles.email}>
                    <EmailInput
                        onChange={onLoginChange}
                        style={{ marginTop: '24px', marginBottom: '24px' }}
                        name={"login"}
                        value={state.email || ''}
                        icon={"EditIcon"}
                    />
                    </div>
                    <div className={styles.password}>
                    <PasswordInput
                        className={styles.password}
                        onChange={onPasswordChange}
                        name={"password"}
                        value={state.password || ''}
                    />
                    </div>
                    <span className={state.isValueChanged ? styles.visible: styles.hidden}>
                    <Button size="medium" type="secondary" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button size="medium" type="primary">Сохранить</Button>
                    </span>
                    </form>


                </div>
            </div>
    </>
    )
}