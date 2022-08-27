import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppStyle from './app.module.css';
import { fetchData } from '../../utils/api';
import { useCallback, useEffect, useState } from 'react';
import { BurgerConstructorContext } from '../../services/BurgerConstructorContext';

const App = () => {
  const [state, setLoadedState] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });

  const getIngredients = useCallback((state) => {
    setLoadedState({ ...state, hasError: false, isLoading: true });
    fetchData()
      .then((obj) =>
        setLoadedState({ ...state, data: obj.data, isLoading: false })
      )
      .catch((e) => {
        setLoadedState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

  useEffect(() => {
    getIngredients();
  }, []);

    return (
      <div className={AppStyle.app}>
        <AppHeader />
        <BurgerConstructorContext.Provider value={state}>
          <main className={`${AppStyle.main} pl-5`}>
            {state.isLoading && "Загрузка..."}
            {state.hasError && "Произошла ошибка"}
            {!state.isLoading && !state.hasError && (
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            )}
          </main>
        </BurgerConstructorContext.Provider>
      </div>
    )
}

export default App;
