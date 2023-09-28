import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const AuthForm = ({onSubmit,isAdmin}) => {
    const[isSignUp,setIsSignUp] =useState(false)
    const [inputs,setInputs]=useState({name:"",email:"",password:""})
    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
           
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        onSubmit({inputs, signup : isAdmin ? false : isSignUp})
    }
  return (
    <div>
        <Dialog PaperProps={{style:{borderRadius:20}}} open={true}>
            <Box sx={{ml:"auto",padding:1}}>
                <IconButton LinkComponent={Link} to="/">
                <CloseRoundedIcon/>
                </IconButton>
                </Box>
                <Typography textAlign={"center"}><b>Admin:</b>admin123@gmail.com</Typography>
                <Typography textAlign={"center"} mb={3}><b>Password:</b>admin123</Typography>
        <Typography variant='h4' textAlign={"center"}>
        {isSignUp ? "Sign Up" : "Login" }
        </Typography>
        <form onSubmit={handleSubmit}>
            <Box padding={6} display={"flex"} justifyContent={"center"} flexDirection={"column"} width={400} margin={"auto"} alignContent={"center"}>
            {!isAdmin && isSignUp &&<>{" "}
            <FormLabel sx={{mt:1,mb:1}}>Name</FormLabel>
            <TextField variant='standard' type='text' name='name' value={inputs.name} onChange={handleChange}/>
            </> }
            <FormLabel sx={{mt:1,mb:1}}>Email</FormLabel>
            <TextField variant='standard' type='email' name='email' value={inputs.email} onChange={handleChange}/>
            <FormLabel sx={{mt:1,mb:1}}>Password</FormLabel>
            <TextField variant="standard" type='password' name='password' value={inputs.password} onChange={handleChange}/>
            <Button sx={{mt:1,borderRadius:10,bgcolor:"#DFCCFB",color:"black"}} type='submit' variant='contained' fullWidth>{!isSignUp? "Login":"Signup"}</Button>
            {!isAdmin && <Button sx={{mt:1,borderRadius:10,color:"black"}} fullWidth onClick={()=>setIsSignUp(!isSignUp)}>Switch to {isSignUp ? " login": " Signup"}</Button>}
            </Box>
        </form>
        </Dialog>
      
    </div>
  )
}

export default AuthForm
