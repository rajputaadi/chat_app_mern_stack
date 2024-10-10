import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector ,useDispatch} from 'react-redux'
import {Provider} from 'react-redux'
import { logout,setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assests/logo_bg.png'
const Home = () => {

  const user = useSelector(state=>state.user)
  const navigate  = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  console.log("redux user",user);
  const fetchUserDetails = async()=>{
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url : URL,
        withCredentials : true
      })

      dispatch(setUser(response.data.data))

      if(response.data.data.logout){
        dispatch(logout())
        navigate('/email')
      }
      console.log("current user details ", response);
    } catch (error) {
      console.log("error",error);
    }
  }
  useEffect(()=>{
    fetchUserDetails()
  },[])
  
  const basePath = location.pathname ==='/'
  return (
    <div  className = 'grid lg:grid-cols-[250px,1fr] h-screen max-h-screen'>

      <section className = {`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar/>
      </section>
      <section className={`${basePath && "hidden"}`}>
        <Outlet/>
      </section>
      <div className='lg:flex justify-center items-center flex-col  hidden'>
        <div>
          <img
            src = {logo}
            width={400}
            alt='logo'
          />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select User To Start Chatting</p>
      </div>
      
    </div>
  )
}

export default Home