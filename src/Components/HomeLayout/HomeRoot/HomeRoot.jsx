import React from 'react';
import NavBar from '../../NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../../../Footer/Footer';

const HomeRoot = () => {
    return (
        <div className='flex flex-col min-h-screen bg-[#aaa6a669]'> 
            
            <NavBar></NavBar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default HomeRoot;