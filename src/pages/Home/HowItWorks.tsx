import { Timeline } from "antd";
import {
  CheckCircleOutlined,
  FileTextOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const steps = [
  {
    title: "Browse and Select",
    icon: <FileTextOutlined className="text-4xl" />,
    description:
      "Explore our wide range of sports facilities and choose the one that suits your activity.",
  },
  {
    title: "Pick Your Schedule",
    icon: <CalendarOutlined className="text-4xl" />,
    description:
      "Select a preferred date and time that fits your schedule. Our real-time calendar shows availability.",
  },
  {
    title: "Secure Your Booking",
    icon: <CreditCardOutlined className="text-4xl" />,
    description:
      "Complete the booking form and finalize the process with a secure online payment.",
  },
  {
    title: "Booking Confirmation",
    icon: <CheckCircleOutlined className="text-4xl" />,
    description:
      "Receive instant confirmation and all the details of your booking via email.",
  },
];

const HowItWorks = () => {
  return (
    <div className="md:py-12  ">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-green-600">How to Book Your Facility</h2>
        <p className="text-lg text-gray-600">
          Follow these simple steps to secure your sports facility in no time.
        </p>
      </div>
      <div className="  mx-auto">
        <Timeline
          mode="alternate"
          items={steps.map((step, index) => ({
            color: index % 2 === 0 ? "blue" : "green",
            dot: step.icon,
            children: (
              <div className="md:p-6 p-2 md:m-4 m-2 bg-white rounded-lg shadow-lg">
                <div className="text-xl font-semibold mb-2 text-gray-800">{step.title}</div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ),
          }))}
        />
      </div>
    </div>
  );
};

export default HowItWorks;
