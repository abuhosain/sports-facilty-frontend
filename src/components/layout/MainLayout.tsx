import React from "react";
import {  Image, Layout, Menu, theme } from "antd";
import logo from "../../assets/logo/vitctory.png";
import { Link, Outlet } from "react-router-dom";
import Footer from "../ui/shared/footer/Footer,";
 

const { Header, Content } = Layout;

const items = [
  {
    key: 1,
    label: <Link to="/">Home</Link>,
  },
  {
    key: 2,
    label: <Link to="/facilty">Facilty</Link>,
  },
  {
    key: 3,
    label: <Link to="/about">About Us</Link>,
  },
  {
    key: 4,
    label: <Link to="/contact">Contact Us</Link>,
  },
  {
    key: 5,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
];

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ width: "100%" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "80px",
          color: "tomato",
          backgroundColor: "green",
        }}
      >
        <div className="demo-logo">
          <Image
            src={logo}
            width={130}
            className="mt-4"
            alt="victory zone logo"
          />
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "green",
            color: "white",
          }}
          theme="dark"
          className="justify-center text-xl"
        />
        <div>
         <Link to="/login" className="cursor-pointer">
         <p className="text-xl flex items-center mt-3 text-white font-bold px-5 py-2 bg-lime-500 rounded-md">
            Login
          </p></Link>
        </div>
      </Header>
       
      <Content  className=" ">
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
           <Outlet />
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
