import React from 'react';
import PokemonList from './index';
import ReactDOM from 'react-dom';

test('render PokemonList', () => {
  const list = document.createElement('div');
  ReactDOM.render(<PokemonList/>, list)
});