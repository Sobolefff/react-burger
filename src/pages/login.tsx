import {
    Button,
    PasswordInput,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from '../services/store';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { loginUser } from '../services/actions/auth';
import styles from './login.module.css';
import { TLocationState } from '../utils/types';

export const LoginPage: FC = () =>  {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isUserAuthorized = useSelector(
        (store) => store.user.isUserAuthorized
    );
    const { state } = useLocation<TLocationState>();

    if (isUserAuthorized) {
        return <Redirect to={state?.from || '/'} />;
    }

    const login = (e: React.FormEvent<HTMLFormElement>, email: string , password: string) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className={styles.wrap}>
            <p className="text text_type_main-medium">Вход</p>
            <form className={styles.form} onSubmit={(e) => login(e, email, password)}>
                <div className={styles.email}>
                    <Input
                        onChange={onEmailChange}
                        value={email}
                        type="email"
                        placeholder="E-mail"
                    />
                </div>
                <div className={styles.password}>
                    <PasswordInput
                        onChange={onPasswordChange}
                        name={'password'}
                        value={password}
                    />
                </div>
                <div className={styles.button}>
                    <Button htmlType='submit' type="primary" size="large">
                        Войти
                    </Button>
                </div>
            </form>
            <div className={styles.textcontainer}>
                <p
                    className={
                        'text text_type_main-default text_color_inactive'
                    }
                >
                    Вы - новый пользователь?&nbsp;
                </p>
                <Link
                    to="/register"
                    className={`${styles.activetext} text text_type_main-default`}
                >
                    Зарегистрироваться
                </Link>
            </div>
            <div className={styles.textcontainer}>
                <p
                    className={
                        'text text_type_main-default text_color_inactive'
                    }
                >
                    Забыли пароль?&nbsp;
                </p>
                <Link
                    to="/forgot-password"
                    className={`${styles.activetext} text text_type_main-default`}
                >
                    Восстановить пароль
                </Link>
            </div>
        </div>
    );
}
