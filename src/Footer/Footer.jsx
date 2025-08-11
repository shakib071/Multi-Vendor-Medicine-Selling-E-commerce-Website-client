import React from 'react';
import logo from '../assets/medicalLogo.png'
import { FaFacebook } from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io';
import { IoLogoYoutube } from 'react-icons/io5';
import { FaReddit } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='mt-20 flex flex-col items-center gap-4 bg-white py-5 sm:py-10 shadow-md rounded-t-3xl'>
           
            <div className='flex justify-center items-center gap-3 cursor-pointer'>
                <p><img className='w-7 h-7 md:w-15 md:h-15 lg:w-20 lg:h-20 2xl:w-20 2xl:h-20' src={logo} alt="logo" /></p>
                <p className='text-3xl md:text-4xl lg:text-5xl font-bold'>CureCart</p>
            </div>
            

            <div className='text-[18px] md:text-2xl 2xl:text-3xl'>
                <p>Contact: shakibhasan071@gmail.com</p>
                <p>Helpline: 01762837532 , 017628372334</p>
            </div>

            

            <div className='flex justify-center items-center text-4xl md:text-5xl 2xl:text-6xl gap-5'>
                <p className='cursor-pointer '><a href="https://www.facebook.com/shakibhasan0007/" target='_blank'><FaFacebook color='blue' /></a></p>
                <p className='cursor-pointer'><a href="https://www.instagram.com/shakibhasan0719/" target='_blank'><IoLogoInstagram color='#e1306c'/> </a> </p>
                <p className='cursor-pointer'><a href="https://www.youtube.com/@shakibhasan8032" target='_blank'><IoLogoYoutube color='red'/></a></p>
                <p className='cursor-pointer'><a href="https://www.reddit.com/user/shakib00700/" target='_blank'><FaReddit color='red' /></a></p>
            </div>

            <div className='flex gap-2 items-center text-[19px] md:text-[22px] 2xl:text-[27px]'>
                <p className='text-2xl md:text-3xl'>&copy;</p>
                <p>2025 CureCart . All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;