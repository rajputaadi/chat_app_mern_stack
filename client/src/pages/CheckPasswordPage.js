import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../redux/userSlice';

const CheckPasswordPage = () => {
    const [data, setData] = useState({ password: "" });
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    

    // Ensure that location.state contains userId and other required fields
    useEffect(() => {
      console.log('Location state:', location.state); // Add this log to debug
      if (!location?.state?._id) {
          navigate('/');
      }
  }, [location.state, navigate]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

        try {
            const response = await axios({
              method : 'post',
              url:URL,
              data:{
                password: data.password,
                userId: location.state._id // Include userId in the request body
              },
              withCredentials : true
            })

            // Show success notification
            toast.success(response.data.message);
            console.log("Received token:", response.data.token);


            if (response.data.success) {

                dispatch(setToken(response?.data?.token));
                localStorage.setItem('token', response?.data?.token);
                setData({ password: "" });

                // Navigate to the next page with state
                navigate('/password', {
                    state: {
                        userId: location.state._id, // Pass userId to the next route
                        name: location.state.name,
                        profile_pic: location.state.profile_pic
                    }
                });
            } else {
                toast.error(response.data.message || 'Unexpected response format.');
            }
        } catch (error) {
            console.error('Error during password check:', error);

            // Show error notification
            toast.error(error?.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="mt-5">
            <div className="mt-5 w-full max-w-md overflow-hidden p-5 outline outline-1 outline-gray-400 bg-white rounded-lg mx-auto">
                <div className='w-fit mx-auto flex justify-center items-center flex-col'>
                    <Avatar
                        width={70}
                        height={70}
                        name={location?.state?.name}
                        imageUrl={location?.state?.profile_pic}
                    />
                    <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
                </div>
                <form className="grid gap-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter Your password'
                            name='password'
                            className="bg-slate-100 px-2 py-2 outline outline-1 outline-gray-400 focus:outline-primary rounded-lg outline-2"
                            value={data.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button
                        className='text-lg px-1 py-1 bg-primary hover:bg-secondary mt-4 rounded font-bold'
                    >
                        Login
                    </button>
                    <p className='mg-3 text-center'>
                        <Link to={'/forgot-password'} className="text-blue-900 font-semibold hover:text-blue-900">Forget Password?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default CheckPasswordPage;
