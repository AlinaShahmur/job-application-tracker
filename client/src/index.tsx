import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Applications from './components/Applications/Applications';
import { createRoot } from "react-dom/client"
import Application from './components/Applications/Application';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import store from './store/index'
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import ProtectedRoute from './auth/protected-route';
import Header from './components/Header/Header';
import ProfilePage from './components/Applications/ProfilePage';
import ProcessPage from './components/Processes/ProcessPage';
import Dashboard from './components/Dashboard/Dashboard';

const rootElement:any = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
          <Header/>
          <Routes>
            <Route path = '/' element = {<ProtectedRoute component = {App}/>}></Route>
            <Route path = '/profile' element = {<ProtectedRoute component = {ProfilePage}/>}></Route>
            <Route path = '/:processId' element = {<ProtectedRoute component = {ProcessPage}/>}></Route>
            <Route path = '/:processId/dashboard' element = {<ProtectedRoute component = {Dashboard}/>}></Route>
            <Route path = '/:processId/applications' element = {<ProtectedRoute component = {Applications}/>}/>
            <Route path = '/:processId/applications/:id' element = {<ProtectedRoute component = {Application}/>}/>
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
