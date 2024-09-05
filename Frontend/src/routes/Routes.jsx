import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "../pages/user/HomePage";
import { LoginPage } from "../pages/user/LoginPage"
import { SignupPage} from "../pages/user/SignupPage"
import { UserLayout } from "../layouts/userLayout";
import { RestaurantPage } from "../pages/user/RestaurantPage";
import { ErrorPage } from "../pages/user/ErrorPage";
import { AboutPage } from "../pages/user/AboutPage";
import { OrderPage } from "../pages/user/OrderPage";
import { CartPage } from "../pages/user/CartPage";
import { ProfilePage } from "../pages/user/ProfilePage";
import { RestaurantDetailsPage } from "../pages/user/RestaurantDetailsPage";
import { UserAuth } from "./protectedRoutes/userAuth";
import { MenuPage } from "../pages/user/MenuPage";





export const router =createBrowserRouter([
    {
      path:'/',
      element: <RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
            path:'',
            element:<HomePage/>
        },
        {
          path:'about',
          element:<AboutPage/>
        },
        {
            path:'login',
            element:<LoginPage/>
        },
        {
            path:'signup',
            element:<SignupPage/>
        }
      ]
    },
    {
      path:"user",
      element:
          
            <UserLayout/>
          ,
      children:[
        {
          path:"restaurants",
          element:<RestaurantPage/>
        },
        {
          path: "profile",
          element: <ProfilePage />,
      },
      {
          path: "orders",
          element: <OrderPage/>,
      },
      {
          path: "restaurant-details/:id",
          element: <RestaurantDetailsPage />,
      },
      {
          path: "cart",
          element: <CartPage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
    }

      ]
    }
  ]);