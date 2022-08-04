import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppStyle from './app.module.css';

const App = () => {
    return (
      <div className={AppStyle.app}>
        <AppHeader />
        <main className={`${AppStyle.main} pl-5`}>
          <BurgerIngredients />
          <BurgerConstructor type="bun" />
        </main>
      </div>
    )
}

export default App;
