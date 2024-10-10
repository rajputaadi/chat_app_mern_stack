import React,{useState} from 'react'
import { RiFolderCloseFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [data,setData] = useState({
      name : "",
      email: "",
      password : "",
      profile_pic : ""
    })

    const navigate = useNavigate()
    const [UploadPhoto,setUploadPhoto] = useState("")

    const handleOnChange = (e)=>{
      const {name,value} = e.target
      setData ((prev)=>{
          return {
            ...prev,
            [name] : value
          }
      })
    }

    const handleUploadPhoto = async(e)=>{
        const file = e.target.files[0]
        const uploadPhoto = await uploadFile(file)
        console.log("uploadPhoto",uploadPhoto)
        setUploadPhoto(file)

        setData((preve)=>{
          return {
          ...preve,
          profile_pic : uploadPhoto?.url
          }
        })

    }
 
    const handleClearUploadPhoto = (e)=>{
      e.preventDefault()
      e.stopPropagation()
      setUploadPhoto(null)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

      try {
          const response = await axios.post(URL, data);
          console.log('response', response);

          // Show success notification
          toast.success(response.data.message);

          if(response.data.success){
              setData({
                name : "",
                email: "",
                password : "",
                profile_pic : ""
              })

              navigate('/email')
          }
      } catch (error) {
          console.error('Error during registration:', error);

          // Show error notification
          toast.error(error?.response?.data?.message );
    }
    };
  return (
    <div className = "mt-5">
      <div className = " mt-5 w-full max-w-md overflow-hidden p-5  bg-white rounded-lg mx-auto" >
        <h3 className="text-2xl font-extrabold px-3 py-3 text-center">Welcome User!</h3>

        <form className = "grid gap-3" onSubmit={handleSubmit}>
          <div className = "flex flex-col gap-2 ">
              <label htmlFor='name'>Name : </label>
              <input
              type='text'
              id = 'name'
              placeholder='Enter Your Name'
              name='name'
              className = "bg-slate-100 px-2 py-2 focus:outline-primary rounded-lg"
              value={data.name}
              onChange={handleOnChange}
              required
              ></input>
          </div>

          <div className = "flex flex-col gap-2">
              <label htmlFor='email'>Email : </label>
              <input
              type='email'
              id = 'email'
              placeholder='Enter Your Email'
              name='email'
              className = "bg-slate-100 px-2 py-2 focus:outline-primary rounded-lg"
              value={data.email}
              onChange={handleOnChange}
              required
              ></input>
          </div>

          <div className = "flex flex-col gap-2">
              <label htmlFor='password'>Password : </label>
              <input
              type='password'
              id = 'password'
              placeholder='Enter Your Password'
              name='password'
              className = "bg-slate-100 px-2 py-2 focus:outline-primary rounded-lg"
              value={data.password}
              onChange={handleOnChange}
              required
              ></input>
          </div>

          <div className = "flex flex-col gap-2">
              <label htmlFor='profile_pic'>Photo :
                  <div className = " h-10 bg-slate-100 px-1 py-1 flex justify-center  items-center border rounded-md hover:border-primary cursor-pointer">
                    <p className= "text-l max-w-[300px] text-ellipsis line-clamp-1">
                    {
                      UploadPhoto?.name ? UploadPhoto.name : "Upload Profile Photo"
                    }  
                    </p> 
                    {
                      UploadPhoto?.name && (<button className = "text-lg ml-3 hover:text-red-600 " onClick={handleClearUploadPhoto}><RiFolderCloseFill/></button>)
                    } 
                  </div>  
              </label>
              <input
              type='file'
              id = 'profile_pic'
              name='profile_pic'
              className = "bg-slate-100 px-0 py-0 focus:outline-primary hidden rounded-lg"
              onChange={handleUploadPhoto}
              ></input>
          </div>

          <button
            className='text-lg px-1 py-1  bg-primary hover:bg-secondary mt-4  rounded font-bold'
          >
            Register
          </button>

          <p className='mg-3 text-center'>Already have account ? <Link to={'/email'} className="text-blue-500 font-semibold hover:text-blue-900">Login</Link></p>
        </form>


      </div>

    </div>

  )
}

export default RegisterPage