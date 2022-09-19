import AppHeader from '../app-header/app-header';
import AppStyle from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';

const App = () => {
  
  

    return (
      <div className={AppStyle.app}>
        <AppHeader />
        <Switch>
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
        </Switch>
      </div>
    )
}

export default App;
