import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useCallback, FC } from 'react';
import { useDispatch } from '../services/store';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../services/actions/auth';
import styles from './register.module.css';

export const RegisterPage: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(registerUser(name, email, password, redirectOnSuccess));
        },[email, name, password]
    )

    const redirectOnSuccess = () => {
            history.replace({
            pathname: "/",
            state: { from: "/register" },
            });
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className={styles.wrap}>
            <p className={'text text_type_main-medium'}>Регистрация</p>
            <form className={styles.form} onSubmit={(e) => register(e)}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onNameChange}
                    value={name}
                    name={"name"}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />
                <div className={styles.email}>
                    <Input
                        value=''
                        onChange={onEmailChange}
                        type="email"
                        placeholder='E-mail'
                    />
                </div>
                <div className={styles.password}>
                    <PasswordInput className={styles.password} onChange={onPasswordChange} name={"password"} value='' />
                </div>
                <div className={styles.button}>
                    <Button htmlType='submit' type="primary" size="large">Зарегистрироваться</Button>
                </div>
            </form>
            <div className={styles.textcontainer}>
                <p className={'text text_type_main-default text_color_inactive'}>Уже зарегистрированы?&nbsp;</p>
                <Link to="/login" className={`${styles.activetext} text text_type_main-default`}>Войти</Link>
            </div>
        </div>
    );
}