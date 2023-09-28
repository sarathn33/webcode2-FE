import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMoviesDetails, newBooking } from '../../Api-helper/api-helper';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';


const Booking = () => {
    const navigate=useNavigate()
    const [movie,setMovie]=useState()
    const [inputs,setInputs]=useState({seatNumber:"",date:""})
    const id=useParams().id;
    useEffect(()=>{
        getMoviesDetails(id)
        .then((res)=>setMovie(res.movie))
        .catch((error)=>console.log(error))
    },[id])
    const HandleChange=(e)=>{
        setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value}))
    }
    const HandleSubmit=(e)=>{
            e.preventDefault();
            console.log(inputs)
            newBooking({...inputs,movie:movie._id})
            .then((res)=>console.log(res))
            .catch(err=>console.log(err))
            navigate("/user")
    }
  return (
    <div>
      {movie && <Fragment>
        <Typography padding={3} fontWeight={"bold"} variant='h4'>Book tickets of movie:{movie.title}</Typography>
        <Box display={'flex'} justifyContent={'center'}>
            <Box display={'flex'} justifyContent={"column"} flexDirection={'column'} paddingTop={2} width={"50%"} marginRight={"auto"}>
                <img width={"80%"} height={"300px"} src={movie.posterUrl} alt={movie.title}/>
                <Box width={"80%"} marginTop={3} padding={2}>
                    <Typography paddingTop={2}>
                        {movie.description}
                    </Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>STARRING: {movie.cast.map((actor)=>actor +",")}</Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>RELEASE DATE: {new Date(movie.releaseDate).toDateString() } </Typography>
                </Box>
            </Box>
            {<Box width={"50%"} paddingTop={3}>
            <form onSubmit={HandleSubmit}>
                <Box textAlign={'left'} padding={5} margin={"auto"} display={'flex'} flexDirection={'column'}>
                    <FormLabel>Seat Number</FormLabel>
                    <TextField value={inputs.seatNumber} onChange={HandleChange} name='seatNumber' type='number' margin='normal' variant='standard'></TextField>
                    <FormLabel>Booking Date</FormLabel>
                    <TextField value={inputs.date} onChange={HandleChange} name='date' type='date' margin='normal' variant='standard'></TextField>
                    <Button type='submit' sx={{mt:3}}>Book Now</Button>
                </Box>
            </form>
            </Box>}
        </Box>
        
        </Fragment>}
    </div>
  )
}

export default Booking
