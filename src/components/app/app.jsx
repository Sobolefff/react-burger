import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppStyle from './app.module.css';
import { fetchData } from '../../utils/api';
import { useEffect, useState } from 'react';

const App = () => {
  const [state, setLoadedState] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    setLoadedState({ ...state, hasError: false, isLoading: true });
    fetchData()
      .then((obj) =>
        setLoadedState({ ...state, data: obj.data, isLoading: false })
      )
      .catch((e) => {
        setLoadedState({ ...state, hasError: true, isLoading: false });
      });
  }

    return (
      <div className={AppStyle.app}>
        <AppHeader />
        <main className={`${AppStyle.main} pl-5`}>
          {state.isLoading && "Загрузка..."}
          {state.hasError && "Произошла ошибка"}
          {!state.isLoading && !state.hasError && (
            <>
              <BurgerIngredients data={state.data} />
              <BurgerConstructor data={state.data} />
            </>
          )}
        </main>
      </div>
    )
}

export default App;
