import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design reset styles for consistent layout
 
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    review: "This is the best sports facility booking platform I have ever used. Super easy and convenient!",
    photo: "https://i.ibb.co.com/MNd7GfF/profle3.jpg"
  },
  {
    id: 2,
    name: "Jane Smith",
    review: "A seamless experience! I booked a sports ground in just a few clicks. Highly recommend!",
    photo: "https://i.ibb.co.com/yQpkWpT/avatar2.jpg"
  },
  {
    id: 3,
    name: "Mike Williams",
    review: "The platform offers a variety of venues and the booking process is straightforward. Love it!",
    photo: "https://i.ibb.co.com/WsrXfFy/avatar3.jpg"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    review: "Amazing service, friendly staff, and a great selection of venues. Couldn't ask for more!",
    photo: "https://i.ibb.co.com/ryVGD5L/avatar1.jpg"
  }
];

const Testimonial: React.FC = () => (
  <div className="w-full bg-blue-100 py-10 w-full"> {/* Light blue background */}
    <h2 className="text-center text-4xl font-bold mb-6">What Our Customers Say</h2>
    <Carousel autoplay dots className="w-full max-w-4xl mx-auto">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="px-4 py-6">
          <div className="flex flex-col items-center text-center bg-gray-50 rounded-lg shadow-lg p-8">
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h3 className="text-2xl font-bold mb-2">{testimonial.name}</h3>
            <p className="text-gray-600 italic text-xl">"{testimonial.review}"</p>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default Testimonial;
