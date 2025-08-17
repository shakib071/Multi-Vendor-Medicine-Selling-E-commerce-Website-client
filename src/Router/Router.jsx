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
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Error from "../Error/Error";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot></HomeRoot>,
    errorElement: <Error></Error>,
    children: [
      {
        index:true,
        element: <Home></Home>,
        errorElement: <Error></Error>,
      },
      {
        path: '/shop',
        element: <Shop></Shop>,
        errorElement: <Error></Error>,
      },
      {
        path:'/cart/:userId',
        element: <PrivateRouter><Cart></Cart></PrivateRouter>,
        errorElement: <Error></Error>,
      },
      {
        path: '/checkout',
        element: <PrivateRouter><Checkout></Checkout></PrivateRouter>,
        errorElement: <Error></Error>,
      },
      {
        path:'/invoice',
        element: <PrivateRouter><Invoice></Invoice></PrivateRouter>,
        errorElement: <Error></Error>,
      },
      {
        path: '/category-details/:category',
        element: <CategoryDetails></CategoryDetails>,
        errorElement: <Error></Error>,
      },
     
    ]
  },

  {
    path: "/",
    element: <Auth></Auth>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/login',
        element: <Login></Login>,
        errorElement: <Error></Error>,
      },
      {
        path: '/register',
        element: <Register></Register>,
        errorElement: <Error></Error>,
      },
      {
        path: '/dashboard',
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        errorElement: <Error></Error>,
      }
    ]
  },
  {
     path: '/forbidden',
     element: <Forbidden></Forbidden>,
     errorElement: <Error></Error>,
  },
  {
    path: '*',
    element: <Error></Error>,
  }
]);