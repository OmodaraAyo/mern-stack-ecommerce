import React, { useEffect, useState } from 'react'
import SummaryApi from '../service';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpateRole, setOpenUpateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id : ""
    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: "include",
        })

        const dataResponse = await fetchData.json();

        if(dataResponse.success) {
            setAllUsers(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=> {
        fetchAllUsers()
    }, [])
  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
            <tr className='bg-black/80 text-white'>
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Edit</th>
            </tr>
        </thead>
        <tbody>
            {
                allUsers?.map((data, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{data?.name}</td>
                        <td>{data?.email}</td>
                        <td>{data?.role}</td>
                        <td>{moment(data?.createdAt).format('LL')}</td>
                        <td>
                            <button className='bg-green-100 hover:bg-green-500 hover:text-white p-2 rounded-full cursor-pointer' 
                                onClick={()=>{
                                    setUpdateUserDetails(data)
                                    setOpenUpateRole(true)
                                }}
                            >
                                <MdModeEdit />
                            </button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
      </table>

      {
        openUpateRole &&
         (
            <ChangeUserRole 
            onClose={()=> setOpenUpateRole(false)} 
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
            />
         )
      }

    </div>
  )
}

export default AllUsers
