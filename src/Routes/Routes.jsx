
import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivetRouts from "./PrivetRouts";
import Secre from "../Pages/Shared/Secret/Secre";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'menu',
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'secret',
          element:<PrivetRouts><Secre></Secre></PrivetRouts>
        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivetRouts><Dashboard></Dashboard></PrivetRouts>,
    children: [
      {
        path: 'cart',
        element: <Cart></Cart>
      },


      // admin routes
      {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      }
      ,
      {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      }
    ]
  }
]);