import React, { useContext, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoBagHandle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Registerpage from './Registerpage';
import { MenuContext } from '../Context/FoodProvider';
import { Link } from 'react-router-dom';

function Navbar() {
    const { user, DbcartItem, Search, setSearch, } = useContext(MenuContext)
    const [issearch, setissearch] = useState(false)

    const [togglelogin, settogglelogin] = useState(false)
    const handlelogin = () => {
        settogglelogin(!togglelogin)
    }

    return (
        <>
            <div className='w-[100%] h-[50px] lg:w-[80%] flex justify-between items-center bg-black bg-opacity-[0.1] lg:bg-transparent px-1'>
                <h1 className='lg:text-3xl text-2xl tracking-wider font-semibold text-[#f36236]'>BiteHaven</h1>
                <div className='hidden lg:block'>
                    <div className='flex items-center gap-6'>
                        <a href="#">home</a>
                        <a href="#">menu</a>
                        <a href="#">contact us</a>
                    </div>
                </div>
                <div className='flex items-center gap-2 lg:gap-5'>
                    {issearch && <input type="text" value={Search} onChange={(e) => setSearch(e.target.value)} placeholder='Serach food...' className='lg:block hidden py-1 px-2 text-[15px] outline-none rounded-full bg-[#f2f2f2]' />}
                    <CiSearch fontSize='25px' onClick={() => setissearch(!issearch)} />
                    <Link to='/cart' className=' relative'>
                        <IoBagHandle fontSize='25px' />
                        {DbcartItem && <div className='w-[18px] h-[18px] flex items-center justify-center p-1 absolute top-[-9px] left-4 text-white rounded-full bg-red-600'>
                            <p className='text-[10px]'>{DbcartItem.length}</p>
                        </div>}
                    </Link>
                    {user != undefined ? (
                        <div className='flex items-center gap-2'>
                            <FaUserCircle fontSize='25px' />
                            <p className='lg:block hidden'>{user.username}</p>
                        </div>
                    ) : (
                        <button onClick={() => handlelogin()} className='border-2  border-orange-400 text-[15px] w-[70px] lg:w-[100px] lg:py-1 rounded-full'>sign in</button>
                    )}
                </div>
            </div >
            {togglelogin && <Registerpage handlebtn={handlelogin} />
            }
        </>
    )
}

export default Navbar