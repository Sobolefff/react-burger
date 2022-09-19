import { useCallback } from 'react';
import headerStyles from './app-header.module.css';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';

const AppHeader = () => {
    const history = useHistory();

    const onClick = useCallback(() => {
        history.replace({ pathname: "/" });
    }, [history]);

    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.wrap}>
                <nav>
                    <ul className={headerStyles.list}>
                        <li className={`${headerStyles.element} pl-5 pr-5 pb-5 pt-5 mr-2`}><BurgerIcon type='primary' /><span className='text text_type_main-default text_color_inactive pl-2' onClick={onClick}>Конструктор</span></li>
                        <li className={`${headerStyles.element} pl-5 pr-5 pb-5 pt-5`}><ListIcon type='secondary' /><span className='text text_type_main-default text_color_inactive pl-2'>Лента&nbsp;заказов</span></li>
                    </ul>
                </nav>
                <div onClick={onClick} className={headerStyles.logo}><Logo /></div>
                <Link to='/profile' className={headerStyles.profile}><ProfileIcon type='secondary' /><span className='text text_type_main-default text_color_inactive pl-2'>Личный&nbsp;кабинет</span></Link>
            </div>
        </header>
    );
}

export default AppHeader;