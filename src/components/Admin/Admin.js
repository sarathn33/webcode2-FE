import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminReq } from '../../Api-helper/api-helper'
import { useDispatch } from 'react-redux'
import { adminActions } from '../../store'
import { useNavigate } from 'react-router-dom'


const Admin = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const onResReceived=(data)=>{
        console.log(data);
        dispatch(adminActions.login())
        navigate("/")
      
    }
    const getData=(data)=>{
        console.log("Admin",data)
        sendAdminReq(data.inputs)
        .then((res)=>console.log(res))
        .then(()=>onResReceived(data))
        .catch((err)=>alert("Invalid Credentials , Please enter the valid credentials",err))
    }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin
