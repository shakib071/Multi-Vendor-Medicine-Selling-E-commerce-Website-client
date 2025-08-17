import React from 'react';
import useAuth from '../Hooks/getAuth/useAuth'
import Loading from '../Components/Loading/Loading';
import { Navigate, useLocation, useNavigation } from 'react-router';

const PrivateRouter = ({children}) => {
    const {user,loading} = useAuth();
    const navigation = useNavigation();
    const location = useLocation();

    if(loading || navigation.state == 'loading'){
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