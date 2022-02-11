import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { withSSRAuth } from '../utils/withSSRAuth';
import { api } from '../services/apiClient';
import { setupAPIClient } from '../services/api';
export default function Dashbord(){

    const { user } = useContext(AuthContext)

    useEffect(() => {
        api.get('/me')
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }, [])

    return(
        <h1>dashbord: {user?.email}</h1>
    )
}

export const getServerSideProps = withSSRAuth(async(ctx) => {
    const apiClient = setupAPIClient();
    const response = await apiClient.get('/me');

    console.log(response.data)
    return {
        props: {}
    }
})