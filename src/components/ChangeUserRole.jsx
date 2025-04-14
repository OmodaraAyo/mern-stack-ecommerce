import React, { useState } from "react";
import ROLE from "../service/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../service";
import { toast } from "react-toastify";

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role);
    
    const handleOnChangeSelection = (e) => {
        setUserRole(e.target.value);
    }

    const updateUserRole = async() => {
        const fetchDataResponse = await fetch(SummaryApi.updateUser.url, {
            method : SummaryApi.updateUser.method,
            credentials : "include",
            headers : SummaryApi.updateUser.header,
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchDataResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            callFunc()
            onClose()
        }


 
    }
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-full z-10 flex justify-between items-center bg-black/40">
      <div className="w-full mx-auto bg-white shadow-md p-4 max-w-sm">

            <button className="block ml-auto cursor-pointer" onClick={onClose}>
                <IoMdClose/>
            </button>
            <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
            <p>Name : {name}</p>
            <p>Email : {email}</p>
            
            <div className="flex justify-between items-center my-4">
                <p>Role :</p>
                <select className="border px-4 py-1 cursor-pointer" value={userRole} onChange={handleOnChangeSelection}>
                    {
                        Object.values(ROLE).map((data, index) => (
                            <option value={data} key={index}>{data}</option>
                        ))
                    } 
                </select>
            </div>

            <button className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 hover:bg-red-700 text-white cursor-pointer" onClick={updateUserRole}>Change Role</button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
