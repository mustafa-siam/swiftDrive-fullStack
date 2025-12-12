import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
export const AppContext=createContext();
export const AppProvider=({children})=>{
    const navigate=useNavigate()
    const [token,setToken]=useState(null)
    const [user,setUser]=useState(null)
    const [isOwner,setIsOwner]=useState(false)
    const [showLogin,setShowLogin]=useState(false)
    const [pickupDate,setPickupDate]=useState("")
    const [returnDate,setReturnDate]=useState("")
    const [cars,setCars]=useState([])
    //fetch user
    const fetchUser=async()=>{
try {
  const {data}=  await axios.get('/api/user/data')
  if(data.success){
    setUser(data.user)
    setIsOwner(data.user.role=='owner')
  }
  else{
  navigate("/")
  }
} catch (error) {
    toast.error(error.message)
}
    }
 //fetchcars
 const fetchCars=async()=>{
    try {
        const {data}=await axios.get("/api/user/cars")
        data.success ? setCars(data.cars) :toast.error(data.message)
    } catch (error) {
        toast.error(error.message)
    }
 }
 const logOut=()=>{
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    isOwner(false)
     axios.defaults.headers.common['Authorization']=''
     toast.success('you have been logged Out')
 }
    //useEffect to retrive token from localStorage
    useEffect(()=>{
        const token=localStorage.getItem('token')
        setToken(token)
        fetchCars()
    },[])
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization']=`${token}`
            fetchUser()
        }
    },[token])
    const value={
       token,setToken,user,setUser,isOwner,setIsOwner,showLogin,setShowLogin,pickupDate,setPickupDate,returnDate,setReturnDate,cars,setCars,fetchCars,fetchUser,logOut,axios,navigate
    }
    return(
        <AppContext.Provider value={value}>
{children}
        </AppContext.Provider>
    )
}
export const useAppContext=()=>{
    return useContext(AppContext)
}