import React from 'react';
import NavBar from '../../NavBar/NavBar';
import { Outlet } from 'react-router';

const Auth = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Auth;