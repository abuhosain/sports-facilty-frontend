import { Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Layout style={{ height: "100vh", overflow: "scroll" }}>
        <Sidebar />
      <Layout>
        <Header
          style={{ position: "sticky", top: "0", left: "0", zIndex: "100" }}
        >
          <Button onClick={handleLogout}>Logout</Button>
          {""}
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
