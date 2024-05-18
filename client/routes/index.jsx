import { createRoutes } from "react-router-dom";
import App from "../src/App.jsx";
import RegisterPage from "../src/pages/RegisterPage";
import CheckEmailPage from "../src/pages/CheckEmailPage";
import CheckPasswordPage from "../src/pages/CheckPasswordPage";
import Home from "../src/pages/Home";
import MessagePage from "../src/components/MessagePage";
import AuthLayouts from "../layout/boiler.jsx";
import Forgotpassword from "../src/pages/Forgotpassword";

const routes = createRoutes([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "register", element: <AuthLayouts><RegisterPage /></AuthLayouts> },
      { path: "email", element: <AuthLayouts><CheckEmailPage /></AuthLayouts> },
      { path: "password", element: <AuthLayouts><CheckPasswordPage /></AuthLayouts> },
      { path: "forgot-password", element: <AuthLayouts><Forgotpassword /></AuthLayouts> },
      { path: "", element: <Home />, children: [{ path: ":userId", element: <MessagePage /> }] },
    ],
  },
]);

export default routes;