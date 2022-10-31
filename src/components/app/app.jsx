import AppHeader from '../app-header/app-header';
import AppStyle from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
} from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProtectedRoute } from '../protected-route';
import { ProfilePage } from '../../pages/profile';
import DetailsModal from '../details-modal/details-modal';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientsDetails from '../ingredients-details/ingredients-details';
import { closeCurrentIngredient } from '../../services/actions';
import { AuthorizedRoute } from '../authorized-route';

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const { isUserAuthorized, isForgotPassword, data, ingr } = useSelector(
        (store) => ({
            isUserAuthorized: store.user.isUserAuthorized,
            isForgotPassword: store.user.isForgotPassword,
            data: store.ingredients.data,
            ingr: store.details.currentIngredientDetails,
        })
    );

    const background = location.state && location.state.background;

    const closeAllModals = () => {
        history.goBack();
        dispatch(closeCurrentIngredient(ingr), [dispatch]);
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
                <AuthorizedRoute path="/forgot-password" exact={true}>
                    <ForgotPasswordPage />
                </AuthorizedRoute>
                <AuthorizedRoute path="/reset-password" exact={true}>
                    <ResetPasswordPage />
                </AuthorizedRoute>
                <Route path="/ingredients/:id" exact={true}>
                    <DetailsModal title="Детали ингредиента">
                        <IngredientsDetails data={data} />
                    </DetailsModal>
                </Route>
                <ProtectedRoute path="/profile" exact={true}>
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
                        path="/ingredients/:id"
                        children={
                            <Modal
                                title="Детали ингредиента"
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
