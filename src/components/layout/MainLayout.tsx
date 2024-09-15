/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Image, Layout, Menu, Button } from "antd";
import logo from "../../assets/logo/vitctory.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UpOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useCurrentToken, setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import Footer from "../ui/shared/footer/Footer,";
 

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showScrollButton, setShowScrollButton] = useState(false);

  let user : any;
  if (token) {
    user = verifyToken(token);
  }

  const handleLogout = () => {
    dispatch(setUser({ user: null, token: null }));
    navigate('/');
  };

  // Show/Hide Scroll Button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const items = [
    { key: 1, label: <Link to="/">Home</Link> },
    { key: 2, label: <Link to="/facility">Facility</Link> },
    { key: 3, label: <Link to="/about">About Us</Link> },
    { key: 4, label: <Link to="/contact">Contact Us</Link> },
    ...(user ? [
      { key: 5, label: <Link to={`${user.role}/dashboard`}>Dashboard</Link> }
    ] : []),
  ];

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
          {user ? (
            <p
              onClick={handleLogout}
              className="text-xl flex items-center mt-3 text-white font-bold px-5 py-2 bg-red-500 rounded-md cursor-pointer"
            >
              Logout
            </p>
          ) : (
            <Link to="/login" className="cursor-pointer">
              <p className="text-xl flex items-center mt-3 text-white font-bold px-5 py-2 bg-lime-500 rounded-md">
                Login
              </p>
            </Link>
          )}
        </div>
      </Header>

      <Content>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: "#fff",
            borderRadius: 8,
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer />

      {/* Back to Top Button */}
      {showScrollButton && (
        <Button
          type="primary"
          shape="circle"
          icon={<UpOutlined />}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 bg-blue-600 hover:bg-blue-700 shadow-lg"
        />
      )}
    </Layout>
  );
};

export default MainLayout;
