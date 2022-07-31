import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import AppStyle from './app.module.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <main className={`${AppStyle.main} pl-5`}>
          <BurgerIngredients />
          <BurgerConstructor type="bun" />
        </main>
      </div>
    )
  };
}

export default App;
