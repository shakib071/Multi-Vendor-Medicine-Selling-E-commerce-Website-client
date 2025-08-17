import React from 'react';
import SalerDashboard from './SalerDashboard';
import useRole from '../../Hooks/getUserRole/useRole';
import useAuth from '../../Hooks/getAuth/useAuth';
import Loading from '../Loading/Loading';
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'

const Dashboard = () => {
    const {user,loading} = useAuth();
    const {data: role , isLoading , error} = useRole(user?.uid);
    if(loading || isLoading){
        return <Loading></Loading>
    }
    console.log(user?.uid);
    
    console.log(role, isLoading, error);

    if(role == 'saler'){
        return <SalerDashboard></SalerDashboard>
    }

    if(role == 'admin'){
        return <AdminDashboard></AdminDashboard>
    }

    return <UserDashboard></UserDashboard>
};

export default Dashboard;