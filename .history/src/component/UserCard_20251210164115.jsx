import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constans';

const UserCard = ({user}) => {
   if(!user) return ;
   if(user.length<=0) return <h1 className="flex justify-center my-10">no user is present</h1>
    const {firstName,lastName,gender,age,photoUrl,about}=user;

    const handleSendRequest=async(status,_id)=>{
      try {
        const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+_id);
         console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    
  return ( user &&
    <div className="card bg-base-300 w-96 shadow-md rounded-xl">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
  {age && gender &&  <p>{age+", "+gender}</p>} 
    <p>{about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary rounded-xl">Ignore</button>
      <button className="btn btn-secondary rounded-xl">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard