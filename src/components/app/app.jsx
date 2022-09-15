import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppStyle from './app.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions';
import { useEffect, useRef } from 'react';


const App = () => {
  const oneFetch = useRef(false);

  const dispatch = useDispatch();
  useEffect(() => { 
    if (oneFetch.current === false) {
      dispatch(getIngredients());
    }
    return () => {
      oneFetch.current = true
    }
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
