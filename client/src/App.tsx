import './App.css';
import { Outlet, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './auth/protected-route';
import Application from './components/Applications/Application';
import Applications from './components/Applications/Applications';
import ProfilePage from './components/Applications/ProfilePage';
import Dashboard from './components/Dashboard/Dashboard';
import ProcessPage from './components/Processes/ProcessPage';
import ErrorBoundary from './utils/error-boundary';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import Header from './components/Header/Header';
import Main from './components/Processes/Main';

const RootLayout = () => (
  <Auth0ProviderWithHistory>
    <Header/>
    <Outlet/>
  </Auth0ProviderWithHistory>
)

const router = createBrowserRouter([
  {
    element: <RootLayout/>, 
    children: [
      {path: "/", element: <ProtectedRoute component = {Main}/>},
      {path: "/profile", element: <ProtectedRoute component = {ProfilePage}/>},
      {path: "/:processId", element: <ProtectedRoute component = {ProcessPage}/>},
      {path: '/:processId/dashboard', element: <ProtectedRoute component = {Dashboard}/>},
      {path: '/:processId/applications', element: <ProtectedRoute component = {Applications}/>},
      {path: '/:processId/applications/:id', element: <ProtectedRoute component = {Application}/>},
    ]
  }
])



function App() {
  return (
      <ErrorBoundary>
        <RouterProvider router={router}/>
      </ErrorBoundary>
  );
}


export default App;
