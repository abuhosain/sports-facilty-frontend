import AdminBooking from "../pages/dashboard/admin/AdminBooking";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import CreateAdmin from "../pages/dashboard/admin/CreateAdmin";
import Facilities from "../pages/dashboard/admin/Facilities";
 

export const adminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
 
  {
    name: "Facility",
    path: "facility",
    element: <Facilities />,
  },
  {
    name: "Booking",
    path: "booking",
    element: <AdminBooking />,
  },
  {
    name: "Create Admin",
    path: "create-admin",
    element: <CreateAdmin />,
  },
 
];
