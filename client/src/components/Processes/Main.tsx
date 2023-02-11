import '../../App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { ProcessesPage } from '../../components/Processes/ProcessesPage';
import { BASE_URL } from '../../utils/constants';
import { fetchData } from '../../utils/request_client';

function Main() {
  const { user, getIdTokenClaims  }: any = useAuth0();
  useEffect(() => {
    const createUserIfNeed = async function(email: string) {
      const token: any = await getIdTokenClaims();
      await fetchData('GET',null, `${BASE_URL}/api/users/${email}`, token.__raw);
    }
    createUserIfNeed(user.email);
  },[getIdTokenClaims, user.email])
  return (
      <div className="app">
        <ProcessesPage/>
      </div>
  );
}


export default Main;
