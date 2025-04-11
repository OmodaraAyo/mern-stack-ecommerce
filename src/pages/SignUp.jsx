import React from 'react'
import { useState } from 'react'
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from '../helpers/imageTobase64';
import SummaryApi from "../service/index";
import { Slide, toast } from 'react-toastify';


const SignUp = () => {
     const [showPassword, setShowPassword] = useState(false)
     const [showConfirmPassword, setShowConfirmPassword] = useState(false)
        const [data, setData] = useState({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            profilePicture: "",
        })
        const navigate = useNavigate();
    
        const handleChange = (e) =>{
            const { name, value } = e.target
    
            setData((preve)=> {
              return{
                ...preve,
                [ name ] : value 
    
              }
            })
        }

        //convert image to base64 encoded string
        const handleUploadPicture = async(e) => {
            const file = e.target.files[0]

            const imagePic = await imageToBase64(file)
            // console.log('imagePic', imagePic)
            setData((preve)=> {
                return{
                    ...preve,
                    profilePicture: imagePic,
                }
            })
        }

        const handleSubmit = async (e) => {
          e.preventDefault()
          // call api for login with data

          if(data.password === data.confirmPassword){

            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method : SummaryApi.signUp.method,
                headers : SummaryApi.signUp.headers,
                body : JSON.stringify(data),
              })
    
              const apiResponse = await dataResponse.json()
            //   console.log('data', apiResponse) 

            if(apiResponse.success === true){
                toast.success(apiResponse.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Slide
                })
                navigate('/login')
            }
            if(apiResponse.error){
                toast.error(apiResponse.message,{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Slide
                })
            }

          }else{
            alert('Passwords do not match')
          }

        }



  return (
    <section id="sign">
          <div className="container mx-auto p-4">
            <div className="bg-white w-full p-2 py-5 max-w-sm mx-auto">
              <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                <div>
                    <img src={data.profilePicture || loginIcon} alt="login icon" />
                </div>
                <form action="">
                    <label>
                        <div className='text-xs bg-slate-200 opacity-80 pb-4 pt-2 py-4 text-center absolute bottom-0 w-full cursor-pointer'>
                            Upload Photo
                        </div>
                        <input type="file" className='hidden' onChange={handleUploadPicture}/>
                    </label>
                </form>
              </div>
    
              <form className="py-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="grid">
                    <label>Name :</label>
                    <div className="bg-slate-100 p-2">
                        <input 
                            type="text" 
                            name="name"
                            value={data.name} 
                            placeholder="fullname" 
                            onChange={handleChange}
                            className="w-full h-full outline-none bg-transpar1nt p-2" 
                            required/>
                    </div>
                </div>

                <div className="grid">
                    <label>Email :</label>
                    <div className="bg-slate-100 p-2">
                        <input 
                            type="email" 
                            name="email"
                            value={data.email} 
                            placeholder="enter email" 
                            onChange={handleChange}
                            className="w-full h-full outline-none bg-transpar1nt p-2" 
                            required/>
                    </div>
                </div>
    
                <div>
                    <label>Password :</label>
                     <div className="bg-slate-100 p-2 flex items-center">
                        <input 
                            type={showPassword ? "text": "password" } 
                            name='password' 
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
                </div>


                <div>
                    <label>Confirm Password:</label>
                     <div className="bg-slate-100 p-2 flex items-center">
                        <input 
                            type={showConfirmPassword ? "text": "password" } 
                            name='confirmPassword' 
                            value={data.confirmPassword}
                            onChange={handleChange}
                            placeholder='confirm password' 
                            className="w-full h-full outline-none bg-transpar1nt p-2" 
                            required/>

                        <div className="cursor-pointer text-xl" onClick={() => setShowConfirmPassword((prev)=> !prev)}>
                            <span>
                                {
                                    showConfirmPassword? <FaEyeSlash /> : <FaEye />
                                }
                            </span>
                        </div>
                    </div>
                </div>
    
                <button className="bg-rose-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">Sign Up</button>
              </form>
    
              <p className="">Already have account ? <Link to={'/login'} className="text-red-600 hover:text-red-700 hover:underline">Login</Link></p>
            </div>
          </div>
        </section>
  )
}

export default SignUp
