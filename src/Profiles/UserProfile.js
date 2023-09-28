import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getUserBookings, getUserDetails } from '../Api-helper/api-helper'
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';



const UserProfile = () => {
    const navigate=useNavigate()
    const [bookings,setBookings]=useState()
    const [user,setUser]=useState()
    useEffect(()=>{
        getUserBookings()
        .then((res)=>setBookings(res.booking))
        .catch((error)=>console.log(error))
        getUserDetails()
        .then((res)=>setUser(res.users))
        .catch((error)=>console.log(error))
    },[])
console.log(user)
   const HandleDelete=(id)=>{
    deleteBooking(id)
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error))
    navigate("/")
   }
  return (
    <div>
        <Box width={"100%"} display={"flex"} >
        <Fragment> {" "}
        {user && (<Box flexDirection={"column"} justifyContent={'center'} alignItems={"center"} width={"30%"} padding={3}>
            <AccountCircleIcon sx={{fontSize:"10rem" ,textAlign:"center" ,ml:3}} />
            <Typography padding={2} width={"auto"} textAlign={'center'} border={"1px solid #ccc"} borderRadius={6}>
                Name:{ user.name}
            </Typography>
            <Typography marginTop={1} padding={2} width={"auto"} textAlign={'center'} border={"1px solid #ccc"} borderRadius={6}>
                Email:{ user.email}
            </Typography>
        </Box>)}
        {bookings && (<Box width={"70%"} display={"flex"} flexDirection={"column"}>
            <Typography variant='h3' fontFamily={"verdana"} textAlign={"center"} marginTop={2} padding={2}>Bookings</Typography>
            <Box margin={"auto"} display={"flex"} flexDirection={"column"} width={"80%"}>
                <List>
                    {bookings.map((booking,index)=>(
                        <ListItem key={index} sx={{bgcolor:"#DFCCFB",color:"black",textAlign:"center",margin:1}}>
                            <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>Movie: {booking.movie.title}</ListItemText>
                            <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>Date: {new Date(booking.date).toDateString() }</ListItemText>
                            <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>Seat: {booking.seatNumber}</ListItemText>
                            <IconButton color='error' onClick={()=>HandleDelete(booking._id)}><DeleteIcon/></IconButton>
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

export default UserProfile
