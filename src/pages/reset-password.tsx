import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from '../services/store';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { savePassword } from '../services/actions/auth';
import styles from './reset-password.module.css';
import { TLocationState } from '../utils/types';

export const ResetPasswordPage: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const { state } = useLocation<TLocationState>();
    const isForgotPassword = useSelector(
        (store) => store.user.isForgotPassword
    );

    if (!isForgotPassword) {
        return <Redirect to={state?.from || '/'} />;
    }

    const saveNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(savePassword(password, code, redirectOnSuccess), [dispatch]);
        setPassword('');
        setCode('');
    };

    const redirectOnSuccess = () => {
        history.replace({
            pathname: '/login',
            state: { from: '/reset-password' },
        });
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    return (
        <div className={styles.wrap}>
            <p className={`text text_type_main-medium mb-6`}>
                Восстановление пароля
            </p>
            <form className={styles.form} onSubmit={(e) => saveNewPassword(e)}>
                <div className="mb-6">
                    <PasswordInput
                        placeholder={'Введите новый пароль'}
                        onChange={onPasswordChange}
                        value={password}
                        name={'password'}
                    />
                </div>
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onCodeChange}
                    value={code}
                    name={'code'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <div className="mt-6 mb-20">
                    <Button htmlType='submit' type="primary" size="large">
                        Сохранить
                    </Button>
                </div>
            </form>
            <div className={styles.textcontainer}>
                <p
                    className={`${styles.text} text text_type_main-default text_color_inactive`}
                >
                    Вспомнили пароль?&nbsp;
                </p>
                <Link
                    to="/login"
                    className={`${styles.activetext} text text_type_main-default`}
                >
                    Войти
                </Link>
            </div>
        </div>
    );
}
