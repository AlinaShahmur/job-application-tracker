import './index.css';
import App from './App';
import { createRoot } from "react-dom/client"
import { Provider } from 'react-redux'
import store from './store/index'
import React from 'react';

const rootElement:any = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

