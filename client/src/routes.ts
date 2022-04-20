import { FunctionComponent } from 'react';
import Home from './Pages/Home';

interface Route {
  path: string;
  Component: FunctionComponent;
}

export const routes: Route[] = [
  {
    path: '/',
    Component: Home,
  },
];
