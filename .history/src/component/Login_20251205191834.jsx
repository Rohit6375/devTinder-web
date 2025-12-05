import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
    const[emailId,setEmailId]=useState("morya@gmail.com");
    const[password,setPassword]=useState("Rohit@123");
    const handleLogin=async()=>{
        try {
            const res=axios.post("http://localhost:4000/login",{
            emailId,
            password
        },{
            withCredentials:true,
        });
        console.log(res);
        } catch (error) {
            console.log("ERROR "+error.message);
        }
        
    }

  return (
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 text-primary-content w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
   <div className="flex flex-col ">
    <label className='form-control w-full max-w-xs py-4'>
        <div className='label'>
            <span className='label-text'>Email Id?</span>
        </div>
        <input 
           type="text"
           value={emailId}
         onChange={(e)=>setEmailId(e.target.value)}

           placeholder='john@gmail.com'
           className='input input-bordered rounded-xl w-full max-w-xs py-5'
        />
    </label>

    <label className='form-control w-full max-w-xs py-4'>
        <div className='label'>
            <span className='label-text'>Password</span>
        </div>
        <input 
           type="text"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
           placeholder='John@123'
           className='input input-bordered rounded-xl w-full max-w-xs py-5'
        />
    </label>
</div>

    <div className="card-actions justify-center">
      <button className="btn btn-primary m-2" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login