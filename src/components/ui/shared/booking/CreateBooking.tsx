/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Form, DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useCreateBookingMutation } from "../../../../redux/features/admin/userManagement.api";

interface CreateBookingProps {
  facilityId: string;
}

const CreateBooking: React.FC<CreateBookingProps> = ({ facilityId }) => {
  const [form] = Form.useForm();
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const handleSubmit = async (values: any) => {
    const date = values.date.format("YYYY-MM-DD");
    const startTime = values.startTime.format("HH:mm");
    const endTime = values.endTime.format("HH:mm");

    const bookingData = {
      facility: facilityId,
      date,
      startTime,
      endTime,
    };

    // console.log("Booking Data: ", bookingData); // Debug log

    try {
      // Use the createBooking mutation to send data to the backend
      const response = await createBooking(bookingData).unwrap();
      if(response?.success){
        console.log("Booking response:", response);
        window.location.href = response.data.payment_url;
      }
      message.success("Booking created successfully!");
    } catch (error) {
      console.error("Error creating booking:", error);
     
      message.error("Failed to create booking.");
    }
  };

  return (
    <div className="create-booking-container">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Date Picker */}
        <Form.Item
          label="Select Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker
            className="w-full"
            disabledDate={(current) =>
              current && current < moment().endOf("day")
            }
          />
        </Form.Item>

        {/* Start Time Picker */}
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Please select a start time" }]}
        >
          <TimePicker className="w-full" format="HH:mm" minuteStep={15} />
        </Form.Item>

        {/* End Time Picker */}
        <Form.Item
          label="End Time"
          name="endTime"
          rules={[{ required: true, message: "Please select an end time" }]}
        >
          <TimePicker className="w-full" format="HH:mm" minuteStep={15} />
        </Form.Item>

        {/* Submit Button */}
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Proceed to payment
        </Button>
      </Form>
    </div>
  );
};

export default CreateBooking;
