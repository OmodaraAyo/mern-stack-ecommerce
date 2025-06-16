import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../service";
import { Slide, toast } from "react-toastify";
import { useContext } from "react";
import Context from "../context";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
      email: "",
      password: "" 
    })

    const navigate = useNavigate();
    const { fetchUserDetails, fetchNumberOfProductInUserCart } = useContext(Context)

    const handleChange = (e) =>{
        const { name, value } = e.target

        setData((preve)=> {
          return{
            ...preve,
            [ name ] : value 

          }
        })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      // call api for login with data

      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method : SummaryApi.signIn.method,
        credentials : 'include',
        headers : SummaryApi.signIn.headers,
        body : JSON.stringify(data)
      })
      
      const dataApi = await dataResponse.json()


      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fetchUserDetails()
        fetchNumberOfProductInUserCart()
      }
      if(dataApi.error){
        toast.error(dataApi.message)

      } 

    }

  return (
    <section id="login">
      <div className="container mx-auto p-4">
        <div className="bg-white w-full p-2 py-5 max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon" />
          </div>

          <form className="py-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
                <label htmlFor="email">Email :</label>
                <div className="bg-slate-100 p-2">
                    <input 
                        type="email" 
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={data.email} 
                        placeholder="enter email" 
                        onChange={handleChange}
                        className="w-full h-full outline-none bg-transpar1nt p-2" required/>
                </div>
            </div>

            <div>
                <label htmlFor="password">Password :</label>
                 <div className="bg-slate-100 p-2 flex items-center">
                    <input 
                        type={showPassword ? "text": "password" } 
                        name='password' 
                        id="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder='enter password' 
                        className="w-full h-full outline-none bg-transpar1nt p-2" 
                        required/>
                    <div className="cursor-pointer text-xl" onClick={() => setShowPassword((prev)=> !prev)}>
                        <span>
                            {
                                showPassword? <FaEyeSlash /> : <FaEye />
                            }
                        </span>
                    </div>
                </div>
                <Link to={'/forgot-password'} className="block w-fit ml-auto hover:underline hover:text-red-600">
                    Forgot Password
                </Link>
            </div>

            <button type="submit" className="bg-rose-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 cursor-pointer">Login</button>
          </form>

          <p className="">Don't have account ? <Link to={'/sign-up'} className="text-red-600 hover:text-red-700 hover:underline">Sign up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
