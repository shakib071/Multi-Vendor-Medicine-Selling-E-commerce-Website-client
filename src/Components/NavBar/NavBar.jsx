import React, { useEffect, useState } from 'react';
import logoImg  from '../../assets/medicalLogo.png'
import { NavLink, useNavigate, useNavigation } from 'react-router';
import { GiHamburgerMenu } from "react-icons/gi";
import UserAvatar from '../../assets/UserAVatar.png'
import { Link } from 'react-router';
import useAuth from '../../Hooks/getAuth/useAuth';
import Loading from '../Loading/Loading';
import { FaShoppingCart } from "react-icons/fa";
import Swal from 'sweetalert2';

const NavBar = () => {

    const {logOut,user,loading} = useAuth();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());


    const handleLogout = () => {
        logOut()
        .then(() => {
            navigate('/login');
        })
        .catch((error)=>{
            console.log(error);
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            });
        })
    }
    useEffect(() => {
        const timer = setInterval(() => {
        setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    
    if(loading || navigation.state === 'loading'){
        return <Loading></Loading>;
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
                    <NavLink to='/shop'><p className='font-semibold'>Shop</p></NavLink>
                   
                    <NavLink to={`cart/${user?.uid}`}>
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

                <div className='text-[16px] sm:text-lg lg:text-2xl font-semibold  px-4 py-1 rounded-lg'>
                    <p>{formattedTime}</p>
                </div>

                <div className='hidden md:flex  gap-2 items-center md:gap-3 lg:gap-5 text-[11px] sm:text-lg md:text-xl lg:text-2xl xl:text-[29px] 2xl:text-[33px]'>
                   {
                        !user && <NavLink to='/login'><p className='font-semibold'>Join US</p></NavLink>
                   }
                    
                   
                 

                    {user && (
                        <div>
                            <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="font-semibold cursor-pointer">
                                {user?.photoURL ? (
                                <img className="w-11 rounded-full" src={user?.photoURL} alt="photo" />
                                ) : (
                                <img className="w-11" src={UserAvatar} alt="Avatar" />
                                )}
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box shadow-sm w-52 p-2 text-xl font-semibold z-10"
                            >
                                <li>
                                <Link to="/update-profile">Update Profile</Link>
                                </li>
                                <li>
                                <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li onClick={handleLogout}>
                                <Link to="#">Logout</Link>
                                </li>
                            </ul>
                            </div>
                        </div>
                        )}

                    
                    

                </div>

                <div className="md:hidden  dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1"><GiHamburgerMenu className='bg-white text-2xl'/></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box sm:text-lg z-1 w-52 p-2 shadow-sm">
                        <li>
                           {
                            user &&  <div  className="font-semibold flex justify-center cursor-pointer">
                                        {user?.photoURL ? (
                                        <img className="w-11 rounded-full" src={user?.photoURL} alt="photo" />
                                        ) : (
                                        <img className="w-11" src={UserAvatar} alt="Avatar" />
                                        )}
                                    </div>
                           }
                        </li>
                        <li><NavLink to='/'><p className='font-semibold '>Home</p></NavLink></li>
                        <li><NavLink to='/shop'><p className='font-semibold'>Shop</p></NavLink></li>
                        <li><NavLink to={`cart/${user?.uid}`}><p className='font-semibold'>Cart</p></NavLink></li>
                        {!user && <li><NavLink to='/login'><p className='font-semibold'>Join US</p></NavLink></li>}
                        <li><NavLink to='/update-profile'><p className='font-semibold'>Update Profile</p></NavLink></li>
                        <li><NavLink to='/dashboard'><p className='font-semibold'>Dashboard</p></NavLink></li>
                        {user && <li  onClick={handleLogout}><NavLink><p  className='font-semibold'>Logout</p></NavLink></li>}
                    
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default NavBar;