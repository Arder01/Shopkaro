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
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProducts";
import ManageUser from "../pages/dashboard/admin/users/ManageUser";
import ManageOrders from "../pages/dashboard/admin/manageOrders/ManageOrders";

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
            { path: 'orders', element: <UserOrders /> },
            { path: 'payments', element: <UserPayments/> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'reviews', element: <UserReviews /> },
            // admin routes (only accessible by admin) Todo: private routes with role field
            {
                path: "admin",
                element: <PrivateRoute role="admin"><AdminDMain/></PrivateRoute>
            },
            {
                path: "add-product",
                element: <PrivateRoute role="admin"><AddProduct/></PrivateRoute>
            },
            {
                path: "manage-products",
                element: <PrivateRoute role="admin"><ManageProduct/></PrivateRoute>

            },
            {
                path: "update-product/:id",
                element: <PrivateRoute role="admin"><UpdateProduct/></PrivateRoute>
            },
            { path: "users", element: <PrivateRoute role="admin"><ManageUser/></PrivateRoute> },
            { path: "manage-orders", 
            element: <PrivateRoute role="admin">
                <ManageOrders/>
                </PrivateRoute> 
            },
        ]
    }
]);

export default router;