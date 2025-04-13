import React, { useEffect, useState } from 'react'
import SummaryApi from '../service';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

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
            <tr>
                <th>Sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
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
                            <button className='bg-green-100 hover:bg-green-500 hover:text-white p-2 rounded-full cursor-pointer '>
                                <MdModeEdit />
                            </button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
      </table>

      <ChangeUserRole/>
    </div>
  )
}

export default AllUsers
