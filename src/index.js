import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UIComponentProvider, createSapoTheme } from '@sapo-presentation/sapo-ui-components';
import { Provider } from 'react-redux';
import reduxStore from './reduxStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = reduxStore()

const customTheme = createSapoTheme({ coefficient: 10 / 16 });
root.render(
  <UIComponentProvider theme={customTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </UIComponentProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
