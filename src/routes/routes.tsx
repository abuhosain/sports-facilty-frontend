import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Login from "../pages/Login";
import Dashboard from "../components/layout/dashboard/Dashboard";
import { routesGenerator } from "../utils/routesGenerator";
import { userPath } from "./user.routes";
import { adminPath } from "./admin.routes";
import SignUp from "../pages/SignUp";
import Facility from "../pages/Facility";
import FacilityDetails from "../pages/FacilityDetails";
import Booking from "../pages/Booking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/facility",
        element: <Facility />,
      },
      {
        path: "/facility/:id",
        element: <FacilityDetails />,
      },
      {
        path: "/bookings/:id",
        element: <Booking />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/user",
    element: <Dashboard />,
    children: routesGenerator(userPath),
  },
  {
    path: "/admin",
    element: <Dashboard />,
    children: routesGenerator(adminPath),
  },
]);

export default router;
