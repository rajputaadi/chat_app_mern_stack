import React ,{useState} from 'react'
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BiSolidLogOut } from "react-icons/bi";
import {NavLink }from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from './Avatar'
import EditUserdetails from './EditUserDetails'
import Divider from './Divider';
import { TiArrowBack } from "react-icons/ti"; 


const Sidebar = () => {

    const [allUser,setAllUser]=useState([])
    const user = useSelector(state => state?.user)
    const [editUserOpen,setEditUserOpen] = useState(true)
    const[openSearchUser,setOpenSearchUser] = useState(true)

  return (
    <div className = 'w-full h-full grid grid-cols-[56px,1fr] bg-white'>
        <div className = 'bg-slate-200  w-14 h-full rounded-tr-lg rounded-br-lg py-3 flex flex-col justify-between'>
            <div>
                <NavLink className={({isActive})=> `h-14 w-14 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded-md text-slate-700 ${isActive && "bg-slate-300"}`} title='chat'>
                    <BsFillChatDotsFill 
                    size={25}
                /></NavLink>

                <div onClick={()=>setOpenSearchUser(true)}className=' h-14 w-14 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded-md text-slate-700' title='search'>
                    <FaUserPlus 
                        size = {25}
                    />
                </div>
            </div>

            <div>
            <button className='ml-2' title = {user.name} onClick={()=>setEditUserOpen(true)}>
                <Avatar
                width={40} 
                height={40}
                name={user.name}
                /> 
            </button>

            <button className=' h-14 w-14 font-extrabold flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded-md text-slate-700' title='LogOut'>
                <span className='ml-2 mr-2'>
                    <BiSolidLogOut size = {30} />
                </span>
            </button>
            </div>
        </div>
        <div className='w-full'>
            <div className='h-16 flex justify-center items-center'>
            <h2 className = 'text-xl font-bold p-4 text-slate-800 '>Messages</h2>
            </div>
            <Divider/>
            <div className='h-[calc(100vh-62px)] overflow-x-hidden overflow-y-auto scrollbar'>
                {
                    allUser.length === 0 && (
                        <div>
                            <div className=' flex justify-center items-center  text-center text-slate-400'>
                                <TiArrowBack
                                    size={50}
                                />
                            </div>
                            <p className='text-l text-slate-400 text-center'> Explore Users To Start A Conversation With.</p>
                        </div>
                    )
                }
            </div>
            
        </div>

        {/**edit user details*/}
        {
            editUserOpen && (
                <EditUserdetails  onClose = {()=>setEditUserOpen(false)} user= {user}/>
            )
        }

        {/**search users*/}
        {
            openSearchUser && (
                <searchUser onClose={()=>setOpenSearchUser(false)}/>
            )
        } 
    </div>
  )
}

export default Sidebar