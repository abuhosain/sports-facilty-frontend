/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, List, Avatar, Badge, Row, Col, Statistic, Button } from "antd";
import dayjs from "dayjs"; // For displaying today's date
import relativeTime from "dayjs/plugin/relativeTime"; // Import relativeTime plugin
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

const AdminDashboard: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  let user : any ;
  if (token) {
    user = verifyToken(token);
  }

  const today = dayjs().format("MMMM D, YYYY"); // Format today's date

  // Dummy data for the chart
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "User Activity",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "New Users",
        data: [30, 20, 25, 32, 40, 35],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Platform Activity Over the Past 6 Months",
      },
    },
  };

  // Dummy notifications
  const notifications = [
    {
      title: "New Booking",
      description: "You have a new booking for tomorrow.",
      datetime: dayjs().subtract(1, "hour").fromNow(),
    },
    {
      title: "Profile Update",
      description: "Your profile was successfully updated",
      datetime: dayjs().subtract(5, "day").fromNow(),
    },
  ];

  // Dummy recent activities
  const recentActivities = [
    {
      activity: "Admin created a new event",
      time: "1 hour ago",
    },
    {
      activity: "User booked a facility",
      time: "2 days ago",
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <Card className="mb-6">
        <h1 className="text-4xl font-bold">
          Welcome, {user ? user?.name : "Admin"}!
        </h1>
        <p className="text-gray-600 text-xl">Today is {today}</p>
      </Card>

      {/* Statistics Section */}
      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card>
            <Statistic title="Total Users" value={1024} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Bookings" value={37} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Revenue" value={10230} prefix="$" />
          </Card>
        </Col>
      </Row>

      {/* Notification Section */}
      <Card className="mb-6">
        <Row justify="space-between" align="middle">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <Button type="link">Mark all as read</Button>
        </Row>
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Badge count={1}>
                    <Avatar icon={<i className="fas fa-bell" />} />
                  </Badge>
                }
                title={notification.title}
                description={
                  <>
                    <p>{notification.description}</p>
                    <span className="text-gray-500 text-sm">{notification.datetime}</span>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Activity Chart Section */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Platform Activity</h2>
        <Bar data={chartData} options={chartOptions} />
      </Card>

      {/* Recent Activity Section */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <List
          dataSource={recentActivities}
          renderItem={(activity) => (
            <List.Item>
              <List.Item.Meta
                title={<span>{activity.activity}</span>}
                description={<span className="text-gray-500">{activity.time}</span>}
              />
            </List.Item>
          )}
          pagination={{ pageSize: 2 }} // Limit to 2 items per page
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;
