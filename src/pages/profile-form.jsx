import React, { useState, useEffect } from 'react';
import styles from './profile-form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../services/actions/auth';

export default function ProfileForm() {

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

    const onNameChange = (e) => {
        setState({ ...state, name: e.target.value, isValueChanged: true });
    };
    const onPasswordChange = (e) => {
        setState({ ...state, password: e.target.value });
    };
    const onLoginChange = (e) => {
        setState({ ...state, email: e.target.value, isValueChanged: true });
    };

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
        </form>
    );
}
