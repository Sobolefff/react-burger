import AppHeader from '../app-header/app-header';
import AppStyle from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
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

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const data = useSelector((store) => store.ingredients.data);
  const isForgotPassword = useSelector((store) => store.user.isForgotPassword);
  const isUserAuthorized = useSelector((store) => store.user.isUserAuthorized);

  const background = location.state && location.state.background;

  return (
    <div className={AppStyle.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/register' exact={true}>
          <RegisterPage />
        </Route>
        <Route path='/forgot-password' exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password' exact={true}>
          <ResetPasswordPage />
        </Route>
        {!isUserAuthorized && (
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
        )}
        {isForgotPassword && (
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
        )}
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <DetailsModal title="Детали ингредиента">
            <IngredientsDetails data={data} />
          </DetailsModal>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
