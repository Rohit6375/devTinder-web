import React from 'react'

const Login = () => {
  return (
    <div className='flex justify-center my-10'>
    <div className="card bg-base-300 text-primary-content w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Login</h2>
   <div className="flex flex-col ">
    <label className='form-control w-full max-w-xs py-4'>
        <div className='label'>
            <span className='label-text'>Email Id?</span>
        </div>
        <input 
           type="text"
           placeholder='john@gmail.com'
           className='input input-bordered rounded-xl w-full max-w-xs py-6'
        />
    </label>

    <label className='form-control w-full max-w-xs py-4'>
        <div className='label'>
            <span className='label-text'>Password</span>
        </div>
        <input 
           type="text"
           placeholder='John@123'
           className='input input-bordered rounded-xl w-full max-w-xs py-6'
        />
    </label>
</div>

    <div className="card-actions justify-center">
      <button className="btn btn-primary m-2">Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login