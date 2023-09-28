import './App.css';
import { Route, Routes } from "react-router-dom";
import Movie from "./components/Movie/Movie.js";
import Admin from "./components/Admin/Admin.js";
import Auth from "./components/Auth/Auth.js";
import Home from "./components/Home.js";
import { useDispatch, useSelector } from "react-redux";
import Header from './components/header.js';
import { useEffect } from 'react';
import { adminActions, userActions } from './store';
import Booking from './components/Bookings/Booking';
import UserProfile from './Profiles/UserProfile';
import AddMovie from './components/Movie/AddMovie';
import AdminProfile from './Profiles/AdminProfile';




function App() {
 
  const dispatch=useDispatch();
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn)
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn)
  console.log("isAdminLoggedIn",isAdminLoggedIn);
  console.log("isUserLoggedIn",isUserLoggedIn);
  
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(userActions.login())
    }else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login())
    }
  },[dispatch])
  return (
    <div className="App">
      <Header/>
      <section>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Movie" element={<Movie/>}/>
          {!isAdminLoggedIn && !isUserLoggedIn &&(<>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/auth" element={<Auth/>}/></>)}

          {isAdminLoggedIn&&!isUserLoggedIn&&(<>
            <Route path="/add" element={<AddMovie/>}/>
          <Route path="/adminPro" element={<AdminProfile/>}/></>)}


          {isUserLoggedIn&&!isAdminLoggedIn&&(<><Route path="/user" element={<UserProfile/>}/>
          <Route path="/booking/:id" element={<Booking/>}/></>) }
        </Routes>
      </section>
    </div>
  );
}

export default App;
