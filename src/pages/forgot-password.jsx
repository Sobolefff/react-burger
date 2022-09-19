import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css';

export function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    
    const resetPassword = (e, email) => {
        e.preventDefault();

        setEmail("");
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className={styles.wrap}>
            <p className={'text text_type_main-medium mb-6'}>Восстановление пароля</p>
            <form onSubmit={(e) => resetPassword(e)}>
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
                <p className={'text text_type_main-default text_color_inactive'}>Вспомнили пароль?</p>
                <Link to="/login" className={`${styles.activetext} text text_type_main-default`}>Войти</Link>
            </div>
        </div>
    )
}