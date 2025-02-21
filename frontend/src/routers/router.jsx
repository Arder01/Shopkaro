import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/Home/Home"
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/Shop/ShopPage";
import SingleProducts from "../pages/Shop/productDetail/SingleProducts";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import PrivateRoute from './PrivateRoute';
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import UserPayments from "../pages/dashboard/user/UserPayments";

const router = createBrowserRouter([
    {
        path: "/",
        element:<App />,
        children:[
            {path: "/",element:<Home />} ,
            {path: "/categories/:categoryName",element:<CategoryPage/>},
            {path: "/search",element:<Search />},
            {path: "/shop",element:<ShopPage/>},
            {path: "/shop/:id",element:<SingleProducts/>},
            {path:"/success",element:<PaymentSuccess/>}

        ]
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/dashboard",
        element:<DashboardLayout />,
        children: [
            // user routes
            { path: '', element: <UserDMain/>},
            { path: 'orders', element: <UserOrders/> },
            { path: 'payments', element: <UserPayments/> },
            { path: 'profile', element: <div>User Profile</div> },
            { path: 'reviews', element: <div>User Review</div> },
            // admin routes (only accessible by admin) Todo: private routes with role field
            {
                path: "admin",
                element: <PrivateRoute role="admin">AdminDMain</PrivateRoute>
            },
            {
                path: "add-product",
                element: <PrivateRoute role="admin">AddProduct</PrivateRoute>
            },
            {
                path: "manage-products",
                element: <PrivateRoute role="admin">ManageProduct</PrivateRoute>

            },
            {
                path: "update-product/:id",
                element: <PrivateRoute role="admin">UpdateProduct</PrivateRoute>
            },
            { path: "users", element: <PrivateRoute role="admin">ManageUser</PrivateRoute> },
            { path: "manage-orders", 
            element: <PrivateRoute role="admin">
                ManageOrders
                </PrivateRoute> 
            },
        ]
    }
]);

export default router;