// import React from "react";
// import { BrowserRouter, Routes, Route,Outlet } from "react-router-dom";
// import RegisterPage from './pages/RegisterPage';
// // import CheckPasswordPage from './pages/CheckPasswordPage';
// import CheckEmailPage from './pages/CheckEmailPage';
// import toast,{Toaster} from 'react-hot-toast';
// // import Group from './pages/Group';
// // import Chat from './pages/Chat';
// // import Login from './pages/Login';


// function App() {
 

//   return (
//     <>
//       {/* <BrowserRouter>  */}
//       <Toaster />
//      {/* <Routes>
//         // <Route path="/register" element={<RegisterPage />} />
//         </Routes>
//     </BrowserRouter>  */}
//         {/* <Route path="/checkemail" element={<CheckEmailPage />} />
//         <Route path="/checkpassword" element={<CheckPasswordPage />} /> */}
//         {/* <Route path="/login" element={<Login />} />
//         <Route path="/group" element={<Group />} />
//         <Route path="/chat/:chatid" element={<Chat />} /> */}
//       {/* </Routes>
//     </BrowserRouter> */} 
//     <Routes>
//      <Route path="/register" element={<RegisterPage />} />
//      <Route path="/email" element={<CheckEmailPage />} />
//      </Routes>
//      {/* <main >
//         <Outlet/>
//        </main> */}
//     </>
//   )
// }

// export default App
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import CheckEmailPage from './pages/CheckEmailPage';
import Home from './pages/Home';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/email" element={<CheckEmailPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

