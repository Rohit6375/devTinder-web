import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constans'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'

const Requests = () => {
    const dispatch=useDispatch();
    const requests=useSelector((store)=>store.requests);
    const fetchRequests=async()=>{
        try {
            const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
            console.log(res.data.data);
            // dispatch(addRequests(res))
        } catch (error) {
            
        }
    }
useEffect(()=>{
    fetchRequests();
},[]);

    if(!requests) return;
    if(requests.length===0) return <h1 className='flex justify-center my-10 font-bold text-xl'>No requests found</h1>
  return (
    <div>Requests</div>
  )
}

export default Requests