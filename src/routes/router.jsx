import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";

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
                path: "/login/forgot-password",
                element: <ForgotPassword/>
            }
        ]
    }
])

export default ROUTES;