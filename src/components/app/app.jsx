import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppStyle from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../../services/reducers/index';
import { getIngredients } from '../../services/actions';
import { useEffect } from 'react';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);


const App = () => {

  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(getIngredients()) 
  }, [dispatch]);

  const { dataRequest, dataFailed } = useSelector(store => ({
    dataRequest: store.ingredients.dataRequest,
    dataFailed: store.ingredients.dataFailed
  }));
  

    return (
      <div className={AppStyle.app}>
        <AppHeader />
          <main className={`${AppStyle.main} pl-5`}>
            {dataRequest && "Загрузка..."}
            {dataFailed && "Произошла ошибка"}
            {!dataRequest && !dataFailed && (
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            )}
          </main>
      </div>
    )
}

export default App;
