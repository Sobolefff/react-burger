import React, { useState, useEffect, FC } from 'react';
import styles from './profile-form.module.css';
import { useDispatch, useSelector } from '../services/store';
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../services/actions/auth';
import { TProfileFormProps } from '../utils/types';

export const ProfileForm: FC = () => {

    const dispatch = useDispatch();
    const [state, setState] = useState<TProfileFormProps>({
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

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setState({ ...state, name: e.target.value, isValueChanged: true });
    };
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setState({ ...state, password: e.target.value });
    };
    const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setState({ ...state, email: e.target.value, isValueChanged: true });
    };

    const onSave = (e: React.FormEvent<HTMLFormElement>):void => {
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
                placeholder={'??????'}
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
                    htmlType='reset'
                    size="medium"
                    type="secondary"
                    onClick={onCancel}
                    disabled={state.isValueChanged ? false : true}
                >
                    ????????????
                </Button>
                <Button
                    htmlType='submit'
                    disabled={state.isValueChanged ? false : true}
                    size="medium"
                    type="primary"
                >
                    ??????????????????
                </Button>
        </form>
    );
}
