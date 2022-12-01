import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from '../services/store';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { resetPassword } from '../services/actions/auth';
import styles from './forgot-password.module.css';

export const ForgotPasswordPage: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const isForgotPassword = useSelector(store => store.user.isForgotPassword);
    const isUserAuthorized = useSelector(store => store.user.isUserAuthorized);
    
    
    const resetUserPassword = (e: React.FormEvent<HTMLFormElement>, email: string) => {
        e.preventDefault();
        dispatch(resetPassword(email, redirectOnSuccess), [dispatch]);
    }

    const redirectOnSuccess = () => {
        history.replace({
            pathname: "/reset-password",
            state: { from: "/forgot-password" },
        });
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

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
            <form onSubmit={(e) => email && resetUserPassword(e, email)}>
                <Input
                    onChange={onEmailChange}
                    value={email}
                    type={'email'}
                    placeholder={'E-mail'}
                />
                <div className={styles.button}>
                    <Button htmlType='submit' type="primary" size="large">Восстановить</Button>
                </div>
            </form>
            <div className={styles.textcontainer}>
                <p className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?&nbsp;</p>
                <Link to="/login" className={`${styles.activetext} text text_type_main-default`}>Войти</Link>
            </div>
        </div>
    )
}