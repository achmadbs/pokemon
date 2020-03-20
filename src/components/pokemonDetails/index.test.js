import React from 'react';
import PokemonDetails from '../pokemonDetails/index';
import ReactDOM from 'react-dom';

test('render PokemonDetails', () => {
  const details = document.createElement('div');
  ReactDOM.render(<PokemonDetails/>, details)
});