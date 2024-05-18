
import React, { useState, useEffect, useCallback } from 'react';
import { IoChatbubbleEllipses, FiArrowUpLeft } from "react-icons/io5";
import { FaUserPlus, FaImage, FaVideo } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar';
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import SearchUser from './SearchUser';
import { logout } from '../../redux/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const socketConnection = useSelector((state) => state.user.socketConnection);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/email");
  };

  const handleSocketConnection = useCallback(() => {
    if (socketConnection) {
      socketConnection.emit('sidebar', user._id);

      socketConnection.on('conversation', (data) => {
        const conversationUserData = data.map((conversationUser) => {
          // ...
        });

        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  useEffect(() => {
    handleSocketConnection();
  }, [handleSocketConnection]);

  return (
   
    <div class="container-fluid h-100 d-flex flex-column">
  <div class="bg-light w-12 h-100 rounded-top-right rounded-bottom-right py-5 text-secondary d-flex flex-column justify-content-between">
    <div>
      <NavLink class="nav-link p-0" title="chat">
        <IoChatbubbleEllipses size={20} />
      </NavLink>

      <div title="add friend" onClick={() => setOpenSearchUser(true)} class="nav-link p-0">
        <FaUserPlus size={20} />
      </div>
    </div>

    <div class="d-flex flex-column align-items-center">
      <button class="mx-auto" title={user?.name} onClick={() => setEditUserOpen(true)}>
        <Avatar
          width={40}
          height={40}
          name={user?.name}
          imageUrl={user?.profile_pic}
          userId={user?._id}
        />
      </button>
      <button title="logout" class="nav-link p-0" onClick={handleLogout}>
        <span class="ml-2">
          <BiLogOut size={20} />
        </span>
      </button>
    </div>
  </div>


         
  <div class="w-100">
    <div class="h-16 d-flex align-items-center">
        <h2 class="text-xl font-bold p-4 text-slate-800">Message</h2>
    </div>
    <div class="bg-slate-200 p-[0.5px]"></div>

    <div class="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto">
        {
            allUser.length === 0 && (
                <div class="mt-12">
                    <div class="d-flex justify-content-center align-items-center my-4 text-slate-500">
                        <FiArrowUpLeft size={50} />
                    </div>
                    <p class="text-lg text-center text-slate-400">Explore users to start a conversation with.</p>
                </div>
            )
        }

        {
            allUser.map((conv,index)=>{
                return(
                    <NavLink to={"/"+conv?.userDetails?._id} key={conv?._id} class="d-flex align-items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer">
                        <div>
                            <Avatar
                                imageUrl={conv?.userDetails?.profile_pic}
                                name={conv?.userDetails?.name}
                                width={40}
                                height={40}
                            />
                        </div>
                        <div>
                            <h3 class="text-ellipsis line-clamp-1 font-semibold text-base">{conv?.userDetails?.name}</h3>
                            <div class="text-slate-500 text-xs d-flex align-items-center gap-1">
                                <div class="d-flex align-items-center gap-1">
                                    {
                                        conv?.lastMsg?.imageUrl && (
                                            <div class="d-flex align-items-center gap-1">
                                                <span><FaImage/></span>
                                                {!conv?.lastMsg?.text && <span>Image</span>  }
                                            </div>
                                        )
                                    }
                                    {
                                        conv?.lastMsg?.videoUrl && (
                                            <div class="d-flex align-items-center gap-1">
                                                <span><FaVideo/></span>
                                                {!conv?.lastMsg?.text && <span>Video</span>}
                                            </div>
                                        )
                                    }
                                </div>
                                <p class="text-ellipsis line-clamp-1">{conv?.lastMsg?.text}</p>
                            </div>
                        </div>
                        {
                            Boolean(conv?.unseenMsg) && (
                                <p class="text-xs w-6 h-6 d-flex justify-content-center align-items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full">{conv?.unseenMsg}</p>
                            )
                        }

                    </NavLink>
                )
            })
        }
    </div>
</div>

{/**edit user details*/}
{
    editUserOpen && (
        <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
    )
}

{/**search user */}
{
    openSearchUser && (
        <SearchUser onClose={()=>setOpenSearchUser(false)}/>
    )
}

</div>
  );
};

export default Sidebar;