import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constans";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [emailId, setEmailId] = useState("morya@gmail.com");
  const [password, setPassword] = useState("Rohit@123");
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const [error, setError] = useState("");

  const[isLoginForm,setIsLoginForm]=useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const user = useSelector((store) => store.user);

  // 🚀 Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 text-primary-content w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="flex flex-col ">
            {isLoginForm && <><label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="input input-bordered rounded-xl w-full max-w-xs py-5"
              />
            </label> <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Email Id?</span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="john@gmail.com"
                className="input input-bordered rounded-xl w-full max-w-xs py-5"
              />
            </label> </> }
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Email Id?</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="john@gmail.com"
                className="input input-bordered rounded-xl w-full max-w-xs py-5"
              />
            </label>

            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="John@123"
                className="input input-bordered rounded-xl w-full max-w-xs py-5"
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary m-2" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
