import React from "react";
const Premium = () => {
  return (
    <div className="m-10">
      <div className="flex w-full flex-col lg:flex-row gap-6">

        {/* SILVER */}
        <div className="card bg-base-300 rounded-box grow p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Silver Membership</h2>

          <ul className="space-y-2 mb-6 text-center">
            <li>✅ Messaging with connections</li>
            <li>✅ Up to 100 connection requests</li>
            <li>✅ Blue tick verification</li>
            <li>✅ Valid for 3 months</li>
          </ul>

          <button className="btn btn-secondary w-full">
            Buy Silver
          </button>
        </div>

        <div className="divider lg:divider-horizontal">OR</div>

        {/* GOLD */}
        <div className="card bg-base-300 rounded-box grow p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Gold Membership</h2>

          <ul className="space-y-2 mb-6">
            <li>🔥 Messaging with connections</li>
            <li>🔥 Unlimited connection requests</li>
            <li>🔥 Blue tick verification</li>
            <li>🔥 Valid for 6 months</li>
          </ul>

          <button className="btn btn-primary w-full">
            Buy Gold
          </button>
        </div>

      </div>
    </div>
  );
};

export default Premium;
