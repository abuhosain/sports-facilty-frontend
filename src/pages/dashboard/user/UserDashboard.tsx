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
import { Card, List, Avatar, Badge } from "antd";
import dayjs from "dayjs"; // For displaying today's date
import relativeTime from "dayjs/plugin/relativeTime"; // Import relativeTime plugin
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

const UserDashboard: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  let user : any;
  if (token) {
    user = verifyToken(token);
  }

  const today = dayjs().format("MMMM D, YYYY"); // Format today's date

  // Dummy data for the chart
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Activity",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
        text: "User Activity Over the Past Months",
      },
    },
  };

  // Dummy notifications
  const notifications = [
    {
      title: "New Message",
      description: "You have received a new message from Admin",
      datetime: dayjs().subtract(2, "hour").fromNow(),
    },
    {
      title: "Booking Reminder",
      description: "Your booking is scheduled for tomorrow at 10:00 AM",
      datetime: dayjs().subtract(1, "day").fromNow(),
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
      activity: "Booked a facility",
      time: "2 hours ago",
    },
    {
      activity: "Updated profile information",
      time: "1 day ago",
    },
    {
      activity: "Posted a review",
      time: "3 days ago",
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <Card className="mb-6">
        <h1 className="text-4xl font-bold">
          Welcome, {user ? user.name : "User"}!
        </h1>
        <p className="text-gray-600 text-xl">Today is {today}</p>
      </Card>

      {/* Notification Section */}
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
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
        <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
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
        />
      </Card>
    </div>
  );
};

export default UserDashboard;
