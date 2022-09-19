import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { loginUser } from '../services/actions/auth';
import styles from './login.module.css';


export function LoginPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state } = useLocation();
    const isUserAuthorized = useSelector(store => store.user.isUserAuthorized);

    if (isUserAuthorized) {
        return <Redirect to={state?.from || "/"} />;
      }

    const login = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className={styles.wrap}>
            <p className="text text_type_main-medium">Вход</p>
            <form
                className={styles.form}
                onSubmit={(e) => login(e)}
            >
                <div className={styles.email}>
                    <EmailInput
                        onChange={onEmailChange}
                        name={"email"}
                        value={email}
                    />
                </div>
                <div className={styles.password}>
                    <PasswordInput
                        onChange={onPasswordChange}
                        name={"password"}
                        value={password}
                    />
                </div>
                <div className={styles.button}>
                    <Button type="primary" size="large">Войти</Button>
                </div>
            </form>
            <div className={styles.textcontainer}>
            <p className={'text text_type_main-default text_color_inactive'}>Вы - новый пользователь?&nbsp;</p>
            <Link to="/register" className={`${styles.activetext} text text_type_main-default`}>Зарегистрироваться</Link>
            </div>
            <div className={styles.textcontainer}>
                <p className={'text text_type_main-default text_color_inactive'}>Забыли пароль?&nbsp;</p>
                <Link to="/forgot-password" className={`${styles.activetext} text text_type_main-default`}>Восстановить пароль</Link>
            </div>
        </div>
    );
}