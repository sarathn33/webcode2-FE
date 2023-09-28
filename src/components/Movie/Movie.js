import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../Api-helper/api-helper';
import MovieItem from './MovieItem.js';

const Movie = () => {
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        getAllMovies()
        .then((data)=>setMovies(data.movies))
        .catch((error)=>console.log(error))
    },[])
  return (
    <div>
     <Box margin={"auto"} marginTop={4}>
        <Typography variant='h4' margin={"auto"} width="40%" bgcolor={"#5C5470"} padding={2} textAlign={"center"}>
            All Movies
        </Typography>
        <Box width={"100%"} marginTop={5} margin={"auto"} display={"flex"} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
        {movies && movies.map((movie,index)=><MovieItem key={index} id={movie._id} title={movie.title} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl}/>)}
        </Box>
    </Box>
    </div>
  )
}

export default Movie
