import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constans';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed=useSelector(store=>store.feed);
  const dispatch=useDispatch();
  const getFeed=async()=>{
    if(feed) return;
    try {
      const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
      dispatch(addFeed(res.data));
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getFeed();
  },[]);
  return (
    <div>
       <UserCard/>
    </div>
  )
}

export default Feed