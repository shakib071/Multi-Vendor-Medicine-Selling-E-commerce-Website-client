import React from 'react';
import useAuth from '../Hooks/getAuth/useAuth'
import Loading from '../Components/Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({children}) => {
    const {user,loading} = useAuth();
    
    const location = useLocation();

    if(loading ){
        return <Loading></Loading>;
    }

    if(user && user?.email){
        return children;
    }
    return (
        <Navigate state={location.pathname} to='/login'></Navigate>
    );
};

export default PrivateRouter;