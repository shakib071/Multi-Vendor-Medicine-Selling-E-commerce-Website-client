import { createBrowserRouter } from "react-router";
import Home from "../Components/HomeLayout/Home/Home";
import HomeRoot from "../Components/HomeLayout/HomeRoot/HomeRoot";
import Auth from "../Components/AuthLayout/Auth/Auth";
import Login from "../Components/AuthLayout/Login/Login";
import Register from "../Components/AuthLayout/Register/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot></HomeRoot>,
    children: [
      {
        index:true,
        element: <Home></Home>,
      }
    ]
  },

  {
    path: "/",
    element: <Auth></Auth>,
    children: [
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      }
    ]
  }
]);