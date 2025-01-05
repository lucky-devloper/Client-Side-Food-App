import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

function Footer() {
    return (
        <div className='w-[100%] h-fit lg:h-[250px] bg-[#2a2a2a] text-white lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <div className='w-[100%] lg:w-[80%] h-fit p-2 lg:py-5 flex flex-col lg:flex-row lg:items-center gap-5'>
                <div className='w-[100%] lg:w-[50%] flex flex-col gap-3'>
                    <h1 className='text-2xl lg:text-4xl tracking-wider text-[#f36236]'>BiteHaven</h1>
                    <p className='text-[13px] lg:text-[15px]'>Welcome to <strong>BiteHaven</strong>, your trusted platform for ordering delicious food from your favorite local restaurants. We’re dedicated to bringing a variety of cuisines right to your doorstep, ensuring quality, speed, and excellent service.</p>
                    <div className='flex items-center gap-4'>
                        <FaFacebookF className='border-2 h-[25px] w-[25px] p-1 rounded-full' />
                        <FaTwitter className='border-2 h-[25px] w-[25px] p-1 rounded-full' />
                        <FaLinkedinIn className='border-2 h-[25px] w-[25px] p-1 rounded-full' />
                    </div>
                </div>
                <div className='w-[100%] lg:w-[50%] flex items-start justify-between'>
                    <div className='text-[11px] lg:text-[14px] text-gray-300'>
                        <h1 className='text-[15px] lg:text-xl text-white font-semibold mb-3'>COMPANY</h1>
                        <p>Home</p>
                        <p>About us</p>
                        <p>Delivery</p>
                        <p>Privacy policy</p>
                    </div>
                    <div className='text-[11px] lg:text-[14px] text-gray-300'>
                        <h1 className='text-[15px] lg:text-xl text-white font-semibold mb-3'>GET IN TOUCH</h1>
                        <p>+706-1771-656</p>
                        <p>pritamsharmassm701@gmal.com</p>
                    </div>
                </div>
            </div>
            <hr className='border-white w-[100%]'/>
            <p className='text-[11px] w-[100%] text-center my-2'>copyright 2024 Ⓒ biteHaven.com - All Right Reserved</p>
        </div>
    )
}

export default Footer