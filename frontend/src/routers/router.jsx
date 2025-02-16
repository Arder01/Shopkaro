import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/Home/Home"
import CategoryPage from "../pages/category/CategoryPage";

const router = createBrowserRouter([
    {
        path: "/",
        element:<App />,
        children:[
            {path: "/",element:<Home />} ,
            {path: "/categories/:categoryName",element:<CategoryPage/>}
        ]
    },
]);

export default router;