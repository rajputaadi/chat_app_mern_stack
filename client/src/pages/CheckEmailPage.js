import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserShield } from "react-icons/fa6";

const CheckEmailPage = () => {
    const [data, setData] = useState({ email: "" });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;

        try {
            const response = await axios.post(URL, data);

            console.log("Response Data:", response.data); // Log the entire response

            if (response.data.success) {
                toast.success(response.data.message);

                // Ensure response.data.data contains the necessary user details
                if (response.data.data) {
                    navigate('/password', {
                        state: response.data.data
                    });
                } else {
                    console.error('Missing user details in response data:', response.data);
                    toast.error('Unexpected response format.');
                }
            } else {
                toast.error(response.data.message || 'Failed to verify email.');
            }
        } catch (error) {
            console.error('Error during email verification:', error);

            // Show error notification
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'An error occurred.');
            } else {
                toast.error('An error occurred.');
            }
        }
    };

    return (
        <div className="mt-5">
            <div className="mt-5 w-full max-w-md overflow-hidden p-5 outline outline-1 outline-gray-400 bg-white rounded-lg mx-auto">
                <div className='w-fit mx-auto'>
                    <FaUserShield size={60} />
                </div>
                <form className="grid gap-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor='email'>Email : </label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter Your Email'
                            name='email'
                            className="bg-slate-100 px-2 py-2 outline outline-1 outline-gray-400 focus:outline-primary rounded-lg outline-2"
                            value={data.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button
                        className='text-lg px-1 py-1 bg-primary hover:bg-secondary mt-4 rounded font-bold'
                    >
                        Login
                    </button>
                    <p className='mg-3 text-center'>New User? <Link to={'/register'} className="text-blue-500 font-semibold hover:text-blue-900">Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default CheckEmailPage;
