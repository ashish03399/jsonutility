import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter, Route} from 'react-router-dom';
import Dashboard from '../Dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Route path="/" name="Home" component={Dashboard} /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
