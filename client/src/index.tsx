import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import './index.css';
import Header from './Components/Header';
import Modal from './Components/Modals';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map((route, idx) => (
          <Route key={idx} path={route.path} element={<route.Component />} />
        ))}
      </Routes>
      <Modal />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
