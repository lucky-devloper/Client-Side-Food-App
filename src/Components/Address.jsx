import React, { useContext, useState } from 'react'
import { MenuContext } from '../Context/FoodProvider';

function Address() {
    const { useraddress } = useContext(MenuContext)
    const [selectedaddress, setselectedaddress] = useState('')


    const getaddress = (id) => {
        setselectedaddress(id)
    }

    return (
        <>
            {useraddress?.map((info) => {
                return <div key={info._id} className='w-[100%] h-fit flex items-start gap-2 mt-4'>
                    <input onClick={() => getaddress(info._id)} type="radio" name="address" value={info.fullname} required className='mt-2' />
                    <div className='w-[90%] h-[100%]'>
                        <span className='flex flex-col lg:flex-row lg:gap-2'>
                            <p>{info.fullname} <span className='bg-gray-200 px-1 text-[#979ca3] rounded-[4px]'>{info.location}</span></p>
                            <p>{info.phone}</p>
                        </span>
                        <p className='text-[14px]'>{info.street},{info.city}, {info.state}-{info.pincode}</p>
                        {selectedaddress === info._id ? <button className='w-[150px] h-[40px] mt-2 font-semibold text-white bg-[#fb641b] rounded'>DELIVER HERE</button> : ""}
                    </div>
                </div>
            })}
        </>
    )
}

export default Address