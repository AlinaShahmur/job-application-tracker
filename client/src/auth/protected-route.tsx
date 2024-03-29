
import {  withAuthenticationRequired } from '@auth0/auth0-react';
import Loader from '../components/UI/Loader';


function ProtectedRoute({ component }: any) {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => <Loader />,
      });
    
      return <Component />;
}


export default ProtectedRoute;