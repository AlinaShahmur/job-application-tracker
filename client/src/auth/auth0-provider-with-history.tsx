import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { fetchData } from '../utils/request_client';
import { BASE_URL_DEV } from '../utils/constants';

const Auth0ProviderWithHistory = ({ children }: any) => {
  const domain: any = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId: any = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const navigate: any = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri="https://4cee-77-137-66-88.eu.ngrok.io"
      onRedirectCallback = {onRedirectCallback}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;