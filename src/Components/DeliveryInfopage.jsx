import React, { useContext, useEffect, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { MenuContext } from '../Context/FoodProvider'
import { toast } from 'react-toastify'
import Address from './Address'

function DeliveryInfopage() {
    const { allitemprice, Deliveryfee, saveAddress, user } = useContext(MenuContext)
    const [showallAdress, setshowallAdress] = useState(false)
    const [add_address, setadd_address] = useState(false)
    const [Fullname, setFullname] = useState('')
    const [street, setstreet] = useState('')
    const [City, setCity] = useState('')
    const [State, setState] = useState('')
    const [zipCode, setzipCode] = useState()
    const [Country, setCountry] = useState('')
    const [Phone, setPhone] = useState()
    const [user_id, setuser_id] = useState()
    const [location, setlocation] = useState('')

    useEffect(() => {
        if (user) {
            setuser_id(user._id)
        }
    }, [user])


    const paymentpage = (e) => {
        e.preventDefault()
        if (user) {
            saveAddress({ Fullname, street, City, State, zipCode, Country, Phone, location, user_id })
            setFullname('')
            setstreet('')
            setCity('')
            setState('')
            setzipCode('')
            setCountry('')
            setPhone('')
            setlocation('')
        } else {
            toast.warning("Please login !")
        }
    }

    return (
        <div className='w-[100%] h-[100%] lg:flex lg:items-center lg:justify-center'>
            <div className='w-[100%] h-[100%] lg:w-[80%]  px-2 py-2 flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-16'>
                <div className='deliverypage w-[100%] h-[100%] lg:max-h-[750px] overflow-y-auto'>
                    <div className='w-[100%] h-[100%] rounded-md mb-2 bg-[#f2f2f2] overflow-hidden'>
                        <h1 className='text-xl font-semibold lg:text-2xl bg-[#fd724a] p-1 text-white'>DELIVERY ADDRESS</h1>
                        <div className={`w-[100%] my-2 px-2 ${showallAdress ? "min-h-[240px]" : "h-[240px] overflow-hidden"}`}>
                            <Address />
                        </div>
                        <hr />
                        <div className='w-[100%] h-[100%] flex items-center px-2 gap-2'>
                            <FaChevronDown className={`${showallAdress ? "rotate-180 duration-100" : "rotate-0 duration-100"}`} />
                            <button onClick={() => setshowallAdress(!showallAdress)} className='h-[40px]'>View all addresses</button>
                        </div>
                    </div>
                    <button onClick={() => setadd_address(!add_address)} className='text-[16px] bg-[#fd724a] rounded-md h-[35px] px-2 font-semibold text-white lg:w-[35%] w-[180px] mb-2'>Add a new Address</button>
                    {add_address && <form className='w-[100%] h-[100%] flex flex-col gap-3' onSubmit={paymentpage}>
                        <div className='w-[100%] h-[100%] flex items-center gap-2 font-semibold'>
                            <input type="radio" name="address" id="" checked={add_address} />
                            <h1 className=''>Add a new Address</h1>
                        </div>
                        <input type="text" required value={Fullname} onChange={(e) => setFullname(e.target.value)} placeholder='Full Name' className='w-[100%] h-[40px] px-3 outline-none text-[14px] rounded-md ' style={{ border: '1px solid #000' }} />
                        <input type="text" required value={street} onChange={(e) => setstreet(e.target.value)} placeholder='street' className='w-[100%] h-[40px] px-3 outline-none text-[14px] rounded-md ' style={{ border: '1px solid #000' }} />
                        <div className='w-[100%] h-[35px] lg:h-[40px] flex gap-2 items-center'>
                            <input type="text" required value={City} onChange={(e) => setCity(e.target.value)} placeholder='City' className='w-[50%] h-[100%] px-3 outline-none text-[14px] rounded-md' style={{ border: '1px solid #000' }} />
                            <input type="text" required value={State} onChange={(e) => setState(e.target.value)} placeholder='State' className='w-[50%] h-[100%] px-3 outline-none text-[14px] rounded-md' style={{ border: '1px solid #000' }} />
                        </div>
                        <div className='w-[100%] h-[35px] lg:h-[40px] flex gap-2 items-center'>
                            <input type="number" required value={zipCode} onChange={(e) => setzipCode(e.target.value)} placeholder='Zip code' className='w-[50%] h-[100%] px-3 outline-none text-[14px] rounded-md    ' style={{ border: '1px solid #000' }} />
                            <input type="text" required value={Country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' className='w-[50%] h-[100%]  px-3 outline-none text-[14px] rounded-md ' style={{ border: '1px solid #000' }} />
                        </div>
                        <input type="number" required value={Phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' className='w-[100%] h-[40px] px-3 outline-none text-[14px] rounded-md ' style={{ border: '1px solid #000' }} />
                        <div className='w-[100%] h-fit flex items-center gap-2'>
                            <input type="radio" name="location" checked={location === 'Home' ? true : false} value="Home" onChange={(e) => setlocation(e.target.value)} />
                            <label htmlFor="">Home</label>
                            <input type="radio" name="location" checked={location === 'Work' ? true : false} value="Work" onChange={(e) => setlocation(e.target.value)} />
                            <label htmlFor="">Work</label>
                        </div>
                        <button type='submit' className={`text-[14px] bg-[#fd724a] rounded-md h-[35px] px-2 font-semibold text-white lg:w-[35%] w-[200px]`}>SAVE AND DELIVERY HERE</button>
                    </form>}
                </div>

                <div className='w-[100%] h-[100%] p-2'>
                    <h1 className='text-xl lg:text-2xl font-semibold'>Cart Totals</h1>
                    <span className='w-[100%] flex items-center justify-between py-3 text-[13px] lg:text-[17px]'>
                        <p>Subtotal</p>
                        <p>${allitemprice}</p>
                    </span>
                    <hr />
                    <span className='w-[100%] flex items-center justify-between py-3 text-[13px] lg:text-[17px]'>
                        <p>Delivery Fee</p>
                        <p>${Deliveryfee}</p>
                    </span>
                    <hr />
                    <span className='w-[100%] flex items-center justify-between py-3 text-[13px] lg:text-[17px]'>
                        <p>Total</p>
                        <p>${allitemprice + Deliveryfee}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DeliveryInfopage