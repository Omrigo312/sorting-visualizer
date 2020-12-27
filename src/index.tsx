import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Body from './components/body/Body';
import NavBar from './components/navbar/NavBar';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <NavBar />
      <Body />
    </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
