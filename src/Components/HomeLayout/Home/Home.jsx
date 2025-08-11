import React, { use } from 'react';
import NavBar from '../../NavBar/NavBar';
import { Outlet } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const Home = () => {
    const {user} = use(AuthContext);
    console.log(user);
    return (
        <div>
            <p>This is Home</p>
        </div>
    );
};

export default Home;