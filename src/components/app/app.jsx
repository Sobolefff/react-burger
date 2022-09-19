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
        </Switch>
      </div>
    )
}

export default App;
