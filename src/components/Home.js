import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movie/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../Api-helper/api-helper'

const Home = () => {
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        getAllMovies()
        .then((data)=>setMovies(data.movies))
        .catch((err)=>console.log(err))
    },[])
    
  return (
    <div>
     <Box  width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
        <Box width={"80%"} height={"40%"} padding={2} margin={"auto"}>
            <img width={"100%"} height={"250"} src="https://images.thequint.com/thequint%2F2023-05%2F503815c7-4ecd-4729-aae7-19fbc7f18220%2F345061970_251814084030084_2588271394147414388_n.jpg?rect=0%2C0%2C1080%2C608" alt="jawaan"/>
        </Box>
        <Box padding={3} margin={"auto"}>
        <Typography variant='h4' textAlign={"center"}>
            Latest Release
        </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"center"} width={"100%"} flexWrap={"wrap"} alignItems={"center"}>
            {movies && movies.slice(0,4).map((movie,index)=>(<MovieItem id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index}/>))}
        </Box>
        <Box display={"flex"} padding={10} margin={"auto"}>
            <Button LinkComponent={Link} to="/movie" variant='outlined' sx={{margin:"auto",color:"black",":hover":{bgcolor:"#DFCCFB"}}}>View All Movies</Button>
        </Box>
     </Box>
    </div>
  )
}

export default Home
