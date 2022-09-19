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

const App = () => {
  
  

    return (
      <div className={AppStyle.app}>
        <AppHeader />
        <Switch>
          <Route path='/' exact={true}>
            <HomePage />
          </Route>
        </Switch>
      </div>
    )
}

export default App;
