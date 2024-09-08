/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { Form, Input, Button, Row, Col } from "antd";

const { TextArea } = Input;

const Contact = () => {
  // Form submission handler
  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <div className="w-full py-10 bg-gray-100 px-4 lg:px-20">
      {/* Page Title */}
      <h2 className="text-center text-4xl font-bold mb-12 text-blue-900">
        Contact Us
      </h2>

      <Row gutter={[32, 32]}>
        {/* Contact Form Section */}
        <Col xs={24} lg={14}>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Get In Touch
            </h3>
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="w-full"
              name="contactForm"
            >
              {/* Name Field */}
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your Name" />
              </Form.Item>

              {/* Subject Field */}
              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Please enter a subject" }]}
              >
                <Input placeholder="Subject" />
              </Form.Item>

              {/* Email Field */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Your Email" />
              </Form.Item>

              {/* Message Field */}
              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true, message: "Please enter your message" }]}
              >
                <TextArea rows={4} placeholder="Your Message" />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        {/* Contact Info and Map Section */}
        <Col xs={24} lg={10}>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Contact Details
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Address:</strong> 123 Sports Avenue, City, Country
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p className="text-lg text-gray-600 mb-8">
              <strong>Email:</strong> contact@sportsbooking.com
            </p>

            {/* Embedded Google Map */}
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094235!2d144.96305781568016!3d-37.81410774201665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727c636bf870d7!2sFederation%20Square!5e0!3m2!1sen!2sbd!4v1641207999190!5m2!1sen!2sbd"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
