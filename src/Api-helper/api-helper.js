import axios from "axios"


export const getAllMovies=async()=>{
const res= await axios.get("/movie")
.catch((err)=>console.log(err))

const data= await res.data;
return data;
}

export const sendAuthReq=async(data,signup)=>{
   const res=await axios.post(`/user/${signup ? "signup" : "login"}`,
    {
        name:signup ? data.name: " ",
        email:data.email,
        password:data.password
    })
    .catch(err=>console.log(err))

    const resData=await res.data;
    localStorage.setItem("userId",resData.id)
    return resData;
}

export const sendAdminReq=async(data)=>{
    const res=await axios.post(`/admin/login`,{
        email:data.email,
        password:data.password
    }).catch(err=>console.log(err))
    const adminData=await res.data;
    localStorage.setItem("adminId",adminData.id)
    localStorage.setItem("token",adminData.token)
    return adminData;

}

export const getMoviesDetails=async(id)=>{
  const res =await axios.get(`/movie/${id}`)
  .catch(err=>console.log(err))
  const Data=await res.data;
  return Data;
}

export const newBooking=async(data)=>{
    const res= await axios.post(`/booking`,{
        movie:data.movie,
        seatNumber:data.seatNumber,
        date:data.date,
        user:localStorage.getItem("userId")
    }).catch(err=>console.log(err))
    const bookingData= await res.data;
    return bookingData;
}

export const getUserBookings=async()=>{
        const id=localStorage.getItem("userId")
    const res=await axios.get(`/user/booking/${id}`)
    .catch(err=>console.log(err))
    const userBookings=await res.data;
    return userBookings;
}

export const deleteBooking=async(id)=>{
    const res=await axios.delete(`/booking/${id}`)
    .catch(err=>console.log(err))
    const deletedBooking=await res.data;
    return deletedBooking;
}

export const getUserDetails=async()=>{
    const id=localStorage.getItem("userId")
    const res=await axios.get(`/user/${id}`)
    .catch(err=>console.log(err))
    const usedDetails=await res.data;
    return usedDetails;
}

export const addMovie=async(data)=>{
    const res=await axios.post("/movie",{
        title:data.title,
        description:data.description,
        releaseDate:data.releaseDate,
        posterUrl:data.posterUrl,
        cast:data.cast,
        admin:localStorage.getItem("adminId")
    },{headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    },})
    .catch((error)=>console.error(error))
    const addedMovie= await res.data;
    return addedMovie;
}

export const getAdminById=async()=>{
    const id =localStorage.getItem("adminId");
    const res=await axios.get(`/admin/${id}`)
    .catch(err=>console.error(err))
    const adminDetails=await res.data;
    return adminDetails;
}

export const deleteMovie=async(id)=>{
    const res=await axios.delete(`/movie/${id}`)
    .catch(err=>console.log(err))
    const deletedMovie=await res.data;
    return deletedMovie;
}