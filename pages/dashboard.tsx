import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { withSSRAuth } from '../utils/withSSRAuth';
import { api } from '../services/apiClient';
import { setupAPIClient } from '../services/api';
import { Can } from '../components/Can';
export default function Dashbord(){

    const { user, signOut } = useContext(AuthContext)

    useEffect(() => {
        api.get('/me')
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }, [])

    return(
        <>
            <h1>dashbord: {user?.email}</h1>
            <button onClick={signOut}>SignOut</button>
            <Can permissions={['metrics.list']}>
                <h1>Métricas</h1>
            </Can>
        </>
    )
}

export const getServerSideProps = withSSRAuth(async(ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me');
    
    console.log(response)

    return {
        props: {}
    }
})