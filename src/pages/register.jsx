import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../services/actions/auth';
import styles from './register.module.css';

export function RegisterPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = useCallback(
        (e) => {
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

    const onNameChange = (e) => {
        setName(e.target.value);
    };
    
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onEmailChange = (e) => {
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
                        onChange={onEmailChange}
                        type="email"
                        placeholder='E-mail'
                    />
                </div>
                <div className={styles.password}>
                    <PasswordInput className={styles.password} onChange={onPasswordChange} name={"password"} />
                </div>
                <div className={styles.button}>
                    <Button type="primary" size="large">Зарегистрироваться</Button>
                </div>
            </form>
            <div className={styles.textcontainer}>
                <p className={'text text_type_main-default text_color_inactive'}>Уже зарегистрированы?&nbsp;</p>
                <Link to="/login" className={`${styles.activetext} text text_type_main-default`}>Войти</Link>
            </div>
        </div>
    );
}