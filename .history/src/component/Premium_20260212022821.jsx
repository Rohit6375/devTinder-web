import axios from "axios";
import React from "react";

import { BASE_URL } from "../utils/constans";
const Premium = () => {
  const handleBuyClick=async(type)=>{
    const order=await axios.post(BASE_URL+"/payment/create",{membershipType:type},{withCredentials:true});

const{keyId,amount,currency,orderId,notes}=order.data;
    // it should open the razorpay payment dialog box

         const options = {
        keyId, 
        amount, 
        currency,
        name: 'Dev Tinder',
        description: 'Connect to other developers',
        order_id: orderId,
        
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };
       const rzp = new window.Razorpay(options);
      rzp.open();
  }
  return (
    <div className="m-10">
      <div className="flex mx-auto max-w-6xl flex-col lg:flex-row gap-6">

        {/* SILVER */}
        <div className="card bg-base-300 rounded-box grow p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Silver Membership</h2>

          <ul className="space-y-2 mb-6 text-left mx-auto">
            <li>✅ Messaging with connections</li>
            <li>✅ Up to 100 connection requests</li>
            <li>✅ Blue tick verification</li>
            <li>✅ Valid for 3 months</li>
          </ul>

          <button onClick={()=>handleBuyClick("silver")} className="btn btn-secondary mx-auto block">
            Buy Silver
          </button>
        </div>

        <div className="divider lg:divider-horizontal">OR</div>

        {/* GOLD */}
        <div className="card bg-base-300 rounded-box grow p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Gold Membership</h2>

          <ul className="space-y-2 mb-6 text-left mx-auto">
            <li>🔥 Messaging with connections</li>
            <li>🔥 Unlimited connection requests</li>
            <li>🔥 Blue tick verification</li>
            <li>🔥 Valid for 6 months</li>
          </ul>

          <button onClick={()=>handleBuyClick("gold")} className="btn btn-primary mx-auto block">
            Buy Gold
          </button>
        </div>

      </div>
    </div>
  );
};

export default Premium;
