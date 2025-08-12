import React from 'react';
import logoImg  from '../../assets/medicalLogo.png'
import { NavLink, useNavigation } from 'react-router';
import { GiHamburgerMenu } from "react-icons/gi";
import UserAvatar from '../../assets/UserAVatar.png'
import { Link } from 'react-router';
import useAuth from '../../Hooks/getAuth/useAuth';
import Loading from '../Loading/Loading';
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {

    const {logOut,user,loading} = useAuth();
    const navigation = useNavigation();

    if(loading || navigation.state === 'loading'){
        return <Loading></Loading>;
    }

    const handleLogout = () => {
        logOut()
        .then(() => {

        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return (
       <div className='bg-white border-b-2  py-1 md:py-0 sticky top-0 z-50 rounded-lg shadow-xl'>

            <div className='w-[97%] sm:w-[98%] xl:w-[90%] 2xl:w-[90%]  mx-auto flex justify-between items-center'>
                <div>
                    <NavLink to='/'>
                        <div className='flex items-center gap-1'>
                            <img className='w-13 sm:w-15 md:w-16 lg:w-24 mt-2' src={logoImg} alt="logo"/>
                            <p className='text-3xl md:text-2xl lg:text-4xl font-bold text-[#fc03a1]'>CureCart</p>
                        </div>
                    </NavLink>
                    
                </div>
                <div className='hidden md:flex gap-2 sm:gap-6 md:gap-4 lg:gap-6 items-center text-[11px] sm:text-lg md:text-lg lg:text-2xl xl:text-[29px] 2xl:text-[33px]'>
                    <NavLink to='/'><p className='font-semibold '>Home</p></NavLink>
                    <NavLink to='available-cars'><p className='font-semibold'>Shop</p></NavLink>
                   
                    <NavLink to='/'>
                        <FaShoppingCart   color="#3b82f6" />
                    </NavLink>
                    
                    
                    <div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="font-semibold">Languages</div>
                            <ul tabIndex={0} className="dropdown-content menu text-xl font-semibold bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><Link>Bangla</Link></li>
                                <li><Link>English</Link></li>
                                
                            </ul>
                        </div>
                    </div>
                    
        
            

                    
                </div>
                <div className='hidden md:flex  gap-2 items-center md:gap-3 lg:gap-5 text-[11px] sm:text-lg md:text-xl lg:text-2xl xl:text-[29px] 2xl:text-[33px]'>
                   {
                        !user && <NavLink to='/login'><p className='font-semibold'>Join US</p></NavLink>
                   }
                    
                    
                   {
                        user  && 
                        <div>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="font-semibold">
                                    {user?.photoURL != null &&
                                        <img className='w-11 rounded-full' src={user?.photoURL} alt="" />
                                    } 
                                    {user?.photoURL == null &&
                                        <img className='w-17' src={UserAvatar} alt="" />
                                    }
                                    
                                </div>
                                <ul tabIndex={0} className="dropdown-content text-xl font-semibold menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><Link>Update Profile</Link></li>
                                    <li><Link>Dashboard</Link></li>
                                    <li onClick={handleLogout}><Link>Logout</Link></li>
                                    
                                </ul>
                            </div>
                        </div>
                    } 
                    
                    

                </div>

                <div className="md:hidden  dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1"><GiHamburgerMenu className='bg-white text-2xl'/></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box sm:text-lg z-1 w-52 p-2 shadow-sm">
                        <li><NavLink to='/'><p className='font-semibold '>Home</p></NavLink></li>
                        <li><NavLink to='/'><p className='font-semibold'>Available Cars</p></NavLink></li>
                      

                        <li><NavLink to='/'><p className='font-semibold'>Add Car</p></NavLink></li>
                        <li><NavLink to='/'><p className='font-semibold'>My Cars</p></NavLink></li>
                        <li><NavLink to='/'><p className='font-semibold'>My Bookings</p></NavLink></li>
                    
                        <li><NavLink to='/'><p className='font-semibold'>Login</p></NavLink></li>
                      
                        <li><NavLink><p className='font-semibold'>Logout</p></NavLink></li>
                    
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default NavBar;