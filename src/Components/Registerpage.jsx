import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { toast } from 'react-toastify';
import { MenuContext } from '../Context/FoodProvider';

function Registerpage({ handlebtn }) {
    const { setuser } = useContext(MenuContext)
    const [togglepage, settogglepage] = useState(true)
    const [checkbox, setcheckbox] = useState(false)
    const [username, setusername] = useState('')
    const [userEmail, setuserEmail] = useState('')
    const [userPassword, setuserPassword] = useState('')
    const [loginEmail, setloginEmail] = useState('')
    const [loginpassword, setloginpassword] = useState('')

    const createAccount = async () => {
        // console.log(username, userEmail,userPassword);
        try {
            const response = await axios.post('https://server-side-food-app.onrender.com/app/signup', {
                username: username,
                email: userEmail,
                password: userPassword
            })
            // console.log(response);
            setusername('')
            setuserEmail('')
            setuserPassword('')
            setcheckbox(!checkbox)
            toast.success("Create account Sucessfully")
        } catch (error) {
            console.log("create account error :", error);

        }
    }

    const loginAccount = async () => {
        // console.log(loginEmail, loginpassword);
        try {
            const response = await axios.get(`https://server-side-food-app.onrender.com/app/signup/${loginEmail}/${loginpassword}`)
            setuser(response.data)
            toast.success("Login Sucessfully")
            setloginEmail('')
            setloginpassword('')
            handlebtn()
        } catch (error) {
            console.log(error);
            toast.warning("Invalid Credentials")
            setloginEmail('')
            setloginpassword('')
        }
    }

    return (
        <div className='w-[100%] h-[100vh] bg-black bg-opacity-[0.5] absolute top-0 z-10 flex items-center justify-center'>
            {togglepage ? (
                <div className='w-[90%] h-[300px] lg:w-[360px] lg:h-[400px] lg:p-7 bg-white rounded-md p-3 flex flex-col items-center gap-2 lg:gap-4'>
                    <span className='w-[100%] flex justify-between items-center'>
                        <h1 className='text-xl font-semibold lg:font-bold'>Sign up</h1>
                        <RxCross2 onClick={handlebtn} fontSize='20px' />
                    </span>
                    <input type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder='Your Name' className='w-[100%] h-[35px] lg:h-[40px] px-2 text-[13px] outline-none rounded-md' style={{ border: '1px solid gray' }} />
                    <input type="email" value={userEmail} onChange={(e) => setuserEmail(e.target.value)} placeholder='Your Email' className='w-[100%] h-[35px] lg:h-[40px] px-2 text-[13px] outline-none rounded-md' style={{ border: '1px solid gray' }} />
                    <input type="password" value={userPassword} onChange={(e) => setuserPassword(e.target.value)} placeholder='Password' className='w-[100%] h-[35px] lg:h-[40px] px-2 text-[13px] outline-none rounded-md' style={{ border: '1px solid gray' }} />
                    <button onClick={createAccount} disabled={checkbox ? false : true} className={`w-[100%] h-[40px] ${checkbox ? 'bg-[#fe6347]' : 'bg-[#e78473]'} rounded-md font-semibold text-white`}>Create account</button>
                    <span className='w-[100%] flex gap-1 items-center'>
                        <input checked={checkbox} onChange={() => setcheckbox(!checkbox)} type="checkbox" />
                        <p>Remember me</p>
                    </span>
                    <div className='w-[100%] text-[13px] lg:text-[15px] flex items-center gap-1'>
                        <p>Already have an account?</p>
                        <button onClick={() => settogglepage(!togglepage)} className='text-[#fe6347]'>Login here</button>
                    </div>
                </div>
            ) : (
                <div className='w-[90%] h-[250px] lg:w-[360px] lg:h-[300px] lg:p-5 bg-white rounded-md p-3 flex flex-col items-center gap-4'>
                    <span className='w-[100%] flex justify-between items-center'>
                        <h1 className='text-xl font-semibold lg:font-bold'>Login</h1>
                        <RxCross2 onClick={handlebtn} fontSize='20px' />
                    </span>
                    <input type="email" value={loginEmail} onChange={(e) => setloginEmail(e.target.value)} placeholder='Your Email' className='w-[100%] h-[35px] lg:h-[50px] px-2 text-[13px] outline-none rounded-md' style={{ border: '1px solid gray' }} />
                    <input type="password" value={loginpassword} onChange={(e) => setloginpassword(e.target.value)} placeholder='Password' className='w-[100%] h-[35px] lg:h-[50px] px-2 text-[13px] outline-none rounded-md' style={{ border: '1px solid gray' }} />
                    <button onClick={loginAccount} className='w-[100%] h-[40px] lg:h-[50px]  bg-[#fe6347] rounded-md font-semibold text-white'>Login</button>
                    <div className='text-[13px] lg:text-[15px] flex items-center gap-1'>
                        <p className='font-semibold text-gray-600'>Create a new account?</p>
                        <button onClick={() => settogglepage(!togglepage)} className='text-[#fe6347]'>Click here</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Registerpage