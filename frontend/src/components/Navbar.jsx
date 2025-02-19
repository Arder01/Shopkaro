import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import CartModel from '../pages/Shop/CartModel';
import avatarImg from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {

    const products = useSelector((state) => state.cart.products);
    const [isCartOpen,setIsCartOpen] = useState(false);
    const handleCartToggle=()=>{
        setIsCartOpen(!isCartOpen);
    } 
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    const handleLogout=async()=>{
        try{
            await logoutUser();
            dispatch(logout())
            navigate('/')
        }
        catch(err){
            console.error("Failed to log out",error);
        }
    }

    //show user if logged in
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    //dropdown menu
    const [isDropdownOpen,setIsDropdownOpen] = useState(false);
    const handleDropdownToggle=()=>{
        setIsDropdownOpen(!isDropdownOpen)
    }

    //admin dropdown menu
    const adminDropdownMenus = [
        {label:"Dashboard",path:"/dashboard/admin"}, 
        {label:"Manage Items",path:"/dashboard/manage-products"}, 
        {label:"All Orders",path:"/dashboard/manage-orders"}, 
        {label:"Add New Post",path:"/dashboard/add-new-post"}, 
    ]
    
    //user Dropdown menu
    const userDropdownMenus = [
        {label:"Dashboard",path:"/dashboard"}, 
        {label:"Profile",path:"/dashboard/profile"}, 
        {label:"Payments",path:"/dashboard/payments"}, 
        {label:"Orders",path:"/dashboard/orders"}, 
    ]

    const dropdownMenus = user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

  return (
    <header className = 'fixed-nav-bar w-nav'>
        <nav className = 'max-w-screen-2x1 mx-auto px-4 flex justify-between items-center'>
            <ul className = 'nav__links'>
                <li className='link'><Link to = "/">Home</Link></li>
                <li className='link'><Link to = "/shop">Shop</Link></li>
                <li className='link'><Link to = "/">Pages</Link></li>
                <li className='link'><Link to = "/contact">Contact</Link></li>
            </ul>

            <div className = 'nav__logo'>
                <Link to = "/">Shopkaro<span>.</span></Link>
            </div>
            <div className = 'nav__icons relative'>
                <span><Link to = "/search">
                <i className= "ri-search-line"></i>
                </Link></span>
                <span><button onClick={handleCartToggle} className = 'hover:text-primary'>
                    <i className = "ri-shopping-bag-line"></i>
                    <sup className = 'text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{products.length}</sup>    
                </button></span>
                <span>
                    {
                        user && user?(<><img onClick={handleDropdownToggle} src={user?.profileImage || avatarImg} alt = "" className='size-6 rounded-full cursor-pointer'/>
                        {
                            isDropdownOpen &&(
                                <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                    <ul className='font-medium space-y-4 p-2'>
                                        {dropdownMenus.map((menu,index)=>(
                                            <li key={index}>
                                                <Link onClick={()=>setIsDropdownOpen(false)} className='dropdown-items' to = {menu.path}>{menu.label}</Link>
                                            </li>
                                        ))}
                                        <li><Link onClick = {handleLogout} className='dropdown-items'>Logout</Link></li>
                                    </ul>
                                </div>
                            )
                        }</>):(<Link to ="login">
                                <i className = 'ri-user-line'></i>
                            </Link>)
                    }
                    
                </span>
            </div>
        </nav>
        {
            isCartOpen && <CartModel products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>
        }
    </header>
  )
}

export default Navbar 
