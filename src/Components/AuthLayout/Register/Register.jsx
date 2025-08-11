import React, { useState } from 'react';
import googleLogo from '../../../assets/google.png';
import { Link } from 'react-router';
import Lottie from "lottie-react";
import registerAnimation from './register.json';

const Register = () => {
    const [error,setError] = useState('');
    const [userRole,setUserRole] = useState('user');



    const handleRoleChange = (e) =>{
        setUserRole(e.target.value);
    }


    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        const role = userRole;
        console.log(username,email,password,photo,role);
        if(password.length < 6){
            setError('Password must be 6 charecter long');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setError('Must have a Uppercase letter');
            return;
        }  
        else if(!/[a-z]/.test(password)){
            setError('Must have a Lowercase letter');
            return;
        }

    }

    return (
          <div className='relative  flex flex-col md:flex-row justify-center items-center mt-10'>
            
            <div>
                <Lottie className=' absolute inset-0 w-full h-full z-0 ' animationData={registerAnimation} loop={true} />
            </div>

            <div className='relative z-10 bg-[#b6f7ca56] mx-2 px-8 py-11 sm:px-18 md:px-10 md:py-5 lg:px-40 lg:py-20 xl:px-18 xl:py-15 rounded-2xl shadow-2xl font-semibold'>
                <p className='text-center text-3xl text-[#f60b71]'>Register Your Account</p>
                <form onSubmit={handleRegister}  className='' >
                    <div className='flex mt-4 flex-col'>
                        <label className='text-[#f60b71] font-semibold text-xl'>Username</label>
                        <input className='input w-[400px] input-accent' name='username' placeholder='UserName' type="text" required/>
                    </div>  
                    <div className='flex mt-4 flex-col'>
                        <label className='text-[#f60b71] font-semibold text-xl'>Email</label>
                        <input className='input w-[400px] input-accent' name='email' placeholder='Email' type="email" required/>
                    </div> 
                    <div className='flex mt-4 flex-col'>
                        <label className='text-[#f60b71] font-semibold text-xl'>Photo</label>
                        <input className='bg-[#ffffff] py-2 px-3 rounded-lg w-[400px] ' name='photo'  type="file" accept="image/*" required/>
                    </div>
                    <div className='flex mt-4 flex-col'>
                        <label className='text-[#f60b71] font-semibold text-xl'>Password</label>
                        <input className='input w-[400px] input-accent' name='password' placeholder='Password' type="password" required/>
                    </div> 
                    <div className='flex mt-4 flex-col'>
                        <label className='text-[#f60b71] font-semibold text-xl'>Role</label>
                        <select defaultValue="" onChange={handleRoleChange} className="select w-[400px] select-secondary">
                            <option value='' disabled={true}>Select a Role</option>
                            <option value='user'>User</option>
                            <option value='saler'>Saler</option>
                        </select>
                    </div> 
                    <div  className='flex justify-center cursor-pointer items-center mt-4 bg-amber-500 py-2 rounded-4xl'>
                        <p className=''><img className='w-15' src={googleLogo} alt="google" /></p>
                        <p className='text-lg font-semibold'>Sign in with Google</p>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <button type='submit' className='bg-sky-500  cursor-pointer w-full py-2 rounded-lg text-xl text-white font-semibold'>Register</button>
                    </div>
                    {error && <p className='mt-2 text-[13px] text-center text-red-400'>{error}</p>}
                    <div className='mt-3'>
                        <p className='text-[#f60b71] font-semibold text-lg '>Already Have an Account? <Link to='/login'><span className='border-b-1 border-b-amber-500 text-[#2e0ae2d1] ml-2'>Signin</span></Link></p>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Register;