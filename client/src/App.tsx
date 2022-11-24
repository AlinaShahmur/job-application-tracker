import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import './App.css';
import {ProcessesPage} from './components/Processes/ProcessesPage';
import { BASE_URL } from './utils/constants';
import ErrorBoundary from './utils/error-boundary';
import { fetchData } from './utils/request_client';

function App() {
  const { user, getIdTokenClaims  }: any = useAuth0();
  useEffect(() => {
    const createUserIfNeed = async function(email: string) {
      const token: any = await getIdTokenClaims();
      await fetchData('GET',null, `${BASE_URL}/api/users/${email}`, token.__raw);
    }
    createUserIfNeed(user.email);
  })
  return (
    <ErrorBoundary>
      <div className="app">
        <ProcessesPage/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
