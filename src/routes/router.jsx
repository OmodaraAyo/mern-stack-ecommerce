import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import ProductCategories from "../pages/ProductCategories";
import Productdetails from "../pages/Productdetails";
import Cart from "../pages/Cart"
import SearchProduct from "../pages/SearchProduct";

const ROUTES = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "sign-up",
                element: <SignUp/>
            },
            {
                path: "product-category/:categoryName",
                element: <ProductCategories/>
            },
            {
                path: "product/:id",
                element: <Productdetails/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "search",
                element : <SearchProduct/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    }
                ]
            }
        ]
    }
])

export default ROUTES;