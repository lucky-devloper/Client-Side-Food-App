import React, { useContext, } from 'react'
import { RxCross2 } from "react-icons/rx";
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom';
import { MenuContext } from '../Context/FoodProvider';

function Cartpage() {
    const { user, cartitem, DbcartItem, removedatafromcart, allitemprice, Deliveryfee } = useContext(MenuContext)


    const columns = [
        {
            name: "Item",
            selector: row => <img src={row.item} alt="" className='w-[50px] h-[50px] object-cover' />
        },
        {
            name: "Title",
            selector: row => row.title
        },
        {
            name: "Price",
            selector: row => <p>${row.price}</p>
        },
        {
            name: "Quantity",
            selector: row => row.quantity
        },
        {
            name: "Total",
            selector: row => <p>${row.price * row.quantity}</p>
        },
        {
            name: "Remove",
            selector: row => <RxCross2 onClick={() => handleDelete(row._id)} />
        },
    ]

    const handleDelete = (id) => {
        removedatafromcart(id)
    }

    const tableStyle = {
        rows: {
            style: {
                padding: '10px 20px', // Adjust padding as needed
            },
        },
    }


    return (
        <div className='w-[100%] h-[100%] p-2 lg:flex lg:items-center lg:justify-center'>
            <div className='w-[100%] h-[100%] lg:w-[80%] my-6'>
                <DataTable
                    columns={columns}
                    data={user != undefined ? DbcartItem : cartitem}
                    pagination
                    highlightOnHover
                    customStyles={tableStyle}
                    fixedHeader
                    fixedHeaderScrollHeight='400px'
                >
                </DataTable>
                <div className='w-[100%] h-fit p-2 flex flex-col lg:flex-row gap-3 lg:gap-20 mt-4'>
                    <div className='w-[100%] h-fit'>
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
                        <Link to='/deliveryinfo'><button className='text-[14px] bg-[#fd724a] rounded-md h-[35px] px-2 font-semibold text-white'>PROCEED TO CHECKOUT</button></Link>
                    </div>
                    <div className='w-[100%]'>
                        <p className='text-[14px] lg:text-[17px] mb-3'>If you have a promo code, Enter it here</p>
                        <input type="text" placeholder='promo code' className='bg-[#f2f2f2] h-[35px] outline-none text-[13px] lg:w-[60%] px-2' />
                        <button className='w-[90px] lg:w-[130px] h-[35px] ml-3 text-white font-semibold bg-black'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cartpage