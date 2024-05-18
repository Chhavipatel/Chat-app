
import { useState, useEffect } from 'react';
import { IoSearchOutline, IoClose } from "react-icons/io5";
import Loading from './Loading';
import UserSearchCard from './UseSearchCard';
import toast from 'react-hot-toast';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:8080/api', // Replace with your backend URL
});

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchUser = async () => {
    try {
      setLoading(true);
      const response = await api.post('/search-user', { search });
      setLoading(false);
      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(handleSearchUser, [search]);

  return (
 

<div className='position-fixed top-0 bottom-0 left-0 right-0 bg-dark bg-opacity-40 p-2 z-10'>
  <div className='w-100 mx-auto mt-4'>
    {/* input search user */}
    <div className='bg-white rounded h-14 overflow-hidden d-flex'>
      <input
        type='text'
        placeholder='Search user by name, email....'
        className='form-control w-100 py-1 h-100 px-4'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className='h-14 w-14 d-flex justify-content-center align-items-center'>
        <IoSearchOutline size={25} />
      </div>
    </div>

    {/* display search user */}
    <div className='bg-white mt-2 w-100 p-4 rounded'>
      {/* no user found */}
      {searchUser.length === 0 && !loading && (
        <p className='text-center text-secondary'>no user found!</p>
      )}

      {loading && (
        <p><Loading /></p>
      )}

      {searchUser.length !== 0 && !loading && (
        searchUser.map((user, index) => {
          return (
            <UserSearchCard key={user._id} user={user} onClose={onClose} />
          );
        })
      )}
    </div>
  </div>

  <div className='position-absolute top-0 end-0 text-lg p-2 lg:text-xl hover:text-white' onClick={onClose}>
    <button>
      <IoClose />
    </button>
  </div>
</div>
  );
};

export default SearchUser;