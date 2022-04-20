import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import GlobalStyles from './GlobalStyles';
import './index.css';
import Header from './Components/Header';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={<route.Component />} />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
