import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';

export function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const saveNewPassword = (e) => {
        e.preventDefault();

        setPassword("");
        setCode("");
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
      const onCodeChange = (e) => {
        setCode(e.target.value);
      };

    return (
        <div className={styles.wrap}>
            <p className={`text text_type_main-medium mb-6`}>Восстановление пароля</p>
            <form className={styles.form} onSubmit={(e) => saveNewPassword(e)}>
                <div className='mb-6'>
                    <PasswordInput
                    placeholder={"Введите новый пароль"}
                    onChange={onPasswordChange}
                    value={password}
                    name={"password"}
                    />
                </div>
                <Input
                    type={"text"}
                    placeholder={"Введите код из письма"}
                    onChange={onCodeChange}
                    value={code}
                    name={"code"}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                />
                <div className='mt-6 mb-20'>
                    <Button type="primary" size="large">Сохранить</Button>
                </div>
            </form>
            <div className={styles.textcontainer}>
                <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Вспомнили пароль?&nbsp;</p>
                <Link to="/login" className={`${styles.activetext} text text_type_main-default`}>Войти</Link>
            </div>
        </div>
    )
}