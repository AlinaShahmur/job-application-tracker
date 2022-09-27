import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { REDIRECT_URL } from '../utils/constants';

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
      redirectUri = {REDIRECT_URL}
      onRedirectCallback = {onRedirectCallback}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;