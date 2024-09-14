import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useAppSelector } from "../../../redux/hooks";
import { TUser, useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import { sidebarItemsGenerator } from "../../../utils/sidebarItemsGenerator";
import { userPath } from "../../../routes/user.routes";
import { Link } from "react-router-dom";
import { adminPath } from "../../../routes/admin.routes";
 
 
const userRole = {
  Admin: "admin",
  User: "user",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  console.log(user)
  if (!user || !user.role) {
    return <div>Loading...</div>; // Handle the case where user is undefined
  }
   
  let sidebarItems;

  switch ((user as unknown as TUser)!.role) {
    case userRole.Admin:
      sidebarItems = sidebarItemsGenerator(adminPath, userRole.Admin)
      break;
    case userRole.User:
      sidebarItems = sidebarItemsGenerator(userPath, userRole.User)
      break;
 
    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{height : "100vh", position : "sticky", top : "0", left : "0"}}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       <Link to={"/"}> <h1>Victory Zone</h1></Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
