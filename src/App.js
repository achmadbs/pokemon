import React from 'react';
import PokemonList from './components/pokemonList/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PokemonDetails from './components/pokemonDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={PokemonList}/>
        <Route path='/pokemon-details/:id' exact component={PokemonDetails}/>
      </Switch>
    </BrowserRouter>
  );
}


export default App;
