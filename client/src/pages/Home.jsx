import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logo.avif'
import io from 'socket.io-client'

const API_URL = 'https://localhost:8080/api';

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log('user', user)

  const fetchUserDetails = async () => {
    try {
      const URL = `${API_URL}/user-details`
      const response = await axios.create().get(URL, { withCredentials: true })

      dispatch(setUser(response.data.data))

      if (response.data.data.logout) {
        dispatch(logout())
        navigate("/email")
      }
      console.log("current user Details", response)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  /***socket connection */
  useEffect(() => {
    const socketConnection = io(API_URL, {
      auth: {
        token: localStorage.getItem('token')
      },
    })

    socketConnection.on('onlineUser', (data) => {
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }
  }, [])

  const basePath = location.pathname === '/'
  return (

    <div class="container-fluid p-0 h-100">
  <div class="row no-gutters h-100">
    {/* <!-- Sidebar component --> */}
    <div class="col-lg-3 d-none d-lg-block">
      <section class="bg-white">
        <Sidebar />
      </section>
    </div>

    {/* <!-- Message component --> */}
    <div class="col">
      <section>
        <Outlet />
      </section>
    </div>

    {/* <!-- Empty state component --> */}
    <div class="col d-flex justify-content-center align-items-center d-none d-lg-flex">
      <div>
        <img src="{{ logo }}" width="250" alt="logo" />
      </div>
      <p class="text-lg mt-2 text-slate-500">Select user to send message</p>
    </div>
  </div>
</div>
  );
};

export default Home;