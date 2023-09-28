import { Box, Button,  FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addMovie } from '../../Api-helper/api-helper';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({title:"",description:"",posterUrl:"",releaseDate:""});
    const HandleChange=(e)=>{
            setInputs((prevState)=>({
                ...prevState,
                [e.target.name]:e.target.value
            }))
    }
    const [cast,setCast]=useState([])
    const[actor,setActor]=useState("")
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs)
        console.log(cast)
        addMovie({...inputs, cast})
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        navigate("/")
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box width={"50%"} padding={3} margin={"auto"} display={'flex'} flexDirection={"column"} boxShadow={"10px 10px 20px #ccc"}>
        <Typography  textAlign={'center'} fontFamily={"verdana"} variant='h5'>Add New Movie</Typography>
        <FormLabel sx={{textAlign:"left",mt:5}}>Title</FormLabel> 
        <TextField value={inputs.title} onChange={HandleChange} variant='standard' margin='normal' name='title'></TextField>
        <FormLabel sx={{textAlign:"left"}}>Description</FormLabel> 
        <TextField value={inputs.description} onChange={HandleChange} variant='standard' margin='normal' name='description'></TextField>
        <FormLabel sx={{textAlign:"left"}}>Poster Url</FormLabel> 
        <TextField value={inputs.posterUrl} onChange={HandleChange} variant='standard' margin='normal' name='posterUrl'></TextField>
        <FormLabel sx={{textAlign:"left"}}>Release Date</FormLabel> 
        <TextField value={inputs.releaseDate} type='date' onChange={HandleChange} variant='standard' margin='normal' name='releaseDate'></TextField>
        <FormLabel sx={{textAlign:"left"}}>Cast</FormLabel> 
        <Box display={"flex"}>
        <TextField variant='standard' onChange={(e)=>setActor(e.target.value)} value={actor} margin='normal' name='cast'/>
        <Button onClick={()=>{setCast([...cast,actor]); setActor("")}} sx={{bgcolor:"#DFCCFB",color:"black",mb:6}}>ADD</Button>
        </Box>
       
        <Button type='submit' variant='contained' sx={{bgcolor:"#DFCCFB",color:"black",width:"30%",margin:"auto"}}>Add New Movie</Button>
        
        </Box>
      </form>
    </div>
  )
}

export default AddMovie
