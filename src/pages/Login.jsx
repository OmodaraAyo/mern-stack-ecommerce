import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <section id="login">
      <div className="container mx-auto p-4">
        <div className="bg-white w-full p-2 py-2 max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon" />
          </div>

          <form action="">
            <div className="grid">
                <label>Email :</label>
                <div className="bg-slate-100 p-2">
                    <input type="email" name="email" placeholder="enter email" className="w-full h-full outline-none bg-transpar1nt p-2" required/>
                </div>
            </div>

            <div>
                <label>Password :</label>
                 <div className="bg-slate-100 p-2 flex items-center">
                    <input type={showPassword ? "text": "password" } name='password' placeholder='enter password' className="w-full h-full outline-none bg-transpar1nt p-2" required/>
                    <div className="cursor-pointer text-xl" onClick={() => setShowPassword((prev)=> !prev)}>
                        <span>
                            {
                                showPassword? <FaEyeSlash /> : <FaEye />
                            }
                        </span>
                    </div>
                </div>
                <Link to={'forgot-password'} className="block w-fit ml-auto hover:underline hover:text-red-600">
                    Forgot Password
                </Link>
            </div>

            <button className="bg-rose-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
