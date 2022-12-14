import { AppHeader } from '../app-header/app-header';
import AppStyle from './app.module.css';
import { useDispatch, useSelector } from '../../services/store';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProtectedRoute } from '../protected-route';
import { ProfilePage } from '../../pages/profile';
import { DetailsModal } from '../details-modal/details-modal';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { IngredientsDetails } from '../ingredients-details/ingredients-details';
import { closeCurrentIngredient, getIngredients } from '../../services/actions';
import { AuthorizedRoute } from '../authorized-route';
import { FeedPage } from '../../pages/feed';
import { OrderInfo } from '../../pages/order-info';
import { useEffect, useRef, FC } from 'react';
import { TLocationState } from "../../utils/types";

declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<
            any,
            any
        > | null;
    }
}

export const App: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<TLocationState>();

    const oneFetch = useRef(false);
    useEffect(() => {
        if (oneFetch.current === false) {
            dispatch(getIngredients());
        }
        return () => {
            oneFetch.current = true;
        };
    }, [dispatch]);

    const { data } = useSelector((store) => ({
        data: store.ingredients.data,
    }));

    const background = location.state && location.state.background;

    const closeAllModals = () => {
        history.goBack();
        dispatch(closeCurrentIngredient(), [dispatch]);
    };

    return (
        <div className={AppStyle.app}>
            <AppHeader />
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    <HomePage />
                </Route>
                <AuthorizedRoute path="/login" exact={true}>
                    <LoginPage />
                </AuthorizedRoute>
                <AuthorizedRoute path="/register" exact={true}>
                    <RegisterPage />
                </AuthorizedRoute>
                <Route path="/feed" exact={true}>
                    <FeedPage />
                </Route>
                <AuthorizedRoute path="/forgot-password" exact={true}>
                    <ForgotPasswordPage />
                </AuthorizedRoute>
                <AuthorizedRoute path="/reset-password" exact={true}>
                    <ResetPasswordPage />
                </AuthorizedRoute>

                <Route path="/ingredients/:id" exact={true}>
                    <DetailsModal title="???????????? ??????????????????????">
                        <IngredientsDetails data={data} />
                    </DetailsModal>
                </Route>
                <Route path="/profile/orders/:id" exact={true}>
                    <OrderInfo data={data} />
                </Route>
                <Route path="/feed/:id">
                    <OrderInfo data={data} />
                </Route>
                <ProtectedRoute path="/profile">
                    <ProfilePage />
                </ProtectedRoute>
            </Switch>
            {background && (
                <>
                    <ProtectedRoute
                        path="/"
                        exact={true}
                        children={
                            <Modal>
                                <OrderDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path="/feed/:id"
                        children={
                            <Modal onClose={closeAllModals}>
                                <OrderInfo data={data} />
                            </Modal>
                        }
                    />
                    <ProtectedRoute
                        path="/profile/orders/:id"
                        children={
                            <Modal onClose={closeAllModals}>
                                <OrderInfo data={data} />
                            </Modal>
                        }
                    />
                    <Route
                        path="/ingredients/:id"
                        children={
                            <Modal
                                title="???????????? ??????????????????????"
                                onClose={closeAllModals}
                            >
                                <IngredientsDetails data={data} />
                            </Modal>
                        }
                    />
                </>
            )}
        </div>
    );
};

export default App;
