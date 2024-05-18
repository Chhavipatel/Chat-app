
import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import uploadFile from '../../helpers/uploadFile';

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/email`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({ email: "" });
        navigate('/password', { state: response?.data?.data });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    // <div className='mt-5'>
    //   <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
    //     <div className='w-fit mx-auto mb-2'>
    //       <PiUserCircle size={80} />
    //     </div>

    //     <h3>Welcome to Chat app!</h3>

    //     <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
    //       <div className='flex flex-col gap-1'>
    //         <label htmlFor='email'>Email :</label>
    //         <input
    //           type='email'
    //           id='email'
    //           name='email'
    //           placeholder='enter your email'
    //           className='bg-slate-100 px-2 py-1 focus:outline-primary'
    //           value={data.email}
    //           onChange={handleOnChange}
    //           required
    //         />
    //       </div>

    //       <button
    //         className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
    //       >
    //         Let's Go
    //       </button>

    //       <p className='my-3 text-center'>New User ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
    //     </form>
    //   </div>
    // </div>
    <div class="mt-5 text-center">
    <div class="bg-white rounded overflow-hidden shadow p-4 mx-auto w-full max-w-md">
        <div class="w-fit mx-auto mb-2">
            <i class="bi bi-person-circle text-primary display-1"></i>
        </div>

        <h3>Welcome to Chat app!</h3>

        <form class="grid gap-4 mt-3" onsubmit="return false;">
            <div class="flex flex-col gap-1">
                <label for="email" class="form-label">Email :</label>
                <input type="email" id="email" name="email" placeholder="enter your email" class="bg-slate-100 px-2 py-1 focus:outline-primary form-control" value={data.email} onchange="handleOnChange(event)" required />
            </div>

            <button type="submit" class="bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
                Let's Go
            </button>

            <p class="my-3 text-center">New User ? <a href="/register" class="hover:text-primary font-semibold">Register</a></p>
        </form>
    </div>
</div>
  );
};

export default CheckEmailPage;