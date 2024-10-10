import React, { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import uploadFile from '../helpers/uploadFile';
import Divider from './Divider';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name || '',
    profile_pic: user?.profile_pic || ''
  });

  const uploadPhotoRef = useRef();
  const token = useSelector((state) => state.user.token); // Get token from user

  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        ...user
      }));
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadPhoto = await uploadFile(file);
      console.log('Upload Photo:', uploadPhoto);

      setData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url
      }));
    }
  };

  const handleOpenUploadPhoto = () => {
    uploadPhotoRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('User Token:', token); // Log token for debugging

    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;
      const response = await axios.post(URL, data, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in headers
        }
      });
      toast.success(response.data.message);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error during submission:', error); // Log error for debugging
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='fixed inset-0 bg-slate-200 bg-opacity-80 flex justify-center items-center'>
      <div className='bg-white m-1 p-4 py-6 rounded w-full max-w-sm'>
        <h2 className='font-semibold'>Profile Details</h2>
        <p className='text-sm'>Edit User Details</p>

        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name :</label>
            <input
              type='text'
              name='name'
              id='name'
              value={data.name}
              onChange={handleOnChange}
              className='w-full py-1 px-2 focus:outline-primary border rounded-md hover:outline-primary'
              required
            />
          </div>

          <div>
            Photo :
            <div className='my-2 mx-2 flex items-center gap-5'>
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <label htmlFor='profile_pic'>
                <button type='button' className='font-semibold' onClick={handleOpenUploadPhoto}>Change Photo</button>
                <input
                  type='file'
                  id='profile_pic'
                  className='hidden'
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>

          <Divider />
          <div className='flex gap-3 ml-auto'>
            <button type='button' onClick={onClose} className='border-primary px-4 py-1 font-semibold text-primary border rounded hover:bg-secondary hover:text-white'>Cancel</button>
            <button type='submit' className='border-primary bg-primary text-white font-semibold px-4 py-1 rounded border hover:bg-secondary'>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);
