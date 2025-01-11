import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

export const MenuContext = createContext()
function FoodProvider({ children }) {
    const [foodCategory, setfoodCategory] = useState()
    const [foodItem, setfoodItem] = useState()
    const [user, setuser] = useState()
    const [cartitem, setcartitem] = useState([])
    const [Search, setSearch] = useState('')
    const [DbcartItem, setDbcartItem] = useState()
    const [allitemprice, setallitemprice] = useState(0)
    const [Deliveryfee, setDeliveryfee] = useState(20)
    const [useraddress, setuseraddress] = useState()

    // console.log(Search);

    // fetchdata from server
    const fetchData = async () => {
        try {
            const itemresponse = await axios.get('https://server-side-food-app.onrender.com/app/item')
            const response = await axios.get('https://server-side-food-app.onrender.com/app/food')
            const data = response.data
            const item = itemresponse.data
            if (Search !== '') {
                const searchItem = data.filter((item) => item.type.toLowerCase().startsWith(Search))
                setfoodItem(searchItem)
            }else{
                setfoodItem(data)
            }
            setfoodCategory(item)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [Search])

    // save data in local stroage in temproperly
    const AddItemInCart = (id, qty) => {
        const findSelectedItem = foodItem.find((item) => item._id === id)
        const addqty = { ...findSelectedItem, quantity: qty }
        const finddataFromLocal = cartitem.find((item) => item._id === id)
        if (finddataFromLocal) {
            const updatequantityOfItem = cartitem.map((item) => item._id === id ? { ...item, quantity: qty } : item)
            setcartitem(updatequantityOfItem)
            toast.success("Add Item Sucessfully!")
        } else {
            setcartitem((previtem) => [addqty, ...previtem])
            toast.success("Add Item Sucessfully!")
        }
    }

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem("Cart")) || []
        if (item && item.length > 0) {
            setcartitem(item)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("Cart", JSON.stringify(cartitem))
    }, [cartitem])

    // if user are login then if user add item in cart it can be save directly database stroage

    const addItemIndatabase = async (productInfo) => {
        // console.log(productInfo);
        const user_id = productInfo.user_id
        try {
            const findSelectedItem = foodItem.find((item) => item._id === productInfo.product_id)
            const newitem = { ...findSelectedItem, quantity: productInfo.quantity }

            const response = await axios.get(`https://server-side-food-app.onrender.com/app/cart/${user_id}`)
            console.log(response);

            const allDbcartitem = response.data
            const alreadyhaveitem = allDbcartitem.find((item) => item.product_id === productInfo.product_id)
            if (alreadyhaveitem) {
                const itemid = alreadyhaveitem._id
                const response = await axios.put(`https://server-side-food-app.onrender.com/app/cart/${itemid}`, {
                    quantity: productInfo.quantity
                })
                // console.log("update quantity response : ", response);
            } else {
                const response = await axios.post('https://server-side-food-app.onrender.com/app/cart', {
                    user_id: productInfo.user_id,
                    product_id: newitem._id,
                    title: newitem.title,
                    item: newitem.item,
                    quantity: newitem.quantity,
                    price: newitem.price
                })
                // console.log("Add item in Databse : ", response);
            }
        } catch (error) {
            console.log(error);
        }
        fetchcartitem(user)
    }

    // when i got the user login it can be store cart item in my database from get the data in local stroage and remove all data from Localstroage

    useEffect(() => {
        if (user) {
            cartitem.forEach(async (item) => {
                try {
                    await axios.post('https://server-side-food-app.onrender.com/app/cart', {
                        user_id: user._id,
                        product_id: item._id,
                        title: item.title,
                        item: item.item,
                        quantity: item.quantity,
                        price: item.price
                    })
                } catch (error) {
                    console.log(error);
                }
            })
            localStorage.clear()
        }
    }, [user])

    // get cartitem from database 
    const fetchcartitem = async (user) => {
        const user_id = user._id
        try {
            const response = await axios.get(`https://server-side-food-app.onrender.com/app/cart/${user_id}`)
            const item = response.data
            setDbcartItem(item)
        } catch (error) {
            console.log("get data error : ", error);
        }
    }

    useEffect(() => {
        if (user) {
            fetchcartitem(user)
        }
    }, [user])

    // remove item from cart when user are click on remove icon 

    const removedatafromcart = async (id) => {
        try {
            const response = await axios.delete(`https://server-side-food-app.onrender.com/app/cart/${id}`)
            if (response || user) {
                fetchcartitem(user)
                toast.success('Item Delete Sucessfully')
            }
        } catch (error) {
            console.log(error);
        }
    }

    // calculate total and subtotal and delivery fee 
    useEffect(() => {
        if (DbcartItem) {
            const allitemprice = DbcartItem.map((item) => {
                return item.price * item.quantity
            })
            const subtotal = allitemprice.reduce((acc, curr) => {
                return acc + curr
            }, 0)
            setallitemprice(subtotal)
        }
    }, [DbcartItem])

    // save user delivery address in Database
    const saveAddress = async (useraddress) => {
        // console.log(useraddress);
        try {
            const response = await axios.post('https://server-side-food-app.onrender.com/app/address', {
                user_id: useraddress.user_id,
                fullname: useraddress.Fullname,
                street: useraddress.street,
                city: useraddress.City,
                state: useraddress.State,
                country: useraddress.Country,
                pincode: useraddress.zipCode,
                phone: useraddress.Phone,
                location: useraddress.location
            })
            // console.log(response);
            toast.success('Saved Sucessfully!')
            fetchSaveAddress(useraddress.user_id)

        } catch (error) {
            console.log(error);
            toast.warn('Invalid Credentials!')
        }
    }

    // fetch address whose user are login and show in address tab
    const fetchSaveAddress = async (user_id) => {
        try {
            const response = await axios.get(`https://server-side-food-app.onrender.com/app/address/${user_id}`)
            // console.log(response);
            setuseraddress(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user) {
            const user_id = user._id
            fetchSaveAddress(user_id)
        }
    }, [user])


    return (
        <MenuContext.Provider value={{ foodCategory, foodItem, user, setuser, Search, setSearch, AddItemInCart, cartitem, DbcartItem, addItemIndatabase, removedatafromcart, allitemprice, Deliveryfee, saveAddress, useraddress }}>
            {children}
        </MenuContext.Provider>
    )
}

export default FoodProvider