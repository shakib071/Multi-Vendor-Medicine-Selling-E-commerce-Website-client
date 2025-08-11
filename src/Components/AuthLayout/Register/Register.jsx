import React, { useState } from 'react';
import googleLogo from '../../../assets/google.png';
import { Link, useNavigate } from 'react-router';
import Lottie from "lottie-react";
import registerAnimation from './register.json';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/getAuth/useAuth';

const Register = () => {
    const [error,setError] = useState('');
    const [userRole,setUserRole] = useState('user');
    const {createUser,setUser,updateUserData,setLoading,handleGoogleLogin,handleGithubLogin} = useAuth();
    const navigate = useNavigate();
    



    const handleRoleChange = (e) =>{
        setUserRole(e.target.value);
    }


    const handleRegister = async(e) => {
        e.preventDefault();

        
        const form = e.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.files[0];
        const role = userRole;

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

        // get the image url from imgbb 
        const imgBBApi = import.meta.env.VITE_ImgBB_API;

        const imageData = new FormData();
        imageData.append("image",photo);

        try{
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBApi}`,{
                method:"POST",
                body: imageData,
            });
            const data = await res.json();
            if(data.success){
               
                console.log(data.data.url);

                createUser(email,password)
                    .then((result)=> {
                    const user = result.user;

                    updateUserData({displayName : username, photoURL : data.data.url})
                        .then(()=>{
                            setUser({...user,displayName : username, photoURL : data.data.url});
                            setLoading(false);
                            navigate('/');
                            
                        })
                        .catch((error)=> {
                            console.log(error);
                            setUser(user);
                            setLoading(false);
                        });
                    
                    })

                    .catch((error)=>{
                    console.log(error);
                    toast.error('Registration Failed');
                    setLoading(false);
                    });
            }
            else{
                toast.error('Photo Upload Failed');
                return;
            }
        }
        catch(error){
            console.log(error);
            toast.error('Photo Upload Failed');
            return;
        }
        
        console.log(role);

    }

    const handleGoogleSignUp = () => {
        handleGoogleLogin()
        .then(()=> {
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
        })
    }


    const handleGithubSignIn = () => {
        handleGithubLogin()
        .then(()=>{
            navigate('/');
        })
        .catch((error)=> {
            console.log(error);
        })
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
                    <div onClick={handleGoogleSignUp} className='flex justify-center cursor-pointer items-center mt-4 bg-amber-500 py-2 rounded-4xl'>
                        <p className=''><img className='w-15' src={googleLogo} alt="google" /></p>
                        <p className='text-lg font-semibold'>Sign in with Google</p>
                    </div>
                    
                    <div onClick={handleGithubSignIn} className='my-5'>
                        
                        <button className="btn bg-black text-white py-6 rounded-xl w-full text-xl border-black">
                            <svg aria-label="GitHub logo" width="32" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
                            Login with GitHub
                        </button>
                        
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