import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constans';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
    const user=useSelector((store)=>store.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[open,setOpen]=useState(false);
    
    const handleLogout=async()=>{
      try {
        const res=await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
        dispatch(removeUser());
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  return (
    
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
{user &&  (<div className="flex gap-2 items-center"> Welcome, {user.firstName}
  <div className={`dropdown dropdown-end mx-4 ${open ? "dropdown-open" : ""}`}>
  
  {/* Avatar Button */}
  <div
    tabIndex={0}
    role="button"
    className="btn btn-ghost btn-circle avatar"
    onClick={() => setOpen(!open)}
  >
    <div className="w-10 rounded-full">
      <img src={user.photoUrl} alt="profile" />
    </div>
  </div>

  {/* Dropdown Menu */}
  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
  >
    <li onClick={() => setOpen(false)}>
      <Link to="/profile" className="justify-between">
        Profile
      </Link>
    </li>

    <li onClick={() => setOpen(false)}>
      <Link to="/connections">Connections</Link>
    </li>

    <li onClick={() => setOpen(false)}>
      <Link to="/requests">Requests</Link>
    </li>

    <li
      onClick={() => {
        setOpen(false);
        handleLogout();
      }}
    >
      <a>Logout</a>
    </li>
  </ul>

</div>

  </div>)}
</div>
  )
}

export default Navbar