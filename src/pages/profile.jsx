import React, { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser, updateUser } from '../services/actions/auth';

export function ProfilePage() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        isValueChanged: false,
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
                isValueChanged: false,
            };
        });
    }, [name, login, password]);

    const logout = () => dispatch(logoutUser());

    const onNameChange = (e) => {
        setState({ ...state, name: e.target.value, isValueChanged: true });
    };
    const onPasswordChange = (e) => {
        setState({ ...state, password: e.target.value });
    };
    const onLoginChange = (e) => {
        setState({ ...state, email: e.target.value, isValueChanged: true });
    };

    useEffect(() => {
        
    },)

    const onSave = (e) => {
        e.preventDefault();
        dispatch(updateUser(state.email, state.name));
    };
    const onCancel = () => {
        setState((state) => {
            return {
                ...state,
                name,
                email: login,
                password,
                isValueChanged: false,
            };
        });
    };

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
                        <p
                            className={
                                'mt-20 text text_type_main-default text_color_inactive'
                            }
                        >
                            В этом разделе вы можете изменить&nbsp;свои
                            персональные данные
                        </p>
                    </div>
                </div>
                <form className={styles.form} onSubmit={(e) => onSave(e)}>
                    <Input
                        style={{ color: '#8585AD' }}
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onNameChange}
                        value={state.name || ''}
                        name={'name'}
                        icon={'EditIcon'}
                    />
                    <div className={styles.email}>
                        <div className={'mt-6 mb-6'}>
                        <EmailInput
                            onChange={onLoginChange}
                            style={{ marginTop: '24px', marginBottom: '24px' }}
                            name={'login'}
                            value={state.email || ''}
                            icon={'EditIcon'}
                        />
                        </div>
                    </div>
                    <div className={`${styles.password} mb-6`}>
                        <PasswordInput
                            className={styles.password}
                            onChange={onPasswordChange}
                            name={'password'}
                            value={state.password || ''}
                        />
                    </div>
                    <span
                        className={
                            state.isValueChanged
                                ? styles.visible
                                : styles.hidden
                        }
                    >
                        <Button
                            size="medium"
                            type="secondary"
                            onClick={onCancel}
                            disabled={state.isValueChanged ? false : true}
                        >
                            Отмена
                        </Button>
                        <Button
                            disabled={state.isValueChanged ? false : true}
                            size="medium"
                            type="primary"
                            onClick={onSave}
                        >
                            Сохранить
                        </Button>
                    </span>
                </form>
            </div>
        </div>
    );
}
