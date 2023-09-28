import React, { Fragment, useEffect, useState } from 'react'
import { deleteMovie, getAdminById, } from '../Api-helper/api-helper'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';



const AdminProfile = () => {
    const navigate=useNavigate()
    const [admin,setAdmin]=useState()
    useEffect(()=>{
        getAdminById()
        .then((res)=>setAdmin(res.admins))
        .catch((error)=>console.log(error))
    },[])
    const HandleDelete=(id)=>{
        deleteMovie(id)
        .then((res)=>console.log(res))
        .catch((error)=>console.log(error))
        navigate("/")
       }
  return (
    <div>
        <Box width={"100%"} display={"flex"} >
        <Fragment> {" "}
        {admin && (<Box flexDirection={"column"} justifyContent={'center'} alignItems={"center"} width={"30%"} padding={3}>
            <AccountCircleIcon sx={{fontSize:"10rem" ,textAlign:"center" ,ml:3}} />
            <Typography marginTop={1} padding={2} width={"auto"} textAlign={'center'} border={"1px solid #ccc"} borderRadius={6}>
                Email:{admin.email}
            </Typography>
        </Box>)}
        {admin && admin.addedMovies.length > 0 && (<Box width={"70%"} display={"flex"} flexDirection={"column"}>
            <Typography variant='h3' fontFamily={"verdana"} textAlign={"center"} marginTop={2} padding={2}>Added Movies</Typography>
            <Box margin={"auto"} display={"flex"} flexDirection={"column"} width={"80%"}>
                <List>
                    {admin.addedMovies.map((movie,index)=>(
                        <ListItem key={index} sx={{bgcolor:"#DFCCFB",color:"black",textAlign:"center",margin:1}}>
                            <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>Movie: {movie.title}</ListItemText>
                            <IconButton color='error' onClick={()=>HandleDelete(movie._id)}><DeleteIcon/></IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>)}
        </Fragment>
        </Box>

    </div>
  )
}

export default AdminProfile
