import React from 'react'
import AuthForm from './AuthForm'
import { sendAuthReq } from '../../Api-helper/api-helper'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const onResReceived=(data)=>{
        console.log(data)
        dispatch(userActions.login())
            navigate("/")
    
        
    }
    const getData=(data)=>{
        console.log("Auth",data)
        sendAuthReq(data.inputs,data.signup)
        .then((res)=>console.log(res))
        .then(()=>onResReceived(data))
        .catch((err)=>alert("Invalid Credentials , Please enter the valid credentials",err))
    }
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false}/>
    </div>
  )
}

export default Auth
