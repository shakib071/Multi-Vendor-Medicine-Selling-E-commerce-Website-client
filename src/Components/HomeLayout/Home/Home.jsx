import React from 'react';
import NavBar from '../../NavBar/NavBar';
import { Outlet } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useAuth from '../../../Hooks/getAuth/useAuth';

const Home = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <div>
            <p>This is Home</p>
        </div>
    );
};

export default Home;