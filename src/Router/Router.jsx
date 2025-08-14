import { createBrowserRouter } from "react-router";
import Home from "../Components/HomeLayout/Home/Home";
import HomeRoot from "../Components/HomeLayout/HomeRoot/HomeRoot";
import Auth from "../Components/AuthLayout/Auth/Auth";
import Login from "../Components/AuthLayout/Login/Login";
import Register from "../Components/AuthLayout/Register/Register";
import Dashboard from "../Components/DashBoard/Dashboard";
import Shop from "../Components/Shop/Shop";
import Cart from "../Components/Cart/Cart";
import Checkout from "../Components/Checkout/Checkout";
import Invoice from "../Components/Invoice/Invoice";
import CategoryDetails from "../Components/HomeLayout/CategorySection/CategoryDetails";
import Forbidden from "../Components/Forbidden/Forbidden";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot></HomeRoot>,
    children: [
      {
        index:true,
        element: <Home></Home>,
      },
      {
        path: '/shop',
        element: <Shop></Shop>,
      },
      {
        path:'/cart/:userId',
        element: <Cart></Cart>,
      },
      {
        path: '/checkout',
        element: <Checkout></Checkout>,
      },
      {
        path:'/invoice',
        element: <Invoice></Invoice>,
      },
      {
        path: '/category-details/:category',
        element: <CategoryDetails></CategoryDetails>,
      },
     
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
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
      }
    ]
  },
  {
     path: '/forbidden',
     element: <Forbidden></Forbidden>,
  }
]);