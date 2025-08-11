import { createBrowserRouter } from "react-router";
import Home from "../Components/HomeLayout/Home/Home";
import HomeRoot from "../Components/HomeLayout/HomeRoot/HomeRoot";


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
]);