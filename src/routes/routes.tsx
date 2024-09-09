 
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Login from "../pages/Login";
import Dashboard from "../components/layout/dashboard/Dashboard";
import { routesGenerator } from "../utils/routesGenerator";
import { userPath } from "./user.routes";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        children : [
            {
                path : "/",
                element : <Home />
            },
            {
                path : "/contact",
                element : <Contact />
            },
            {
                path : "/about",
                element : <About />
            } ,
            {
                path : "/login",
                element : <Login />
            }
        ]
    },
    {
        path : "/user",
        element : <Dashboard />,
        children : routesGenerator(userPath)
    }
])

export default router;