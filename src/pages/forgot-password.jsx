import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { resetPassword } from '../services/actions/auth';
import styles from './forgot-password.module.css';

export function ForgotPasswordPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const isForgotPassword = useSelector(store => store.user.isForgotPassword);
    const isUserAuthorized = useSelector(store => store.user.isUserAuthorized);
    
    
    const resetUserPassword = (evt, email) => {
        evt.preventDefault();
        dispatch(resetPassword(email, redirectOnSuccess), [dispatch]);
        //setEmail("");
    }

    const redirectOnSuccess = () => {
        history.replace({
            pathname: "/reset-password",
            state: { from: "/forgot-password" },
        });
    };

    const onEmailChange = (evt) => {
        setEmail(evt.target.value);
    }
    console.log(email);

    if (isUserAuthorized) {
        return (
            <Redirect
                to={{
                pathname: '/'
                }}
            />
        );
    }

    if (!isUserAuthorized && isForgotPassword) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password'
                }}
            />
        );
    }

    return (
        <div className={styles.wrap}>
            <p className={'text text_type_main-medium mb-6'}>Восстановление пароля</p>
            <form onSubmit={(evt) => resetUserPassword(evt)}>
                <EmailInput
                    onChange={onEmailChange}
                    value={email}
                    name={"email"}
                />
                <div className={styles.button}>
                    <Button type="primary" size="large">Восстановить</Button>
                </div>
            </form>
            <div className={styles.textcontainer}>
                <p className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?&nbsp;</p>
                <Link to="/login" className={`${styles.activetext} text text_type_main-default`}>Войти</Link>
            </div>
        </div>
    )
}