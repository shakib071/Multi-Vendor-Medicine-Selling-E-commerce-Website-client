import React from 'react';
import './login.css';
import leaf1 from '../../../assets/leaf_01.png';
import leaf2 from '../../../assets/leaf_02.png';
import leaf3 from '../../../assets/leaf_03.png';
import leaf4 from '../../../assets/leaf_04.png';
import bg from '../../../assets/bg.jpg';
import girl from '../../../assets/girl.png';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/getAuth/useAuth';



const Login = () => {

    const {handleGoogleLogin,handleGithubLogin,login,addUserToDataBase} = useAuth();
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);

        login(email,password)
        .then(()=> {

            navigate('/');
        })
        .catch((error)=> {
            console.log(error);
        })

    }



    const handleGoogleSignUp = () => {
        handleGoogleLogin()
        .then((result)=> {
             const user = result.user;
            const userData = {
                // username,email,role,photoURL,uid
                username: user.displayName,
                email: user.email,
                role: "user",
                photoURL: user.photoURL,
                uid: user.uid

            }
            addUserToDataBase(userData);
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
        })
    }


    const handleGithubSignIn = () => {
        handleGithubLogin()
        .then((result)=>{
             const user = result.user;
            const userData = {
                // username,email,role,photoURL,uid
                username: user.displayName,
                email: user.email,
                role: "user",
                photoURL: user.photoURL,
                uid: user.uid

            }
            addUserToDataBase(userData);
            navigate('/');
        })
        .catch((error)=> {
            console.log(error);
        })
    }


    return (
        <div>

            <section>
                <div className="leaves">
                    <div className="set">
                        <div><img src={leaf1} alt="" /></div>
                        <div><img src={leaf2} alt="" /></div>
                        <div><img src={leaf3} alt="" /></div>
                        <div><img src={leaf4} alt="" /></div> 
                        <div><img src={leaf1} alt="" /></div>
                        <div><img src={leaf2} alt="" /></div>
                        <div><img src={leaf3} alt="" /></div>
                        <div><img src={leaf4} alt="" /></div>
                        
                    </div>
                </div>
                <img src={bg} className="bg"/>
                <img src={girl} className="girl"/>
                
                <div className="login">
                    <h2>Sign In</h2>
                    <form onSubmit={handleLogin} className='flex flex-col gap-5'>
                        <div className="inputBox">
                            <input type="text" name='email' placeholder="Email" required/>
                            
                        </div>
                        <div className="inputBox">
                            <input type="password" name='password' placeholder="Password" required/>
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Login" id="btn"/>
                        </div>
                       
                    </form>

                     <div onClick={handleGoogleSignUp}>
                        <Link>
                            <button className="btn bg-white py-6 rounded-xl w-full text-xl text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="32" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </Link>
                    </div>

                    <div onClick={handleGithubSignIn}>
                        <Link>
                            <button className="btn bg-black text-white py-6 rounded-xl w-full text-xl border-black">
                                <svg aria-label="GitHub logo" width="32" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
                                Login with GitHub
                            </button>
                        </Link>
                    </div>

                    <div className="group">
                        <a href="#">Forget Password</a>
                    </div>
                    <div>
                        <p className='text-[#8f2c24] font-semibold text-xl'>Don't Have an Account <Link to='/register' className='underline pl-6 text-green-500'>SignUp</Link></p>
                    </div>
                </div>
                
            </section>

        </div>
        
    );
};

export default Login;