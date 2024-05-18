import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://localhost:8080/api'; // Replace with your backend URL

const RegisterPage = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: ''
  })
  const [uploadPhoto, setUploadPhoto] = useState(null)
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    setUploadPhoto(file)

    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url
      }
    })
  }
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${API_URL}/register`

    try {
      const response = await axios.create().post(URL, data)
      console.log("response", response)

      toast.success(response.data.message)

      if (response.data.success) {
        setData({
          name: '',
          email: '',
          password: '',
          profile_pic: ''
        })

        navigate('/email')

      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    console.log('data', data)
  }

  return (
//     <div className='mt-5'>
//       <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
//         <h3>Welcome to Chat app!</h3>

//         <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
//           <div className='flex flex-col gap-1'>
//             <label htmlFor='name'>Name :</label>
//             <input
//               type='text'
//               id='name'
//               name='name'
//               placeholder='enter your name'
//               className='bg-slate-100 px-2 py-1 focus:outline-primary'
//               value={data.name}
//               onChange={handleOnChange}
//               required
//             />
//           </div>

//           <div className='flex flex-col gap-1'>
//             <label htmlFor='email'>Email :</label>
//             <input
//               type='email'
//               id='email'
//               name='email'
//               placeholder='enter your email'
//               className='bg-slate-100 px-2 py-1 focus:outline-primary'
//               value={data.email}
//               onChange={handleOnChange}
//               required
//             />
//           </div>

//           <div className='flex flex-col gap-1'>
//               <label htmlFor='password'>Password :</label>
//               <input
//                 type='password'
//                 id='password'
//                 name='password'
//                 placeholder='enter your password'
//                 className='bg-slate-100 px-2 py-1 focus:outline-primary'
//                 value={data.password}
//                 onChange={handleOnChange}
//                 required
//               />
//             </div>

//             <div className='flex flex-col gap-1'>
//               <label htmlFor='profile_pic'>Photo :</label>
//               <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
//                 <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
//                   {uploadPhoto?.name ? uploadPhoto?.name : 'Upload profile photo'}
//                 </p>
//                 {uploadPhoto?.name && (
//                   <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
//                     <IoClose />
//                   </button>
//                 )}
//               </div>
//               <input
//                 type='file'
//                 id='profile_pic'
//                 name='profile_pic'
//                 className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
//                 onChange={handleUploadPhoto}
//               />
//             </div>

//             <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
//               Register
//             </button>
// </form>
//           <p className='my-3 text-center'>
//             Already have an account? <Link to='/email' className='hover:text-primary font-semibold'>Login</Link>
//           </p>
//         </div>
//       </div>
<div className='mt-5'>
  <div className='bg-white rounded shadow p-4 mx-auto' style={{ maxWidth: '32rem' }}>
    <h3>Welcome to Chat app!</h3>

    <form className='needs-validation' onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='name'>Name :</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='enter your name'
          className='form-control'
          value={data.name}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='email'>Email :</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='enter your email'
          className='form-control'
          value={data.email}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='password'>Password :</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='enter your password'
          className='form-control'
          value={data.password}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='profile_pic'>Photo :</label>
        <div className='input-group'>
          <div className='custom-file'>
            <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='custom-file-input'
              onChange={handleUploadPhoto}
            />
            <label className='custom-file-label'>{uploadPhoto?.name ? uploadPhoto?.name : 'Upload profile photo'}</label>
          </div>
          {uploadPhoto?.name && (
            <button className='btn btn-secondary ml-2' onClick={handleClearUploadPhoto}>
              <IoClose />
            </button>
          )}
        </div>
      </div>

      <button className='btn btn-primary mt-2'>
        Register
      </button>
    </form>
    <p className='text-center mt-3'>
      Already have an account? <Link to='/email' className='text-primary font-weight-bold'>Login</Link>
    </p>
  </div>
</div>
  );
}

export default RegisterPage;