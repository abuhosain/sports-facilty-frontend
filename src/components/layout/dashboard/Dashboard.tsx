import { Button, Layout, Avatar, Dropdown, Menu, Badge, Tooltip, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../redux/features/auth/authSlice";
import Sidebar from "./Sidebar";
import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Mock fetching user data (you can replace this with actual user data fetching logic)
    const fetchedUserName = "John Doe"; // Replace with actual username logic
    setUserName(fetchedUserName);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <UserOutlined /> Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh", overflow: "scroll" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: "0",
            left: "0",
            zIndex: "100",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Header Title */}
          <Title level={3} style={{ margin: 0 }}>
            Dashboard
          </Title>

          {/* Icons and User Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {/* Go Back Home Button */}
            <Tooltip title="Go Back Home">
              <Button
                icon={<HomeOutlined />}
                onClick={handleGoHome}
                size="large"
                shape="circle"
              />
            </Tooltip>

            {/* Notification Icon */}
            <Tooltip title="Notifications">
              <Badge count={5}>
                <BellOutlined style={{ fontSize: "24px", cursor: "pointer" }} />
              </Badge>
            </Tooltip>

            {/* Profile Dropdown */}
            <Dropdown overlay={menu} trigger={["click"]}>
              <Tooltip title={`Logged in as ${userName}`}>
                <Avatar
                  style={{ cursor: "pointer" }}
                  icon={<UserOutlined />}
                  size="large"
                />
              </Tooltip>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
