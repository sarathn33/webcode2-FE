import { AppBar, Autocomplete, Box,IconButton,Tab,Tabs,TextField,Toolbar } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import React, { useState ,useEffect } from 'react'
import { getAllMovies } from '../Api-helper/api-helper.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store/index.js';

const Header = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const isAdminloggedIn=useSelector((state)=>state.admin.isLoggedIn)
    const isUserloggedIn=useSelector((state)=>state.user.isLoggedIn)
    const [value,setValue]=useState(0);
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        getAllMovies()
        .then((data)=>setMovies(data.movies))
        .catch((error)=>console.log(error))
    },[])
    const logout=(isAdmin)=>{
        dispatch(isAdmin?adminActions.logout():userActions.logout());
    }
    const handleChange=(e,val)=>{
     
        const movie=movies.find((m)=>m.title===val)
        if(isUserloggedIn){
            navigate(`/booking/${movie._id}`)
        }else{
            navigate("/auth")
        }
    }
  return (
    <AppBar position='sticky' sx={{bgcolor:"#DFCCFB"}}>
        <Toolbar position="sticky" sx={{bgcolor:"#DFCCFB"}}>
            <Box width={"10%"}>
           <IconButton LinkComponent={Link} to="/"><LiveTvIcon color='secondary'/></IconButton> 
            </Box>
            <Box width={"30%"} margin={"auto"}>
            <Autocomplete
            onChange={handleChange}
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params,id) => <TextField {...params} key={id} label="Search movies" />}
      />
            </Box>
            <Box display="flex">
      <Tabs textColor='secondary' indicatorColor='secondary' value={value} onChange={(e,val)=>setValue(val)}>
        <Tab component={Link} to="/movie" label="Movies"/>

        {(!isAdminloggedIn && !isUserloggedIn) && ( <>
            <Tab component={Link} to="/admin" label="Admin"/>
            <Tab component={Link} to="/auth" label="Auth"/>
          </>
          )
         
        }

        {(isUserloggedIn) && (
             <>
             <Tab component={Link} to="/user" label="Profile"/>
             <Tab onClick={()=>logout(false)} component={Link} to="/" label="Logout"/>
           </>
        )
         
        }

        {(isAdminloggedIn) && (
             <>
             <Tab component={Link} to="/add" label="Add Movie"/>
             <Tab component={Link} to="/adminPro" label="Profile"/>
             <Tab onClick={()=>logout(true)} component={Link} to="/" label="Logout"/>
           </>
        )
         
        }
      </Tabs>
    </Box>

        </Toolbar>
    </AppBar>
  )
}

export default Header;
