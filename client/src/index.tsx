import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Applications from './components/Applications/AllApplications/Applications';
import { createRoot } from "react-dom/client"
import Application from './components/Applications/AllApplications/Application';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import appReducer from './store/appReducer'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

const rootElement:any = document.getElementById("root");
const root = createRoot(rootElement);
const appStore = createStore(appReducer)

root.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
          <Routes>
            <Route path='/' element = {<App/>}></Route>
            <Route path = '/applications' element = {<Applications/>}></Route>
            <Route path = '/applications/:id' element = {<Application/>}></Route>
          </Routes>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </Provider>
,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
