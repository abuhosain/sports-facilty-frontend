import { Carousel, Card, Row, Col } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Import lazy-load effect CSS

const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      image: "https://i.ibb.co/q7RrJ7T/profile1.jpg",
      description:
        "John is the visionary behind our company, leading with passion.",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image: "https://i.ibb.co/DwzTzDc/profile2.jpg",
      description: "Jane ensures the tech behind our platform is top-notch.",
    },
    {
      name: "Mike Brown",
      role: "COO",
      image: "https://i.ibb.co/d0hxsk2/profile4.jpg",
      description: "Mike handles day-to-day operations with great efficiency.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Meet Our Team Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          Meet Our Team
        </h2>
        <Carousel autoplay speed={1500} dots arrows>
          {teamMembers.map((member, index) => (
            <div key={index} className="flex justify-center">
              <Row gutter={16} justify="center">
                <Col xs={24} sm={24} md={12} lg={12} className="mb-8">
                  <Card
                    hoverable
                    className="transition-transform duration-300 transform hover:scale-105"
                    cover={
                      <LazyLoadImage
                        alt={member.name}
                        effect="blur"
                        src={member.image}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    }
                  >
                    <h3 className="text-2xl font-bold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-lg text-gray-500">{member.role}</p>
                    <p className="text-gray-600">{member.description}</p>
                  </Card>
                </Col>
              </Row>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Mission Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          To revolutionize the sports booking experience, providing an easier,
          faster, and more efficient way for everyone to access sports
          facilities and stay active.
        </p>
      </section>

      {/* Vision Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Our Vision</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We envision a future where sports facilities are easily accessible,
          ensuring anyone can book their perfect space in just a few clicks, no
          matter where they are.
        </p>
      </section>

      {/* Journey Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Our Journey</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Since our inception in 2020, we’ve transformed from a small local
          service to a global platform, connecting sports enthusiasts with
          premium facilities around the world.
        </p>
      </section>
    </div>
  );
};

export default About;
