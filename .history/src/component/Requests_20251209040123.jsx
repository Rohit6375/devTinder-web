import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constans'
import { useDispatch } from 'react-redux'
import { addRequests } from '../utils/requestSlice'

const Requests = () => {
    const dispatch=useDispatch();
    const fetchRequests=async()=>{
        try {
            const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
            console.log(res);
            // dispatch(addRequests(res))
        } catch (error) {
            
        }
    }
useEffect(()=>{
    fetchRequests();
},[]);
  return (
    <div>Requests</div>
  )
}

export default Requests