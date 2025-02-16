import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/Home/Home"
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/Shop/ShopPage";
import SingleProducts from "../pages/Shop/productDetail/SingleProducts";

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
        ]
    },
]);

export default router;