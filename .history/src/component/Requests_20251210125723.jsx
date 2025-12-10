import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constans'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'
import ConnectionCard from './ConnectionCard'

const Requests = () => {
    const dispatch=useDispatch();
    const requests=useSelector((store)=>store.requests);

    const reviewRequest=async(status,_id)=>{
        const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id);
        console.log(res);
    }

    const fetchRequests=async()=>{
        try {
            const res=await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
            console.log(res.data.data);
            dispatch(addRequests(res.data.data))
        } catch (error) {
            
        }
    }
useEffect(()=>{
    fetchRequests();
},[]);

    if(!requests) return;
    if(requests.length===0) return <h1 className='flex justify-center my-10 font-bold text-xl'>No requests found</h1>
  return (
    <div className="flex flex-col items-center my-10 w-full">

    {/* HEADING */}
    <h1 className="font-bold text-2xl mb-6">Connection Requests</h1>
     {/* CONNECTIONS LIST */}
    <div className="flex flex-col items-center gap-4 w-full">
      {requests.map((request) => {
        const { _id, firstName, lastName, about, gender, age, photoUrl } = request.fromUserId;

        return (
          <ConnectionCard
            key={_id}
            user={{ firstName, lastName, about, gender, age, photoUrl,_id }}
            isRequest={true}
            reviewRequest={reviewRequest}

          />
        );
      })}
    </div>

    </div>
  )
}

export default Requests