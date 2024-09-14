import UserBookingDetails from "../pages/dashboard/user/UserBookingDetails";
import UserBookings from "../pages/dashboard/user/UserBookings";
import UserDashboard from "../pages/dashboard/user/UserDashboard";

export const userPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "My Bookings",
    path: "user-booking",
    element: <UserBookings />,
  },
  {
    
    path: "user-booking/:id",
    element: <UserBookingDetails />,
  },
];
