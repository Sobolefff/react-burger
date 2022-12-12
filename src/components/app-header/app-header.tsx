import { useEffect, FC } from 'react';
import headerStyles from './app-header.module.css';
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { refreshTokenAction } from '../../services/actions/auth';

export const AppHeader: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        setInterval(() => {
            dispatch(refreshTokenAction());
        }, 1140000);
    }, []);

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.wrap}>
                <nav>
                    <ul className={headerStyles.list}>
                        <Link
                            className={`${headerStyles.element} pl-5 pr-5 pb-5 pt-5`}
                            to='/'
                        >
                            <BurgerIcon type="secondary" />
                            <span
                                className="text text_type_main-default text_color_inactive pl-2"
                            >
                                Конструктор
                            </span>
                        </Link>
                        <Link
                            className={`${headerStyles.element} pl-5 pr-5 pb-5 pt-5`}
                            to='/feed'
                        >
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive pl-2">
                                Лента&nbsp;заказов
                            </span>
                        </Link>
                    </ul>
                </nav>
                <Link className={headerStyles.logo} to='/'>
                    <Logo />
                </Link>
                <Link to="/profile" className={`${headerStyles.profile} pl-5 pr-5 pb-5 pt-5`}>
                    <ProfileIcon type="secondary" />
                    <span className="text text_type_main-default text_color_inactive pl-2">
                        Личный&nbsp;кабинет
                    </span>
                </Link>
            </div>
        </header>
    );
};
